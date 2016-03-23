odoo.define('web_tree_image.tree_image', function (require) {

    var core = require('web.core');
    var session = require('web.session');

    var binary = core.list_widget_registry.get('field.binary').extend({

        _format: function(row_data, options) {
            var value = row_data[this.id].value, src;
            var download_url;
            if (this.type === 'binary') {
                if (value && value.substr(0, 10).indexOf(' ') === -1) {
                    download_url = "data:image/png;base64," + value;
                } else {
                    var imageArgs = {
                        model: options.model,
                        field: this.id,
                        id: options.id
                    }
                    if (this.resize) {
                        imageArgs.resize = this.resize;
                    }
                    download_url = session.url('/web/binary/image', imageArgs);
                }
            } else {
                if (!/\//.test(row_data[this.id].value)) {
                    download_url = '/web/static/src/img/icons/' + row_data[this.id].value + '.png';
                } else {
                    download_url = row_data[this.id].value;
                }
            }
            return _.template('<span class="line_image"><img class="avatar" border="1" src="<%-href%>"</img></span>')({
                href: download_url,
            });

        },
    });

    core.list_widget_registry.add("field.binary", binary);

})