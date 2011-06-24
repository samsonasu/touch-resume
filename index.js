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
  constructor: function(config) {
    this.resume_data = config.resume_data;
    BS.ResumeApp.superclass.constructor.call(this, config);
  },
  initComponent: function() {
    this.items = [
      this.build_me_tab(),
      this.build_experience_tab(),
      this.build_education_tab(),
      this.build_skills_tab()
    ];

    BS.ResumeApp.superclass.initComponent.call(this);
  },
  build_me_tab: function() {
    return new Ext.Panel({
      title: 'Contact',
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
          },{
            tag: 'div',
            cls: 'twitter',
            html: "<a href='http://twitter.com/" + this.resume_data.twitter + "'>@" + this.resume_data.twitter  + "</a>"
          },{
            tag: 'div',
            cls: 'github',
            html: "<a href='http://github.com/" + this.resume_data.github + "'>" + this.resume_data.github + "</a>"
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
  },
  build_experience_tab: function() {
    var store = new Ext.data.JsonStore({
      model: 'Experience',
      data: this.resume_data.experience
    });

  
    return new Ext.List({
      title: "Experience",
      itemTpl : '<span class="title">{title}</span> <span class="company">@ {company}</span>',
      cls: 'experience',
      iconCls: 'work',
      store: store,
      badgeText: store.getCount(),
      listeners: {
        activate: function(list) {
          list.tab.setBadge(null);
        },
        itemtap: function(list, index, item, e) {
          var record = store.getAt(index);
          Ext.Msg.alert(record.data.title, record.data.description);
        }
      }
    });
  },
  build_education_tab: function() {
    var store = new Ext.data.JsonStore({
      model: 'Education',
      data: this.resume_data.education
    });

    var edu_items = [];
    store.each(function(edu) {
      edu_items.push({
        html: {
          tag: 'div',
          cls: 'education',
          children: [{
            tag: 'div',
            cls: 'degree',
            html: edu.data.degree
          },{
            tag: 'div',
            cls: 'institution',
            html: edu.data.institution
          },{
            tag: 'div',
            cls: 'location',
            html: edu.data.date + " - " + edu.data.location
          }]
        }
      })
    });

    var carousel = new Ext.Carousel({
      title: "Education",
      iconCls: "school",
      items: edu_items
    });
    return carousel;
  },
  build_skills_tab: function() {
    var store = new Ext.data.JsonStore({
      model: "Skill",
      data: this.resume_data.skills
    });

    var tpl = new Ext.XTemplate(
    '<tpl for=".">',
    "<div class='skill'>",
      "<img src='img/skills/{name}.png' />",
      "<span class='caption'>{caption}</span>",
    "</div>",
    '</tpl>'
    );

    var panel = new Ext.Panel({
      title: 'Skills',
      cls: 'skills',
      iconCls: 'wrench',
      items: new Ext.DataView({
        store: store,
        itemSelector: 'DIV.skill',
        tpl: tpl
      })
    });

    return panel;
  },
  build_recommendation_tab: function() {

  }
});


Ext.regModel('Experience', {
    fields: ['company', 'title', 'start', 'end', 'description']
});
Ext.regModel('Education', {
    fields: ['degree', 'institution', 'date', 'description']
});
Ext.regModel('Skill', {
    fields: ['name', 'caption', 'url']
});


Ext.setup({
  icon: 'icon.png',
  tabletStartupScreen: 'tablet_startup.png',
  phoneStartupScreen: 'phone_startup.png',
  glossOnIcon: false,
  onReady: function() {
    Ext.Ajax.request({
      url: 'info.json',
      success: function(request, options) {
        var data = Ext.decode(request.responseText);
        Ext.get('splash').hide();
        var tabpanel = new BS.ResumeApp({
          resume_data: data,
          listeners: {
            afterlayout: function(p) {
              debugger;
              p.onResize();
            }
          }
        });
      }
    });
  }
});
