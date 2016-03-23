odoo.define('web_kanban_hover.kanban_hover', function (require) {

    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.Model');
    var session = require('web.session');
    var record = require('web_kanban.Record');
    var view = require('web_kanban.KanbanView');

    var qweb = core.qweb;

    record.include({

        events: _.defaults({
            'mouseover': function(event) {
                var id = this.id
                var model = new Model(this.model);
                var self = this;
                if (this.model == 'project.task') {
                    model.call('read', [[id], ['message_ids']], {context: this.search_context}).then(function (results) {
                        for (var j=0; j < results.length; j ++) {
                            var result = results[j];
                            console.log('Done read backend');
                            var message_ids = result.message_ids
                            for (var i=0; i < message_ids.length; i++) {
                                var mess_id = message_ids[i];
                                new Model('mail.message').call('read', [[mess_id],  ['subject', 'date', 'body', 'author_id']]).then(function (vals) {
                                    var $cover_modal = $(qweb.render("kanban_hover", {
                                        widget: self,
                                    }));
                                    $cover_modal.appendTo($('.oe_leftbar'));
                                    $cover_modal.modal('toggle');

                                    $cover_modal.on('mouseout', function (ev) {
                                        $cover_modal.modal('toggle');
                                        $cover_modal.remove();
                                    })
                                })
                            }
                        }

                    })
                }
            },
        }, record.prototype.events),

    });

    return record;

})
