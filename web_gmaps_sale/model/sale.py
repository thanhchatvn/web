# -*- coding: utf-8 -*

from openerp import fields, api, _, models
from pygeocoder import Geocoder
import logging

_logger = logging.getLogger(__name__)


class order(models.Model):

    _inherit = "sale.order"

    lat = fields.Float('Lat', digits=(16,10))
    lng = fields.Float('Lng', digits=(16,10))
    address = fields.Char('Map Address')

    @api.one
    def get_lat_long_gmap(self):
        _logger.info('begin get_lat_long_gmap')
        if self.partner_shipping_id:
            address = self.partner_shipping_id.name
            address += ', '
            address += self.partner_shipping_id.street
            street = ''
            street += self.partner_shipping_id.street
            if self.partner_shipping_id.street2:
                street += ', '
                street += self.partner_shipping_id.street2
            if self.partner_shipping_id.city:
                street += ', '
                street += self.partner_shipping_id.city
            if self.partner_shipping_id.country_id:
                street += ', '
                street += self.partner_shipping_id.country_id.name
            results = Geocoder.geocode(street)
            val = results[0].coordinates
            lat = val[0]
            lng = val[1]
            _logger.info('lat: %s' % lat)
            _logger.info('lat: %s' % lng)
            self.write({'lat': lat, 'lng': lng, 'address': address})
        _logger.info('end get_lat_long_gmap')
        return True
