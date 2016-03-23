{
    'name': 'OpenERP Menu Search',
    'version': '1.0',
    'category': 'hhdgroup',
    'sequence': 1,
    'summary': 'OpenERP Menu Search',
    'description': """Module to search menu in OpenERP""",
    'author': 'thanhchatvn@gmail.com',
    'website': 'http://www.thanhchatvn.com',
    'images': [],
    'depends': ['web'],
    'data': [
        'view/asset.xml',
        'view/ir_ui_menu_view.xml',
     ],
    'qweb': [
        'static/src/xml/*.xml'
     ],
    'installable': True,
    'auto_install': False,
    'application': True,
}
