odoo.define('web_kanban_quick_create.kanban_record_edit_task', function (require) {

var core = require('web.core');
var data = require('web.data');
var Model = require('web.Model');
var session = require('web.session');

var KanbanView = require('web_kanban.KanbanView');
var KanbanRecord = require('web_kanban.Record');

var QWeb = core.qweb;


KanbanRecord.include({

    /*
    remove quit create old and add quit create new
     */
    on_kanban_action_clicked: function(ev) {
        if (this.model == 'project.task' && $(ev.currentTarget).data('type') == 'object') {
            ev.preventDefault();
            var self = this;
            $('.o_kanban_quick_create').remove();
            $('.bootstrap-datetimepicker-widget').remove();
            var context = {'task_id': this.record.id.raw_value, 'assigned_history': true}
            new Model('res.users').call('search', [[]], {context: context}).then(function (user_ids) {
                new Model('res.users').call('read', [user_ids, ['id', 'name',]]).then(function (users) {
                    var task_id = self.record.id.raw_value
                    if (task_id) {
                        new Model('project.task').call('read', [task_id, ['date_deadline', 'user_id']]).then(function (task) {
                            if (task.date_deadline == false) {
                                task.date_deadline == "";
                            }
                            var date_deadline = "";
                            var user = "";
                            if (task.date_deadline != false) {
                                date_deadline = moment(task.date_deadline).format('YYYY/MM/DD')
                            }
                            if (task.user_id != false) {
                                user = task.user_id
                            }
                            var $cover_modal = $(QWeb.render("kanban_task.edit", {
                                widget: self,
                                users: users,
                                user: user,
                                date_deadline: date_deadline,
                            }));
                            $cover_modal.appendTo($('body'));
                            $cover_modal.modal('toggle');
                            $('.oe_save').on('click', function(ev){
                                self.trigger_up('kanban_update_user_id', {
                                    data: {
                                        'user_id': parseInt($('.chzn-select').val()),
                                        'date_deadline': $('.o_datepicker_input').val(),
                                    }
                                });
                                $cover_modal.modal('toggle');
                                $cover_modal.remove();
                            });

                            var datepickers_options = {
                                startDate: moment({ y: 1900 }),
                                endDate: moment().add(200, "y"),
                                calendarWeeks: true,
                                autoClose: true,
                                pickTime: false,
                                format: 'YYYY/MM/DD',
                                icons : {
                                    time: 'fa fa-clock-o',
                                    date: 'fa fa-calendar',
                                    up: 'fa fa-chevron-up',
                                    down: 'fa fa-chevron-down'
                                   },

                            }
                            $('.o_datepicker_input').datetimepicker(datepickers_options);
                            for ( var i = 0 ; i < users.length; i ++) {
                                var r = users[i];
                                $('.chzn-select').append('<option value="' + r.id + '">' + r.name + '</option>')
                                $('.chzn-select').trigger("chosen:updated");
                            }

                            $('.chzn-select').chosen();
                        })
                    }

                })
            })
        } else {
            this._super.apply(this, arguments, ev);
        }
    },
});

return KanbanRecord;

});
