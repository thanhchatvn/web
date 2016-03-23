# -*- encoding: utf-8 -*-
##############################################################################
#
#    Copyright (c) 2015 HHGROUP ERP TEAM
#
##############################################################################

from openerp import models, fields, api

class ir_ui_menu(models.Model):

    _inherit = 'ir.ui.menu'

    menu_code = fields.Char('Menu Code', size=128)
    
    def get_access_menus(self, cr, uid, ids, parent_menu_id=False, context=None):
        res = []
        menu_ids = self.search(cr, uid, [('parent_id', '=', parent_menu_id)], context=context)
        for menu_obj in self.browse(cr, uid, menu_ids, context=context):
            if menu_obj.action:
                menu_data = {
                             'id': menu_obj.id,
                             'name': menu_obj.name,
                             'action': menu_obj.action.id
                             }
                res.append(menu_data)
            result = self.get_access_menus(cr, uid, ids, menu_obj.id, context=context)
            res.extend(result)
        return res
