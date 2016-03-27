# -*- coding: utf-8 -*-
##############################################################################
#
#                   Copyright (c) 2014
#                   Bruce Nguyen (thanhchatvn@gmail.com)

##############################################################################

{
    'name': 'Google Maps core web module',
    'sequence': 10,
    'description': """
    - How to : \n
        + Add new view type: demo for sale order \n

        <record id='view_order_gmaps' model='ir.ui.view'> \n
            <field name="name">sale.order.gmaps</field> \n
            <field name="model">sale.order</field> \n
            <field name="type">gmaps</field>\n
                <field name="arch" type="xml">\n
                <field name="name"/>\n
                <field name="address"/>\n
                <field name="lat"/>\n
                <field name="lng"/>\n
                <widget type="gmap_single_location"/>\n
            </field>\n
        </record>\n

        + Add this view to action and call menu \n

        <record id="sale.action_orders" model="ir.actions.act_window">\n
            <field name="name">Sales Orders</field>\n
            <field name="type">ir.actions.act_window</field>\n
            <field name="res_model">sale.order</field>\n
            <field name="view_type">form</field>\n
            <field name="view_mode">tree,form,calendar,graph,gmaps</field>\n
            <field name="search_view_id" ref="sale.view_sales_order_filter"/>\n
            <field name="context">{\n
                    'search_default_my_sale_orders_filter': 1\n
                }\n
            </field>\n
            <field name="domain">[('state', 'not in', ('draft', 'sent', 'cancel'))]</field>\n
            <field name="help" type="html">\n
                <p class="oe_view_nocontent_create">\n
                    Click to create a quotation that can be converted into a sales\n
                    order.\n
                </p><p>\n
                    Odoo will help you efficiently handle the complete sales flow:\n
                    quotation, sales order, delivery, invoicing and payment.\n
                </p>\n
            </field>\n
        </record>\n

    """,
    'version': '1.0',
    'author': 'thanhchatvn@gmail.com',
    'website': '',
    'category':'Odoo  widgets',
    'depends': ['web'],
    'data': [
        'views/web_gmaps_assets.xml'
        ],
 
    'qweb': [
        'static/src/xml/resource.xml'
        ],
    'auto_install': True,
}
