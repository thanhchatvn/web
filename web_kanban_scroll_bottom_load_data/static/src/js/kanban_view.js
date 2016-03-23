odoo.define('web_kanban_scroll_bottom_load_data.kanban_view', function (require) {
    var utils = require('web.utils');
    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.DataModel');
    var session = require('web.session');
    var kanbanView = require('web_kanban.KanbanView');
    var Pager = require('web.Pager');


    Pager.include({
        _save_scroll: function($input) {
            var self = this;
            this.options.validate().then(function() {
                var value = $input.text().split("-");
                var min = utils.confine(parseInt(value[0], 10), 1, self.state.size);
                var max = utils.confine(parseInt(value[1], 10), 1, self.state.size) + 10;

                if (!isNaN(min)) {
                    self.state.current_min = min;
                    if (!isNaN(max)) {
                        self.state.limit = utils.confine(max-min+1, 1, self.state.size);
                    } else {
                        // The state has been given as a single value -> set the limit to 1
                        self.state.limit = 1;
                    }
                    self.trigger('pager_changed', _.clone(self.state));
                }
            }).always(function() {
                // Render the pager's new state (removes the input)
                self._render();
            });
        },
    });
    return Pager;
});
