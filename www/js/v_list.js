//----------------------------------------------------------------------------------
//    Vitual list d12
//----------------------------------------------------------------------------------
myApp.onPageInit('v_list', function() {

  var myList = myApp.virtualList('.list-block.virtual-list', {
    // Array with items data
    items: [{
        title: 'Item 1',
        picture: 'img/react.png'
      },
      {
        title: 'Item 2',
        picture: 'img/react.png'
      },
      {
        title: 'Item 1000 and so on...',
        picture: 'img/react.png'
      },
    ],
    // Template 7 template to render each item
    template: '<li class="item-content">' +
      '<div class="item-media"><img width="25" src="{{picture}}"></div>' +
      '<div class="item-inner">' +
      '<div class="item-title">{{title}}</div>' +
      '</div>' +
      '</li>'
  });
});
