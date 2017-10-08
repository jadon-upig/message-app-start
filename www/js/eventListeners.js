
//-----YOUR CODE STARTS HERE ---------------------------------

//----------------------------------------------------------------------------------
//       Handle message
//----------------------------------------------------------------------------------
$$('.messagebar .link').on('click', function () {
    // Message text
    var messageText = myMessagebar.value().trim();
    messageApp.text = messageText;
    // Exit if empy message
    if (messageText.length === 0) return;
    // Empty messagebar
    myMessagebar.clear();
    // Add message
    postMessage();
  });

//----------------------------------------------------------------------------------
//   Sumbmit
//----------------------------------------------------------------------------------
$$(document).on('click', '.submit-btn', function() {
  messageApp.info = myApp.formGetData('user-id-info');
  if(messageApp.info) {
    mainView.router.back();
    console.log(messageApp.info);
  }
  else {
   console.log('There is no stored data for this form yet.');
  }
});

//----------------------------------------------------------------------------------
//   Close login screen
//----------------------------------------------------------------------------------
$$(document).on('click', '.close-btn', function() {
    mainView.router.back();
  });

//----------------------------------------------------------------------------------
//   Clear login screen
//----------------------------------------------------------------------------------
$$(document).on('click', '.clear-btn', function() {
    myApp.formDeleteData('user-id-info');
    myApp.modal({
      title: alertName,
      text: "User info cleared",
      buttons: [{
        text: "ok"
      }]
    });

  });

//----------------------------------------------------------------------------------
//   Reload window and Clean up DB
//----------------------------------------------------------------------------------
$$("#refresh").on("click", function() {
  localDB.viewCleanup().then(function (result) {
  // clean up any index created and reload the page handle result
    window.location.reload(true);
 }).catch(function (err) {
  console.log(err);
 });
});

//----------------------------------------------------------------------------------
//   Destroy DB
//----------------------------------------------------------------------------------
$$("#destroy").on("click", function() {
  localDB.destroy().then(function() {
    // database destroyed
    //mainView.router.back();
    myApp.modal({
      title: alertName,
      text: "DB destroyed",
      buttons: [{
        text: "ok"
      }]
    });
    mainView.router.refreshPage();
  }).catch(function(err) {
    console.log(err);
    myApp.modal({
      title: alertName,
      text: "Error indestroing DB",
      buttons: [{
        text: "ok"
      }]
    });
  });
});
