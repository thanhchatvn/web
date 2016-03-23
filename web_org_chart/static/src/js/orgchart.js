odoo.define('web_org_chart.OrgChartView', function (require) {
/*---------------------------------------------------------
 * OpenERP diagram library
 *---------------------------------------------------------*/
"use strict";

var core = require('web.core');
var data = require('web.data');
var form_common = require('web.form_common');
var Pager = require('web.Pager');
var View = require('web.View');

var _t = core._t;
var _lt = core._lt;
var QWeb = core.qweb;

var OrgChartView = View.extend({
    display_name: _lt('OrgChart'),
    icon: 'fa-code-fork',
    view_type: 'orgchart',
    searchable: false,
    multi_record: false,
    init: function(parent, dataset, view_id, options) {
        this._super(parent);
        this.set_default_options(options);
        this.view_manager = parent;
        this.dataset = dataset;
        this.model = this.dataset.model;
        this.view_id = view_id;
        this.domain = this.dataset._domain || [];
        this.context = {};
        this.ids = this.dataset.ids;
    },

    view_loading: function(r) {
        return this.load_chart(r);
    },

    load_chart: function(result) {
        var self = this;
        var make = go.GraphObject.make;
        this.$el.html(QWeb.render("OrgChartView", {'widget': self}));
        var o_orgchart = $('.o_orgchart')
        this.$el.addClass('o_diagram_view').addClass(this.fields_view.arch.attrs['class']);

        _.each(self.labels,function(label){
            self.$('.o_diagram_header').append($('<span>').html(label.attrs.string));
        });


//        var myDiagram =
//        make(go.Diagram, o_orgchart,{
//            initialContentAlignment: go.Spot.Center, // center Diagram contents
//            "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
//        });


    },
});

core.view_registry.add('orgchart', OrgChartView);

return OrgChartView;

});
