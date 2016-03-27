# -*- coding: utf-8 -*-
##############################################################################
#
#                   Copyright (c) 2014
#                   Bruce Nguyen (thanhchatvn@gmail.com)

##############################################################################


from openerp.tools.translate import _
from openerp import models, fields, api
from openerp.addons.base.ir.ir_actions import VIEW_TYPES
from lxml import etree
from logging import getLogger
 



_logger = getLogger(__name__)
VIEW_TYPE = ('gmaps', _('Gmaps Google'))
VIEW_TYPES.append(VIEW_TYPE)

class IrUiView(models.Model):

    _inherit = 'ir.ui.view'

    type = fields.Selection(selection_add=[VIEW_TYPE])
