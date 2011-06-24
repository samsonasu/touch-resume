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
    this.load_data();
    this.items = [this.build_me_tab(), {
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
    }];

    BS.ResumeApp.superclass.initComponent.call(this);
  },
  load_data: function() {
    this.resume_data = BS.ResumeData;
  },
  build_me_tab: function() {
    return new Ext.Panel({
      title: 'Me',
      html: {
        tag: 'div',
        cls: 'info',
        children: [{
          tag: 'h1',
          html: this.resume_data.name
        },{
          tag: 'div',
          cls: 'contact',
          children: [{
            tag: 'div',
            cls: 'phone',
            html: "<a href='tel:" + this.resume_data.phone + "'>" + this.resume_data.phone + "</a>"
          },{
            tag: 'div',
            cls: 'email',
            html: "<a href='mailto:" + this.resume_data.email + "'>" + this.resume_data.email + "</a>"
          }]
        },{
          tag: 'dl',
          cls: 'objective',
          children: [{
            tag: 'dt',
            html: "Objective"
          }, {
            tag: 'dd',
            html: this.resume_data.objective
          }]
        }]
      },
      iconCls: 'info'
    });
  }
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        Ext.get('splash').hide();
        var tabpanel = new BS.ResumeApp({});
    }
});