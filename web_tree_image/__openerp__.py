# -*- coding: utf-8 -*-
{
    'name': 'HHD Show images in tree views',
    'version': '1.0',
    'author': 'OCA',
    'description': 'Show image Sale Order Line, version 8 author by OCA, upgrade by ERP TEAM HHDGROUP',
    'website': 'https://github.com/OCA/Web',
    'license': 'AGPL-3',
    'category': 'hhdgroup',
    'depends': [
        'web',
        'purchase',
        'sale',
    ],
    'qweb': [
        'static/src/xml/widget.xml',
    ],
    'data': [
        'view/assets.xml',
        'view/product.xml',
    ],
}
