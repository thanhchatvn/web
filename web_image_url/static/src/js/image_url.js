odoo.define('web_image_url.render_image', function (require) {
"use strict";
    var core = require('web.core');
    var data = require('web.data');
    var Model = require('web.Model');
    var session = require('web.session');
    var form = require('web.form_widgets');
    var _t = core._t;
    var web_client = require('web.web_client');

    var image_url = form.FieldChar.extend({
        template: "image_url",

         store_dom_value: function () {
            if (this.$input && this.is_syntax_valid()) {
                this.internal_set_value(this.parse_value(this.$input.find('#input').val()));
            }
         },

        render_value: function() {
            var self = this;
            var show_value = this.format_value(this.get('value'), '');
            if (!self.get("effective_readonly")) {
                self.$el.find('#input')
                        .attr('type', 'text')
                        .attr('value',show_value);
            } else {
                var url = show_value;
                var flag = false;
                $("<img>", {
                    src: url,
                    error: function() {
                        self.do_warn(_t("Image"), _t("Could not display the selected image."));
                        imageRender(flag,url);
                    },
                    load: function() {
                        flag = true;
                        imageRender(flag, url);
                    }
                });
            }
        },

    });
    core.form_widget_registry.add('image_url', image_url);

    var image_url = core.list_widget_registry.get('field.char').extend({

        _format: function(row_data, options) {
            var value = row_data[this.id].value, src;
            if (value != '') {
                if(value.substr(0,7)== 'http://' || value.substr(0,8)== 'https://'){
                    return _.template('<span class="line_image"><img class="avatar" height="64px" border="1" src="<%-href%>"</img></span>')({
                        href: value,
                    });
                }
            }
            return this._super.apply(this, arguments);
        },
    });

    core.list_widget_registry.add("field.char", image_url);

    function imageRender(flag,url){
             if(flag){
                    $('#image')
                            .attr('src', url);
                }else{
                    $('#image')
                            .attr('src', '/web/static/src/img/placeholder.png');
                }
    }
});
