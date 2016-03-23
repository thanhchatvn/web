odoo.define('web_kanban_quick_create.record_quit_create', function (require) {
    "use strict";

    var Widget = require('web.Widget');
    var Model = require('web.DataModel');
    var RecordQuickCreate = require('web_kanban.quick_create').RecordQuickCreate
    var core = require('web.core');
    var _t = core._t;

    RecordQuickCreate.include({


    events: _.defaults({
        'click .o_new_task': 'add_record',
    }, RecordQuickCreate.prototype.events),

    init: function (parent, width) {
        this._super(parent, width);

    },

    start: function(parent) {
        this._super(parent);
        var model = this.__parentedParent.dataset.model
        var context = this.__parentedParent.dataset.context
        context.__contexts[0].__contexts.push({'assigned_history': true})
        if (model != 'project.task') {
            $('.task').remove();
            $('.o_kanban_add').removeClass('oe_hidden');
            $('.o_new_task').remove();
        } else {
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
            this.$('.o_datepicker_input').datetimepicker(datepickers_options);
            new Model('res.users').call('search', [[]], {context: context}).then(function (users) {
                 new Model('res.users').call('read', [users, ['id', 'name']]  ).then(function (results) {
                    _.each(results, function(r) {
                        $('.chosen-select').append('<option value="' + r.id + '">' + r.name + '</option>')
                        $('.chosen-select').trigger("chosen:updated");
                    })
                });
            });
            $('.chosen-select').chosen();
                this.$('.oe_name').focus();

        }
    },

    isDate: function(dateString) {
        var datetime = moment(dateString, ['YYYY/MM/DD'], true);
        if (datetime.isValid()) {
            return true
        } else {return false}
    },

    add_record: function() {
        if ( this.__parentedParent.dataset.model == 'project.task') {
            var isDate = this.isDate(this.$('.o_datepicker_input').val())
            if (isDate == true) {
                var data = {
                    description: this.$('.note-editing-area').val(),
                    date_deadline: this.$('.o_datepicker_input').val(),
                    name: this.$('.oe_name').val(),
                    user_id: parseInt(this.$('.chosen-select').val()),
                }
                var tmp_str = '' 
                for (var i = 0; i<data.description.length; i++)
                    {
                        if (data.description[i] == '\n' || data.description[i] == '\r')
                            tmp_str += '<br/>'
                        else
                            tmp_str += data.description[i]
                    }          
                data.description = tmp_str; 
                this.trigger_up('add_new_task_kaban', {value: data});
            } else {
                this.do_warn(_t("Deadline [" + this.$('.o_datepicker_input').val() + "] Không hợp lệ, vui lòng kiểm tra."));
            }
        } else {
            var value = this.$input.val();
            this.$input.val('');
            if (/^\s*$/.test(value)) { return; }
            this.trigger_up('quick_create_add_record', {value: value});
            this.$input.focus();
        }

    }
});

    return {
        RecordQuickCreate: RecordQuickCreate,
    };
});
