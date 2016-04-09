odoo.define('web_gmaps.gmaps', function (require) {

    var core = require('web.core');
    var View = require("web.View");
    var common = require('web.form_common');
    var QWeb = core.qweb;
    var utils = require('web.utils');
    var data = require('web.data');

    var _t = core._t;
    var _lt = core._lt;

    var Model = require('web.DataModel');

    var FieldGmapsMarker = common.AbstractField.extend({
        template: "gmap_marker",

        init: function (field_manager, node) {
            this._super(field_manager, node);
            this.fields = this.field_manager.fields;
            this.dataset = new data.DataSetStatic(this, this.field.relation, this.build_context());
            this.google = google;
            this.map = null;
        },

        start: function () {
            this.on_ready();
        },


        on_ready: function () {
            var lat = this.field_manager.get_field_value('lat')
            var lng = this.field_manager.get_field_value('lng')
            var address = this.field_manager.get_field_value('address')

            this.map = new google.maps.Map(this.$el[0], {
                zoom: 18,
                center: new google.maps.LatLng(lat, lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            this.map.setCenter(new this.google.maps.LatLng(lat, lng))
            var marker = new this.google.maps.Marker({
                position: new this.google.maps.LatLng(lat, lng),
                map: this.map,
                icon: '/web_gmaps/static/src/img/car.png',
            })

            this.field_manager.on("field_changed:" + this.fields['address'], this, this.display_result);
        },

        display_result: function () {

        }
    });

    core.form_widget_registry.add('gmap_marker', FieldGmapsMarker)


    var FieldGmapsWaypoints = common.AbstractField.extend({
        template: "gmap_waypoints",

        init: function (field_manager, node) {
            this._super(field_manager, node);
            this.fields = this.field_manager.fields;
            this.dataset = new data.DataSetStatic(this, this.field.relation, this.build_context());
            this.google = google;
            this.map = null;
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
        },

        start: function () {
            this.on_ready();
        },

        on_ready: function () {
            var geo_ids = this.field_manager.get_field_value('geo_ids')
            var geoArrayIds = []
            _.each(geo_ids, function (geo) {
                geoArrayIds.push(geo[0])
            })
            var datas = [];
            var self = this;
            var geo = _.bind(function () {
                return self.field_manager.fields['geo_ids'].dataset.read_ids(geo_ids, ['address', 'lat', 'lng']).done(function (results) {
                    _.each(results, function (result) {
                        datas.push(result)
                    })
                })
            })
            var self = this;
            geo().then(function () {

                var map = new google.maps.Map(self.$el[0], {
                    zoom: 6,
                    center: {lat: 41.85, lng: -87.65}
                });
                self.directionsDisplay.setMap(map);
                for (var i = 0; i < datas.length; i++) {
                    var wp = [];
                    for (var i = 0; i < datas.length; i++) {
                        wp[i] = {
                            location: new self.google.maps.LatLng(datas[i]['lat'], datas[i]['lng']),
                            stopover: true
                        };

                    }
                    var request = {
                        'origin': wp[0].location,
                        'destination': wp[wp.length - 1].location,
                        'waypoints': wp,
                        optimizeWaypoints: false,
                        avoidHighways: false,
                        avoidTolls: false,
                        travelMode: self.google.maps.TravelMode.DRIVING,
                    }
                    self.directionsService.route(request, function (res, sts) {
                        if (sts == 'OK')
                            self.directionsDisplay.setDirections(res);
                    });

                }
            })
        },

        display_result: function () {


        },


        get_waypoints: function () {


        }


    });

    core.form_widget_registry.add('gmap_waypoints', FieldGmapsWaypoints)


    var GmapView = View.extend({

        template: 'Gmaps',
        view_type: 'gmaps',
        icon: 'fa fa-map-marker',
        display_name: _lt('Google Maps'),

        init: function (parent, dataset, view_id, options) {
            this._super(parent);
            this.set_default_options(options);
            this.view_manager = parent;
            this.dataset = dataset;
            this.model = dataset.model;
            this.view_id = view_id;
            this.records = {};
            this.options = _.extend({}, this.defaults, options || {});
            this.google = google;


        },

        view_loading: function (r) {
            return this.load_maps(r);
        },

        fields_list: function () {
            var fields = _.keys(this.fields);
            if (!_(fields).contains(this.children_field)) {
                fields.push(this.children_field);
            }
            return fields;
        },

        load_maps: function (fields_view) {
            var self = this;
            var has_toolbar = !!fields_view.arch.attrs.toolbar;
            // field name in OpenERP is kinda stupid: this is the name of the field
            // holding the ids to the children of the current node, why call it
            // field_parent?
            this.children_field = fields_view.field_parent;
            this.fields_view = fields_view;
            _(this.fields_view.arch.children).each(function (field) {
                if (field.attrs.modifiers) {
                    field.attrs.modifiers = JSON.parse(field.attrs.modifiers);
                }
            });
            this.fields = fields_view.fields;
            this.$el.html(QWeb.render('Gmaps', {
                'title': this.fields_view.arch.attrs.string,
                'fields_view': this.fields_view.arch.children,
                'fields': this.fields,
                'toolbar': has_toolbar
            }));
            this.$el.addClass(this.fields_view.arch.attrs['class']);
            this.$el.show().css({
                opacity: '1000',
                filter: 'alpha(opacity = 1000)'
            });

            var myLatlng = new this.google.maps.LatLng(10.768451, 106.6943626);
            var mapOptions = {
                zoom: 5,
                center: myLatlng
            };
            var div_gmap = this.$el[0];
            this.map = new google.maps.Map(div_gmap, mapOptions);
            window.setTimeout(function () {
                new PNotify({
                    text: 'Google Gmaps View',
                    type: 'success',
                    delay: 1000,
                    history: false,
                    sticker: true
                });
            }, 10);
        },


        // hide data
        do_hide: function () {
            this.hidden = true;
            this._super();
        },


        // search data
        do_search: function (domain, context, group_by) {
            var self = this;
            new Model(this.dataset.model).call('search', [domain.concat()])
                .then(function (records) {
                    if (records.length >= 1) {
                        _.each(records, function (id) {
                            new Model(self.dataset.model).call('read', [[id], ['name', 'lat', 'lng', 'address']]).then(function (datas) {
                                if (datas.length >= 1) {
                                    _.each(datas, function (record) {
                                        self.add_record_to_maps(record)
                                    })
                                }
                            })
                        })
                    } else {
                        var myLatlng = new self.google.maps.LatLng(10.768451, 106.6943626);
                        var mapOptions = {
                            zoom: 5,
                            center: myLatlng
                        };
                        var div_gmap = self.$el[0];
                        self.map = new self.google.maps.Map(div_gmap, mapOptions);
                    }
                });


        },

        add_record_to_maps: function (record) {
            this.map.setCenter(new this.google.maps.LatLng(record.lat, record.lng))
            var marker = new this.google.maps.Marker({
                position: new this.google.maps.LatLng(record.lat, record.lng),
                map: this.map,
                icon: '/web_gmaps/static/src/img/car.png',
            })
            this.eventMaps(marker, record.name + ', ' + record.address)
            this.displayRoute(record);
        },

        displayRoute: function (record) {

            var start = new this.google.maps.LatLng(28.694004, 77.110291);
            var end = new this.google.maps.LatLng(28.72082, 77.107241);

            var directionsDisplay = new this.google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
            directionsDisplay.setMap(this.map); // map should be already initialized.

            var request = {
                origin: start,
                destination: end,
                travelMode: this.google.maps.TravelMode.DRIVING
            };
            var directionsService = new this.google.maps.DirectionsService();
            directionsService.route(request, function (response, status) {
                if (status == this.google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        },


        // event with maps
        eventMaps: function (marker, content) {
            var google = this.google;
            var map = this.map;
            var infowindow = new this.google.maps.InfoWindow({
                content: content,
                size: new this.google.maps.Size(10, 10)
            });
            this.google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
                map.setZoom(18);
            });

            google.maps.event.addListener(marker, 'rightclick', function () {
                infowindow.open(map, marker);
                map.setZoom(6);
            });
        },


    });
    // standard way to add a view in Odoo
    core.view_registry.add('gmaps', GmapView);
    return GmapView;
});
