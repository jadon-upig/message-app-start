
//-----YOUR CODE STARTS HERE ---------------------------------

//----------------------------------------------------------------------------------
//       Handle message d-3
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
//   Sumbmit user Id d-4
//----------------------------------------------------------------------------------
$$(document).on('click', '.submit-btn', function() {
  messageApp.info = myApp.formGetData('user-id-info');
  if(messageApp.info) {
    mainView.router.back();
    myApp.onPageAfterBack('user_id', function(){
      //Clean the reload the messages from the server
      myMessages.clean();
      setupLocalDB();
    });
    console.log(messageApp.info);
  }
  else {
   console.log('There is no stored data for this form yet.');
  }
});

//----------------------------------------------------------------------------------
//   Close user_id screen d-5
//----------------------------------------------------------------------------------
$$(document).on('click', '.close-btn', function() {
    mainView.router.back();
  });

//----------------------------------------------------------------------------------
//   Clear user_id screen d-6
//----------------------------------------------------------------------------------
$$(document).on('click', '.clear-btn', function() {
    myApp.formDeleteData('user-id-info');
    myApp.alert('User info cleared', alertName, function () {
      $$('input[name="sender"]').val("");
      $$('input[name="nickName"]').val("");
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
