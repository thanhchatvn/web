from openerp import api, fields, models

class image_url(models.Model):
    _name = "image.url"
    image_render = fields.Char('Image')
