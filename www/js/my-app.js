
//-----YOUR CODE STARTS HERE ---------------------------------

//----------------------------------------------------------------------------------
//       Get user info first
//----------------------------------------------------------------------------------
var getAppUserInfo = function(){
  messageApp.info = myApp.formGetData('user-id-info');
  if(messageApp.info) {
    setupLocalDB();
    console.log(messageApp.info);
  }
  else {
   console.log('There is no stored data for this form yet.');
    mainView.router.loadPage('login.html');
 }
};

//----------------------------------------------------------------------------------
//   Login page callback
//----------------------------------------------------------------------------------
myApp.onPageInit('login', function () {
  //Show user info
  try {
    $$('input[name="sender"]').val(messageApp.info.sender);
    $$('input[name="nickName"]').val(messageApp.info.nickName);
    console.log(messageApp.info);
  } catch (e) {
    // just load the page
  }

});

//----------------------------------------------------------------------------------
//  Load each message
//----------------------------------------------------------------------------------
var loadMessages = function(docId) {
  localDB.get(docId).then(function(result) {
      var sender;
      if (result.sender === messageApp.info.sender) {
        sender = 'sent';
      } else {
        sender = 'received';
      }
      // Add message
      myMessages.addMessage({
        text: '<p>' + result.message + '</p>', // Message text can be HTML string
        type: sender, //Message type - 'sent' or 'received'. Optional
        name: result.nickName, //Sender name. Optional
        day: result.time, // Day Optional
      });
    })
    .catch(function(err) {
      console.log('pouchDB.js- Erro getting localDB for loadEachMessage :' + err);
    });
};

//----------------------------------------------------------------------------------
//      Post a new message
//----------------------------------------------------------------------------------
var postMessage = function(){
  localDB.post({
    type: 'message',
    nickName: messageApp.info.nickName,
    sender: messageApp.info.sender,
    time: new Date().toUTCString(),
    message: messageApp.text,
    img: ""
  }).then(function (response) {
    // handle response
    console.log(response);
    // To test localy
    if(appRunningStatus === "dev-local"){
      loadMessages(response.id);
    }
  }).catch(function (err) {
    console.log(err);
  });
};
