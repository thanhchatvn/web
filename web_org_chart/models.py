# -*- coding: utf-8 -*-
from openerp.osv import fields, osv, orm
import logging
_logger = logging.getLogger(__name__)

class view(osv.osv):
    _inherit = ['ir.ui.view']

    _columns  = {
        'type': fields.selection([
            ('tree','Tree'),
            ('form','Form'),
            ('graph', 'Graph'),
            ('pivot', 'Pivot'),
            ('calendar', 'Calendar'),
            ('diagram','Diagram'),
            ('gantt', 'Gantt'),
            ('kanban', 'Kanban'),
            ('sales_team_dashboard', 'Sales Team Dashboard'),
            ('search','Search'),
            ('orgchart','OrgChart'),
            ('qweb', 'QWeb')], string='View Type'),
    }
