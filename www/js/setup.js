
//----------------------------------------------------------------------------------
//       Global vars and determine theme depending on device
//----------------------------------------------------------------------------------
const isAndroid = Framework7.prototype.device.android === true;
const isIos = Framework7.prototype.device.ios === true;
const appRunningStatus = "dev-local"; //Types "prod" "beta" "dev" "dev-local"
const alertName = "Messages App"; //name of the app and modal Title
var localDB; //This is the local data base
const messageApp ={};//Information about the user and the messages
var username = "<username>";
var password = "<password>";
var url = "https:// <server url>";

//----------------------------------------------------------------------------------
//       Set Template7 global devices flags.
//----------------------------------------------------------------------------------
Template7.global = {
  android: isAndroid,
  ios: isIos
};

//----------------------------------------------------------------------------------
//        Store Framework7, initialized the instance.
//----------------------------------------------------------------------------------
var myApp = new Framework7({
  // Enable Material theme
  material: isAndroid ? true : false,
  // Enable Template7 pages
  template7Pages: true
});

//----------------------------------------------------------------------------------
//       Define Dom7
//----------------------------------------------------------------------------------
const $$ = Dom7;

//----------------------------------------------------------------------------------
//       Change the navbar for Android devices.
//----------------------------------------------------------------------------------
if (isAndroid) {
  // Change class
  $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
  // And move Navbar into Page
  $$('.view .navbar').prependTo('.view .page');
}

//----------------------------------------------------------------------------------
//       Init View
//----------------------------------------------------------------------------------
const mainView = myApp.addView('.view-main', {
  // F7 will just ignore it for Material theme, if applicable.
  dynamicNavbar: true
});

//----------------------------------------------------------------------------------
//       Handle Cordova Device Ready Event
//----------------------------------------------------------------------------------
$$(document).on('deviceready', function() {
  console.log("Device is ready!");
  //give some time for the correct design to load
  $$('body').css('visibility','visible');
  //getAppUserInfo();
});

//----------------------------------------------------------------------------------
//       Init Messages
//----------------------------------------------------------------------------------
var myMessages = myApp.messages('.messages', {
  autoLayout:true
});

//----------------------------------------------------------------------------------
//       Init Messagebar
//----------------------------------------------------------------------------------
var myMessagebar = myApp.messagebar('.messagebar');
