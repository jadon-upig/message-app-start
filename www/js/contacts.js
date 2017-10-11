
//----------------------------------------------------------------------------------
//    Vitual list d13
//----------------------------------------------------------------------------------
myApp.onPageInit('contacts', function() {
  localDB.get('contact_names').then(function(result) {
      console.log(result);
    myApp.virtualList('.list-block.virtual-list', {
      // Array with items data

      items: result.names,
      // Template 7 template to render each item
      template:  '<li>'+
                  '<div class="item-content">'+
                    '<div class="item-inner">'+
                      '<div class="item-title">{{this}}</div>'+
                    '</div>'+
                  '</div>'+
                '</li>'
    });
  })
  .catch(function(err) {
  console.log('pouchDB.js- Erro getting localDB :' + err);
  });
});
