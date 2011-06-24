var BS = {};

BS.ResumeApp = Ext.extend(Ext.TabPanel, {
  tabBar: {
    dock: 'bottom',
    layout: {
      pack: 'center'
    }
  },
  fullscreen: true,
  ui: 'dark',
  cardSwitchAnimation: {
    type: 'slide',
    cover: true
  },
  defaults: {
    scroll: 'vertical'
  },
  initComponent: function() {
    var data = BS.ResumeData
    items: [{
      title: 'Me',
      autoLoad: 'about.html',
      iconCls: 'info',
      cls: 'card1'
    }, {
      title: 'Favorites',
      html: '<h1>Favorites Card</h1>',
      iconCls: 'favorites',
      cls: 'card2',
      badgeText: '4'
    }, {
      title: 'Downloads',
      id: 'tab3',
      html: '<h1>Downloads Card</h1>',
      badgeText: 'Text can go here too, but it will be cut off if it is too long.',
      cls: 'card3',
      iconCls: 'download'
    }, {
      title: 'Settings',
      html: '<h1>Settings Card</h1>',
      cls: 'card4',
      iconCls: 'settings'
    }, {
      title: 'User',
      html: '<h1>User Card</h1>',
      cls: 'card5',
      iconCls: 'user'
    }]

    BS.ResumeApp.superclass.initComponent.call(this);
  }

})

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var tabpanel = new Ext.TabPanel({
            
        });
    }
});