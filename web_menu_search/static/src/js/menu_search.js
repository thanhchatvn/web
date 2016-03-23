
odoo.define('web_menu_search.web_menu_search', function (require) {

    var core = require('web.core');
    var Widget = require('web.Widget');
    var Model = require('web.Model');
    var ControlPanel = require('web.ControlPanel');
    var UserMenu = require('web.UserMenu')
    var AppSwitcher = require('web.AppSwitcher').AppSwitcher

    var MenuSearch = Widget.extend({
	    template: "MenuSearch",

        events: {
            'click .oe_search_menu_input': function(event) {
                this.do_search()
            }
        },

	    init: function(parent) {
	        this._super(parent);
	    },
	    start: function() {
	        this._super();
	        this.do_search();

	    },

	    do_search: function(value){
            var self = this;
            new Model('ir.ui.menu').call('get_access_menus', [[]]).then(function (res) {
                var res = res;
                var auto_list = []
                var test_list = []
                self.set({'menus': res})
                for (menu in res){
                    var menu_obj = res[menu]
                    var menu_id = menu_obj['id']
                    var menu_name = menu_obj['name']
                    var menu_action = menu_obj['action']
                    if (menu_action != false){
                        href = "#menu_id="+menu_id+"&action="+menu_action
                        disp_value = {
                            'value': href,
                            'label': menu_name
                        }
                        test_list.push(href)
                        auto_list.push(disp_value)
                    }
                }
                $('input#menu_name').autocomplete(
                                                  {
                                                  source: auto_list,
                                                  focus: function(event, ui) {
                                                                 $("#menu_name").val(ui.item.label);
                                                                 return false;
                                                                              },
                                                  select: function (event, ui) {
                                                                window.location.href = ui.item.value;
                                                                return false;
                                                                                },
                                                  });




                function lightwell(request, response) {
                    function hasMatch(s) {
                        return s.toLowerCase().indexOf(request.term.toLowerCase())!==-1;
                    }
                    var i, l, obj, matches = [];

                    if (request.term==="") {
                        response([]);
                        return;
                    }

                    for  (i = 0, l = projects.length; i<l; i++) {
                        obj = projects[i];
                        if (hasMatch(obj.label) || hasMatch(obj.desc)) {
                            matches.push(obj);
                        }
                    }
                    response(matches);
                }
            })
        },
    });

    ControlPanel.include({

        start: function(){
            var self = this;
            this._super.apply(this,arguments);
            var menu_search = new MenuSearch(this);
            menu_search.insertAfter(this.nodes.$buttons);
            $('.oe_search_menu_input').focus()
        },

    });

    //UserMenu.include({
    //
    //    start: function(){
    //        this._super.apply(this,arguments);
    //        var menu_search = new MenuSearch(this);
    //        menu_search.insertAfter(this.$('.dropdown-toggle'));
    //        $('.oe_search_menu_input').focus()
    //    },
    //
    //});

    AppSwitcher.include({
        start: function(){
            this._super.apply(this,arguments);
            var menu_search = new MenuSearch(this);
            menu_search.prependTo(this.$('.o_apps'));
            $('.oe_search_menu_input').focus()
        },
    })
});