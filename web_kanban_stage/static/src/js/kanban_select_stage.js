odoo.define('web_kanban_stage.select_stage', function (require) {
    "use strict";

    var Widget = require('web.Widget');
    var Model = require('web.DataModel');
    var core = require('web.core');


    var SelectStage = Widget.extend({
        template: 'KanbanView.SelectStage',

        events: {
            'click .o_stage_header_title': 'toggle',

            'click .o_stage_add': function(event) {
                this.add_column(event);
            },
            'click .o_stage_add_cancel': function (event) {
                this.folded = true;
                this.update();
            },
            'click .o_column_add_stage': function (event) {
                event.stopPropagation();
            },
            'keypress select': function (event) {
                if (event.keyCode === 13) {
                    this.add_column();
                }
            },
            'keydown': function (event) {
                if (event.keyCode === 27) {
                    this.folded = true;
                    this.update();
                }
            },
            'mouseover': function(event) {
                console.log('hover on')
            },

            'mousedown .o_stage_add': 'suppress',
            'mousedown .o_stage_add_cancel': 'suppress',
        },

        init: function (parent) {
            this._super(parent);
            this.folded = true;
        },

        start: function () {
            this.$el.css({width: this.width});
            this.$header = this.$('.o_stage_header');
            this.$quick_create = this.$('.o_kanban_add_stage');
            this.$input = this.$('.o_stage_select');
            this.append_element();

        },

        append_element: function() {

            var self = this;
            new Model('project.task.type').call('search', [[]]).then(function (results) {
                var stage_ids = []
                var elements = $('.o_kanban_group')
                _.each(elements, function(el) {
                    var attr = el.attributes;
                    if (attr && attr['1']) {
                        stage_ids.push(parseInt(attr['1'].value))
                    }
                })
                _.each(results, function(i) {
                    if (stage_ids.indexOf(i) >= 0) {
                    } else {
                        new Model('project.task.type').call('read', [[i], ['id', 'name']]  ).then(function (results) {
                            _.each(results, function(r) {
                                self.$('.o_stage_select').append('<option value=' + r.id+ ' id='+ r.id+'>' + r.name + '</option>')
                            })

                        });
                    }
                })
            })



        },

        toggle: function () {
            this.folded = !this.folded;
            this.update();
            if (!this.folded) {
                this.$input.focus();
                this.trigger_up('scrollTo', {selector: '.o_column_add_stage'});
            }
        },

        update: function () {
            this.$header.toggle(this.folded);
            this.$quick_create.toggle(!this.folded);
        },

        add_column: function () {
            var stage_id = $('.o_stage_select').val()
            this.trigger_up('add_new_stage', {value: stage_id});
            $('.o_stage_select').focus();
            this.update();
        },
        suppress: function (e) {
            e.preventDefault();
        },
    });


    return {
        SelectStage: SelectStage,
    };
});
