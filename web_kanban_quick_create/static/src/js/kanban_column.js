odoo.define('web_kanban_quick_create.kanban_column', function (require) {

    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.Model');
    var session = require('web.session');
    var quick_create = require('web_kanban.quick_create');
    var RecordQuickCreate = quick_create.RecordQuickCreate;

    var KanbanColumn = require('web_kanban.Column');
    var KanbanView = require('web_kanban.KanbanView');

    KanbanColumn.include({

        /*
        add new event kanban, trigger add_new_kanban
         */
        custom_events: _.defaults({
            'add_new_task_kaban': 'add_new_task_kaban',
        }, KanbanColumn.prototype.custom_events),

        add_new_task_kaban: function (event) {
            this.trigger_up('add_new_task', event.data);
        },

        add_quick_create: function () {
            $('.o_kanban_quick_create').remove();
            $('.bootstrap-datetimepicker-widget').remove();
            var self = this;
            var width = this.records.length ? this.records[0].$el.innerWidth() : this.$el.width() - 8;
            this.quick_create_widget = new RecordQuickCreate(this, width);
            this.quick_create_widget.insertAfter(this.$header);
        },

    });

    return KanbanColumn;

})
