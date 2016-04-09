# -*- coding: utf-8 -*-

from openerp import fields, models, _, api

class fleet_geo(models.Model):

    _name = "fleet.vehicle.geo"
    _order = "id DESC"

    create_date = fields.Datetime('Create date', readonly=True)
    address = fields.Char('Address')
    lat = fields.Float('Lat', digits=(16, 6))
    lng = fields.Float('Lng', digits=(16, 6))
    fleet_id = fields.Many2one('fleet.vehicle', 'Fleet', required=True)

class fleet(models.Model):

    _inherit = "fleet.vehicle"

    address = fields.Char(compute='_get_address_information', string='Address')
    lat = fields.Float(compute='_get_address_information', string='Lat', digits=(16, 6))
    lng = fields.Float(compute='_get_address_information', string='Lng', digits=(16, 6))
    geo_ids = fields.One2many('fleet.vehicle.geo', 'fleet_id', 'Geos')


    @api.multi
    def _get_address_information(self):
        for fleet in self:
            for geo in fleet.geo_ids:
                fleet.address = geo.address
                fleet.lat = geo.lat
                fleet.lng = geo.lng
                break

