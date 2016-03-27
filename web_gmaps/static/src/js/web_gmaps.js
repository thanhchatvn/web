odoo.define('web_gmaps.gmaps', function (require) {

    var core = require('web.core');
    var View = require("web.View");
    var form_common = require('web.form_common');
    var QWeb = core.qweb;

    var gmap_marker = form_common.FormWidget.extend({
        template: "gmap_marker",
        init: function (view, code) {
            this._super(view, code);
            //this.field_id = code.attrs.id;
            //this.fields = code.attrs.fields;
            //this.filters = code.attrs.filters;
            //this.limit = code.attrs.limit;
            //this.model = code.attrs.model;
        },

        start: function () {

            if (typeof google == 'undefined') {
                window.ginit = this.on_ready;
                $.getScript('http://maps.googleapis.com/maps/api/js?sensor=false&callback=ginit');
            }
            else {
                this.on_ready();
            }

        },


        on_ready: function () {

            fields = JSON.parse(this.field_manager.get_field_value(this.fields));
            filters = JSON.parse(this.field_manager.get_field_value(this.filters));
            var limit = JSON.parse(this.field_manager.get_field_value(this.limit));
            var model = JSON.parse(this.field_manager.get_field_value(this.model));
            var field = [];
            _.each(fields, function (key, value) {
                field.push(key)
            })
            var filter = [];
            _.each(filters, function (key, value) {
                if (parseInt(key[2]) != NaN) {
                    filter.push([key[0], key[1], parseInt(key[2])])
                }
                else {
                    filter.push([key[0], key[1], key[2]])
                }

            })
            if (limit == false) {
                limit = null;
            }

            element_parse = this.$el[0] // get element parser
            var map = new google.maps.Map(element_parse, { // new google map view
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            var locations = [

                ['128 PLD', 10.8022342, 106.6834903, 1],
                ['130 PLD', 10.8019602, 106.683324, 2],


            ]

            element_parse = this.$el[0] // get element parser
            var map = new google.maps.Map(element_parse, {
                zoom: 18,
                center: new google.maps.LatLng(10.8022342, 106.6834903),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            debugger;

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });
                map.setCenter(new google.maps.LatLng(locations[i][1], locations[i][2]));

                //google.maps.event.addListener(marker, 'click', (function(marker, i) {
                //    return function() {
                //        infowindow.setContent(locations[i][0]);
                //        infowindow.open(map, marker);
                //    }
                //})(marker, i));
            }

            //model_pool = new openerp.Model(model)
            //model_pool.query(field)
            //    .filter(filter)
            //    .limit(limit)
            //    .all().then(function (locations) {
            //        console.log('len location: ' + locations.length)
            //        for ( var i= 0; i < locations.length; i ++) {
            //            var location = locations[i]
            //            var lat = location.lat
            //            var lng = location.lng
            //            map.setCenter(new google.maps.LatLng(lat, lng)); // set center for map
            //            marker = new google.maps.Marker({ //add location for map (marker)
            //                position: new google.maps.LatLng(lat, lng),
            //                map: map
            //            });
            //
            //            google.maps.event.addListener(marker, 'click', (function(marker, i) { // add event click for marker
            //                return function() {
            //                    infowindow.setContent(location.name);
            //                    infowindow.open(map, marker);
            //                    map.setZoom(15);
            //                    map.setCenter(new google.maps.LatLng(lat, lng))
            //
            //                }
            //            })(marker, i));
            //
            //            google.maps.event.addListener(marker, 'dblclick', (function(marker, i) { // add event click for marker
            //                return function() {
            //                    infowindow.setContent(location.street1);
            //                    infowindow.open(map, marker);
            //                    map.setZoom(20);
            //                    map.setCenter(new google.maps.LatLng(lat, lng))
            //
            //                }
            //            })(marker, i));
            //        }
            //    });
            this.field_manager.on("field_changed:" + this.field_id, this, this.display_result);
        },


        display_result: function () {
            debugger;
            fields = JSON.parse(this.field_manager.get_field_value(this.fields));
            filters = JSON.parse(this.field_manager.get_field_value(this.filters));
            var limit = JSON.parse(this.field_manager.get_field_value(this.limit));
            var model = JSON.parse(this.field_manager.get_field_value(this.model));
            var field = [];
            _.each(fields, function (key, value) {
                field.push(key)
            })
            var filter = [];
            _.each(filters, function (key, value) {
                if (parseInt(key[2]) != NaN) {
                    filter.push([key[0], key[1], parseInt(key[2])])
                }
                else {
                    filter.push([key[0], key[1], key[2]])
                }

            })
            if (limit == false) {
                limit = null;
            }

            element_parse = this.$el[0] // get element parser
            var map = new google.maps.Map(element_parse, { // new google map view
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            var locations = [


                ['150 PLD', 10.801428, 106.6827661, 1],

            ]

            var map = new google.maps.Map(element_parse, {
                zoom: 18,
                center: new google.maps.LatLng(-33.92, 151.25),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });
                map.setCenter(new google.maps.LatLng(locations[i][1], locations[i][2]));

                //google.maps.event.addListener(marker, 'click', (function(marker, i) {
                //    return function() {
                //        infowindow.setContent(locations[i][0]);
                //        infowindow.open(map, marker);
                //    }
                //})(marker, i));
            }

            //model_pool = new openerp.Model(model)
            //model_pool.query(field)
            //    .filter(filter)
            //    .limit(limit)
            //    .all().then(function (locations) {
            //        console.log('len location: ' + locations.length)
            //        for ( var i= 0; i < locations.length; i ++) {
            //            var location = locations[i]
            //            var lat = location.lat
            //            var lng = location.lng
            //            map.setCenter(new google.maps.LatLng(lat, lng)); // set center for map
            //            marker = new google.maps.Marker({ //add location for map (marker)
            //                position: new google.maps.LatLng(lat, lng),
            //                map: map
            //            });
            //
            //            google.maps.event.addListener(marker, 'click', (function(marker, i) { // add event click for marker
            //                return function() {
            //                    infowindow.setContent(location.name);
            //                    infowindow.open(map, marker);
            //                    map.setZoom(15);
            //                    map.setCenter(new google.maps.LatLng(lat, lng))
            //
            //                }
            //            })(marker, i));
            //
            //            google.maps.event.addListener(marker, 'dblclick', (function(marker, i) { // add event click for marker
            //                return function() {
            //                    infowindow.setContent(location.street1);
            //                    infowindow.open(map, marker);
            //                    map.setZoom(20);
            //                    map.setCenter(new google.maps.LatLng(lat, lng))
            //
            //                }
            //            })(marker, i));
            //        }
            //    });
            this.field_manager.on("field_changed:" + this.field_id, this, this.display_result);

        }
    });

    core.form_widget_registry.add('gmap_marker', gmap_marker)

    var gmap_location = form_common.FormWidget.extend({
        template: "gmap_location",
        init: function (view, code) {
            this._super(view, code);
            this.field_lat = code.attrs.lat;
            this.field_lng = code.attrs.lng;
        },

        start: function () {
            if (typeof google == 'undefined') {
                window.ginit = this.on_ready;
                $.getScript('http://maps.googleapis.com/maps/api/js?sensor=false&callback=ginit');
            }
            else {
                this.on_ready();
            }
            var self = this;
            self.on("change:effective_readonly", self, function () {
                self.marker.setDraggable(self.get("effective_readonly") ? false : true);
            });
        },

        on_ready: function () {
            var lat = this.field_manager.get_field_value(this.field_lat);
            var lng = this.field_manager.get_field_value(this.field_lng);

            var myLatlng = new google.maps.LatLng(lat, lng);
            var mapOptions = {
                zoom: 8,
                center: myLatlng
            };

            var div_gmap = this.$el[0];

            map = new google.maps.Map(div_gmap, mapOptions);

            this.marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                draggable: false
            });

            var my_self = this;

            google.maps.event.addListener(this.marker, 'dragend', function (NewPoint) {
                lat = NewPoint.latLng.lat();
                lng = NewPoint.latLng.lng();
                my_self.update_latlng(lat, lng);
            });


            this.field_manager.on("field_changed:" + this.field_lat, this, this.display_result);
            this.field_manager.on("field_changed:" + this.field_lng, this, this.display_result);
        },

        update_latlng: function (lat, lng) {
            var values = {};
            values[this.field_lat] = lat;
            values[this.field_lng] = lng;
            this.field_manager.set_values(values).done(function () {
            });
        },

        display_result: function () {
            var lat = this.field_manager.get_field_value(this.field_lat);
            var lng = this.field_manager.get_field_value(this.field_lng);
            var myLatlng = new google.maps.LatLng(lat, lng);
            map.setCenter(myLatlng);
            this.marker.setPosition(myLatlng);
        }


    });

    core.form_widget_registry.add('gmap_location', gmap_location)

    var gmap_route = form_common.FormWidget.extend({
        template: "gmap_route",

        init: function (view, code) {
            this._super(view, code);
            this.field_from_lat = code.attrs.from_lat;
            this.field_from_lng = code.attrs.from_lng;
            this.field_to_lat = code.attrs.to_lat;
            this.field_to_lng = code.attrs.to_lng;

            this.field_distance = code.attrs.distance;
            this.field_duration = code.attrs.duration;

        },

        start: function () {
            if (typeof google == 'undefined') {
                window.ginit = this.on_ready;
                $.getScript('http://maps.googleapis.com/maps/api/js?&sensor=false&callback=ginit');
            }
            else {
                this.on_ready();
            }

        },

        on_ready: function () {
            var self = this;
            var from_lat = this.field_manager.get_field_value(this.field_from_lat);
            var from_lng = this.field_manager.get_field_value(this.field_from_lng);
            var to_lat = this.field_manager.get_field_value(this.field_to_lat);
            var to_lng = this.field_manager.get_field_value(this.field_to_lng);

            var div_gmap = this.$el[0];

            var from_Latlng = new google.maps.LatLng(from_lat, from_lng);
            var to_Latlng = new google.maps.LatLng(to_lat, to_lng);

            var mapOptions = {
                zoom: 8,
                center: from_Latlng
            };

            map = new google.maps.Map(div_gmap, mapOptions);

            this.directionsService = new google.maps.DirectionsService();

            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.directionsDisplay.setMap(map);


            this.field_manager.on("field_changed:" + this.field_from_lat, this, this.display_result);
            this.field_manager.on("field_changed:" + this.field_from_lng, this, this.display_result);
            this.field_manager.on("field_changed:" + this.field_to_lat, this, this.display_result);
            this.field_manager.on("field_changed:" + this.field_to_lng, this, this.display_result);

            self.on("change:effective_readonly", self, function () {
                var rendererOptions = {
                    draggable: self.get("effective_readonly") ? false : true
                };
                self.directionsDisplay.setOptions(rendererOptions);
            });

            google.maps.event.addListener(self.directionsDisplay, 'directions_changed', function () {
                if (!self.get("effective_readonly")) {
                    self.computeTotal(self.directionsDisplay.getDirections());
                }

            });

            this.display_result();
            this.updating = false;
        },

        display_result: function () {

            if (this.updating) return;
            var self = this;


            var from_lat = this.field_manager.get_field_value(this.field_from_lat);
            var from_lng = this.field_manager.get_field_value(this.field_from_lng);
            var to_lat = this.field_manager.get_field_value(this.field_to_lat);
            var to_lng = this.field_manager.get_field_value(this.field_to_lng);

            if (from_lat == 0 | from_lng == 0 | to_lat == 0 | to_lng == 0)
                return;
            var from_Latlng = new google.maps.LatLng(from_lat, from_lng);
            var to_Latlng = new google.maps.LatLng(to_lat, to_lng);
            var request = {
                origin: from_Latlng,
                destination: to_Latlng,
                travelMode: google.maps.TravelMode.DRIVING
            };
            self.directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    self.directionsDisplay.setDirections(response);
                    if (!self.get("effective_readonly")) {
                        self.computeTotal(response);
                    }
                }
            });
        },


        computeTotal: function (result) {
            var self = this;
            var distance = 0;
            var duration = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                distance += myroute.legs[i].distance.value;
                duration += myroute.legs[i].duration.value;

            }
            distance = distance / 1000.0;
            duration = duration / 60 / 60;
            var values = {};

            values[this.field_distance] = distance;
            values[this.field_duration] = duration;

            values[this.field_from_lat] = result.Lb.origin.lat();
            values[this.field_from_lng] = result.Lb.origin.lng();

            values[this.field_to_lat] = result.Lb.destination.lat();
            values[this.field_to_lng] = result.Lb.destination.lng();

            this.updating = true;
            this.field_manager.set_values(values).done(function () {
                self.updating = false;
            });

        }


    });

    core.form_widget_registry.add('gmap_route', gmap_route)


    var GmapView = View.extend({

        template: 'Gmaps',
        view_type: 'gmaps',

        init: function(parent, dataset, view_id, options) {
            this._super(parent);
            this.set_default_options(options);
            this.view_manager = parent;
            this.dataset = dataset;
            this.model = dataset.model;
            this.view_id = view_id;
            this.records = {};
            this.options = _.extend({}, this.defaults, options || {});
            if (typeof google == 'undefined') {
                window.ginit = this.on_ready;
                $.getScript('http://maps.googleapis.com/maps/api/js?&sensor=false&callback=ginit');
            }
            this.google = google;

        },

        view_loading: function(r) {
            return this.load_maps(r);
        },

        fields_list: function () {
            var fields = _.keys(this.fields);
            if (!_(fields).contains(this.children_field)) {
                fields.push(this.children_field);
            }
            return fields;
        },

        load_maps: function(fields_view) {
            console.log('load_maps');
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
            this.dataset.read_slice(this.fields_list()).done(function(records) {
                _.each(records, function(record) {
                    self.add_record_to_maps(record)
                })
            });

        },

        do_hide: function () {
            this.hidden = true;
            this._super();
        },


        do_show: function (options) {
            var google = this.google;
            var map = this.map;
            this._super();
            this.$el.show();
            //debugger;
            //console.log('do_show()');
            //var myLatlng = new this.google.maps.LatLng(10.768451, 106.6943626);
            //var mapOptions = {
            //    zoom: 5,
            //    center: myLatlng
            //};
            //var div_gmap = this.$el[0];
            //new google.maps.Map(div_gmap, mapOptions);
            //debugger;



            //
            //var self = this;
            //
            //this.$el.show().css({
            //    opacity: '1000',
            //    filter: 'alpha(opacity = 1000)'
            //});
            //if (typeof google == 'undefined') {
            //    window.ginit = this.on_ready;
            //    $.getScript('http://maps.googleapis.com/maps/api/js?&sensor=false&callback=ginit');
            //}
            //else {
            //    var fields = _.keys(self.fields_view.fields);
            //    fields.push('display_name');
            //    self.dataset.read_index(fields, {
            //        context: {'bin_size': true, 'future_display_name': true}
            //    }).then(function (r) {
            //        if (r != undefined) {
            //            self.on_ready(r); // use trigger from int function
            //        }
            //
            //    });
            //
            //}
            //this.$el.show();
        },


        on_ready: function (record) {

            console.log('on_ready');
            this.google = google;
            var myLatlng = new this.google.maps.LatLng(10.768451, 106.6943626);
            var mapOptions = {
                zoom: 5,
                center: myLatlng
            };
            var div_gmap = this.$el[0];
            map = new google.maps.Map(div_gmap, mapOptions);
            //if (record != undefined) {
            //    var tags = this.fields_view.arch.children;
            //    var wiget_type;
            //    var objectchild;
            //    for (var i = 0; i < tags.length; i++) {
            //        if (tags[i].tag == 'widget') {
            //            wiget_type = tags[i].attrs.type
            //            objectchild = tags[i].attrs.objectchild
            //        }
            //    }
            //    if (wiget_type == 'gmap_single_location') {
            //        this.add_single_map(map, record)
            //    } else {
            //        this.add_multi_map(map, record, objectchild)
            //    }
            //} else {
            //    //
            //    console.log('can not loading marker');
            //}
        },
        // how to loading multi data from view
        // important
        //this.dataset.read_slice([], {}).then(function(models){
        //    _.each(models,function(m, i){
        //            self.add_multi_map(m, objectchild)
        //    });
        //});

        add_record_to_maps: function(record) {
            this.map.setCenter(new this.google.maps.LatLng(record.lat, record.lng))
            var marker = new this.google.maps.Marker({
                position: new this.google.maps.LatLng(record.lat, record.lng),
                map: this.map
            })
            this.eventMaps(marker, record.address)
        },

        add_single_map: function (map, record) {
            console.log('add_single_map()')

            var description = '';
            description += record.name + ', ' + record.address
            var lat = record.lat
            var lng = record.lng
            console.log('lat: ' + lat)
            console.log('lng: ' + lng)
            console.log('marker')
            map.setCenter(new google.maps.LatLng(lat, lng));
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map
            });
            this.eventMaps(marker, description)
        },

        add_multi_map: function (map, record, objectchild) {
            console.log('add_multi_map()')
            model_pool = new openerp.Model(objectchild)
            var self = this;
            var id = record.id
            model_pool.query(['name', 'street1', 'lat', 'lng', 'district_id', 'city_id'])
                .filter([['customer_id', '=', id]])
                .all().then(function (locations) {
                console.log('have :' + locations.length + ' warehouse');
                for (var i = 0; i < locations.length; i++) {
                    var location = locations[i]
                    var description = '';
                    description += location.name + ', ' + location.street1
                    if (location.district_id != false) {
                        description += ', ' + location.district_id[1]
                    }
                    if (record.city_id != false) {
                        description += ', ' + location.city_id[1]
                    }
                    var lat = location.lat
                    var lng = location.lng
                    if (lat > 0 && lng > 0) {
                        map.setCenter(new google.maps.LatLng(lat, lng));
                        marker = new google.maps.Marker({ //add location for map (marker)
                            position: new google.maps.LatLng(lat, lng),
                            map: map
                        });
                        self.eventMaps(marker, description)
                    }
                }
            });

        },


        // event with maps
        eventMaps: function (marker, content) {
            var google = this.google;
            var map = this.map;
            var infowindow = new google.maps.InfoWindow({
                content: content,
                size: new google.maps.Size(10, 10)
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


        do_load_record: function (record) {
            var self = this;
            _(self.fields_view.arch.children).each(function (data) {
                self.do_add_item(data, record)
            });
        },

        do_add_item: function (item, record) {


            if (item.tag == 'widget' && item.attrs.type == 'gmap_location') {
                var lat = record[item.attrs.lat]
                var lng = record[item.attrs.lng]
                console.log(lat);
                console.log(lng);
                console.log('map ne');
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map
                });
                return $.when();


                //var lat = record[item.attrs.lat];
                //var lng = record[item.attrs.lng]
                //console.log(lat);
                //console.log(lng);
                //var myLatlng = new google.maps.LatLng(lat, lng);
                //var marker = new google.maps.Marker({
                //    position: myLatlng,
                //    map: map,
                //    draggable:false
                //});

            }
            //if (item.tag == 'widget' && item.attrs.type == 'gmap_route' ){
            //
            //   var from_lat = record[item.attrs.from_lat]
            //   var from_lng =  record[item.attrs.from_lng]
            //   var to_lat =  record[item.attrs.to_lat]
            //   var to_lng =   record[item.attrs.to_lng]
            //
            //
            //   var from_Latlng = new google.maps.LatLng(from_lat, from_lng);
            //   var to_Latlng = new google.maps.LatLng(to_lat, to_lng);
            //   debugger;
            //   var request = {
            //         origin:from_Latlng,
            //         destination:to_Latlng,
            //         travelMode: google.maps.TravelMode.DRIVING
            //   };
            //   var directionsDisplay = new google.maps.DirectionsRenderer();
            //   directionsDisplay.setMap(map);
            //   self.directionsService.route(request, function(response, status) {
            //       if (status == google.maps.DirectionsStatus.OK) {
            //         directionsDisplay.setDirections(response);
            //
            //       }
            //   });
            //}


        }

    });
    // standard way to add a view in Odoo
    core.view_registry.add('gmaps', GmapView);
    return GmapView;
});
