
//----------------------------------------------------------------------------------
//      Pouch Find. Find and return a document
//----------------------------------------------------------------------------------
var fnPouchFind = function() {
  localDB.createIndex({
      index: {
        fields: ["type", "time"]
      }
    }).then(function() {
      localDB.find({
        selector: {
          $and: [{type: {$exists: true}},
            {type: {$eq: "message"}},
            {time: {$exists: true}}]},
        sort: [{'type': 'asc'}, {'time': 'desc'}]
      }).then(function(results) {
        //console.log("pouch.js- :" + JSON.stringify(results.docs));
        results.docs.forEach(function(data) {
          //console.log("Time: " + data.time);
          loadMessages(data._id);
        });
      }).catch(function(err) {
        console.log("pouch.js- Error on find: " + err);
      });
    })
    .catch(function(err) {
      console.log("pouch.js- Error createIndex: " + err);
    });

};

//----------------------------------------------------------------------------------
//      Get info on database
//----------------------------------------------------------------------------------
var pouchInfo = function() {
  localDB.info().then(function(info) {
    console.log(info);
    fnPouchFind();
  }).catch(function(err) {
    console.log(err);
  });
};

//----------------------------------------------------------------------------------
//      Setting up local and remote database
//----------------------------------------------------------------------------------
var setupLocalDB = function() {
  var pouchOpts = {
    skipSetup: false,//prevents modal authentication popup
    auth: {
      username: username,
      password: password
    }
  };
  //Set up URLs
  if (appRunningStatus === "prod") {}
  // Remote DB
  else if (appRunningStatus === "beta") {
    PouchDB.debug.disable();
  }
  //local couchDB
  else if (appRunningStatus === "dev") {
    PouchDB.debug.enable('*');
    PouchDB.debug.enable('pouchdb:find');
    if (window.indexedDB) {
      //console.log("I'm in WKWebView!");
    } else {
      //console.log("I'm in UIWebView");
    }
    // Remote DB
    url = "http://127.0.0.1:5984/message";
  }
  //Testing in local browser DB only
  else if (appRunningStatus === "dev-local") {
    PouchDB.debug.enable('*');
    PouchDB.debug.enable('pouchdb:find');
  }
  //Create new data base
  localDB = new PouchDB('message', {
    size: 10,
    storage:'persistent',
    auto_compaction: true
    //adapter: 'cordova-sqlite'// add plugin cordova-plugin-sqlite-2
  });
  //Check to see if SQLite is installed
  //alert('SQLite plugin is installed?: ' + (!!window.sqlitePlugin));
  if (appRunningStatus !== "dev-local"){
   var remoteDB = new PouchDB(url, pouchOpts);
   localDB.sync(remoteDB, {
    live: true,
    retry: true
   }).on('change', function(change) {
    console.log("yo, we got an change");
    console.log(change);
    var dt1 = new Date(change.change.start_time);
    var utcDate = dt1.toUTCString();
    //Load a new message
    change.change.docs.forEach(function(data) {
      var docId = data._id;
      loadMessages(docId);
    });
   }).on('error', function(err) {
    console.log("yo, we got an error! (maybe the user went offline?): " + err);
  });
 }
  pouchInfo();
};
