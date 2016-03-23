odoo.define('hhd_dashboard_example.controller', function (require) {
"use strict";

var core = require('web.core');
var Widget = require('web.Widget');
var Model = require('web.Model');
var session = require('web.session');
var framework = require('web.framework');
var ajax = require('web.ajax');

var QWeb = core.qweb;
var _t = core._t;
var Hhd_Dashboard = Widget.extend({
    template: 'HHDControllerMain',
    start: function(){
    },
});

core.action_registry.add('hhd_dashboard', Hhd_Dashboard);

return {
    Hhd_Dashboard: Hhd_Dashboard,
};

});
