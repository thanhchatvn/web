odoo.define('web_kanban_scroll_bottom_load_data.scroll_bottom', function (require) {
    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.Model');
    var session = require('web.session');
    var kanbanView = require('web_kanban.KanbanView');
    var actionManager = require('web.ActionManager');


    actionManager.include({
          events: _.defaults({
                'scroll': function(event) {
                    var self = this;
                    if(this.$el.scrollTop() +  this.$el.height() == this.$el.find('.o_view_manager_content').children().height() + 8) {
                        this.__parentedChildren[1].__parentedChildren[1].pager._save_scroll(this.$el.parent().find('.o_pager_value'));
                    }
                },
          }, actionManager.prototype.events),
    });
    return actionManager;
});