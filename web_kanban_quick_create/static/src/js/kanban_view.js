odoo.define('web_kanban_quick_create.kanban_view', function (require) {

    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.Model');
    var session = require('web.session');
    var KanbanView = require('web_kanban.KanbanView');

    var _t = core._t;



    KanbanView.include({

        /*
        Add 2 event:
         - kanban_update_user_id
         - add_new_task
         */

        custom_events: _.defaults({
            'kanban_update_user_id': 'kanban_update_user_id',
            'add_new_task': 'add_new_task',
        }, KanbanView.prototype.custom_events),


        isDate: function(dateString) {
            var datetime = moment(dateString, ['YYYY/MM/DD'], true);
            if (datetime.isValid()) {
                return true
            } else {return false}
        },

        kanban_update_user_id: function(event) {
            var self = this;
            var record = event.target;
            if (event.data.data && record.id) {
                var vals = {};
                if (event.data.data.user_id) {
                    vals['user_id'] = event.data.data.user_id
                }
                if (event.data.data.date_deadline) {
                    var isDate = this.isDate(event.data.data.date_deadline);
                    if (isDate == true) {
                        vals['date_deadline'] =  event.data.data.date_deadline
                    } else {
                        this.do_warn(_t("Deadline is invalid:"));
                    }
                }
                return this.dataset.write(parseInt(record.id), vals)
                    .done(function () {
                        if (!self.isDestroyed()) {
                            self.reload_record(record);
                        }
                });
            }
        },

        add_new_task: function (event) {
            var self = this;
            var column = event.target;
            var context = {};
            var vals = event.data.value;
            if (this.group_by_field) {
                vals[this.group_by_field] = column.id
            }
            this.dataset.create(vals, context).then(function on_success (data) {
                add_record(data);
            });

            function add_record(id) {
                self.dataset.add_ids([id], -1);
                self.dataset.read_ids([id], self.fields_keys.concat(['__last_update'])).done(function(record) {
                    column.add_record(record[0], {position: 'before'});
                });
                self.trigger_up('kanban_reload');
            }
        },

    });

    return KanbanView;
});
