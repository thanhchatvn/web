odoo.define('web_kanban_stage.select_stage', function (require) {

    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.Model');
    var session = require('web.session');
    var quick_create = require('web_kanban.quick_create');
    var ColumnQuickCreate = quick_create.ColumnQuickCreate;

    var KanbanColumn = require('web_kanban.Column');
    var KanbanView = require('web_kanban.KanbanView');
    var select_stage = require('web_kanban_stage.select_stage');
    var SelectStage = select_stage.SelectStage;
    var _t = core._t;



    KanbanView.include({

        custom_events: _.defaults({
            'add_new_stage': 'add_new_stage',
        }, KanbanView.prototype.custom_events),


        render_grouped: function (fragment) {

            var self = this;
            var record_options = _.extend(this.record_options, {
                draggable: true,
            });
            var dataset = this.dataset;
            var column_options = this.get_column_options();

            _.each(this.data.groups, function (group) {
                var column = new KanbanColumn(self, group, column_options, record_options);
                column.appendTo(fragment);
                self.widgets.push(column);
            });
            this.$el.sortable({
                axis: 'x',
                items: '> .o_kanban_group',
                cursor: 'move',
                revert: 150,
                delay: 100,
                tolerance: 'pointer',
                forcePlaceholderSize: true,
                stop: function () {
                    var ids = [];
                    self.$('.o_kanban_group').each(function (index, u) {
                        ids.push($(u).data('id'));
                    });
                    self.resequence(ids);
                },
            });
            if (this.is_action_enabled('group_create') && this.grouped_by_m2o) {
                if (dataset.model == 'project.task') {
                    this.select_stage = new SelectStage(this);
                    this.select_stage.appendTo(fragment);
                }
                this.column_quick_create = new ColumnQuickCreate(this);
                this.column_quick_create.appendTo(fragment);

            }
            this.postprocess_m2m_tags();
        },

        add_new_stage: function (event) {
            var self = this;
            var model = new Model(this.relation, this.search_context);
            var context = this.search_context
            model.call('read', [[parseInt(event.data.value)], ['id', 'name']], {context: this.search_context}).then(function (vals) {
                var dataset = new data.DataSetSearch(self, self.dataset.model, self.dataset.get_context(), []);
                vals = vals[0];
                var group_data = {
                    records: [],
                    title: vals.name,
                    id: vals.id,
                    attributes: {folded: false},
                    dataset: dataset,
                    values: {},
                };
                var options = self.get_column_options();
                var record_options = _.clone(self.record_options);
                var column = new KanbanColumn(self, group_data, options, record_options);
                column.insertBefore(self.$('.o_column_add_stage'));
                self.widgets.push(column);
                var columns = self.widgets
                self.trigger_up('scrollTo', {selector: '.o_column_add_stage'});
                vals['context'] = self.search_context
                model.call('update_stage_for_project',  [vals]);
            })
        },
    });

    return KanbanView;
});
