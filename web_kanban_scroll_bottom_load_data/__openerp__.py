{
    'name': 'HHD Kanban Load Data On Scroll Bottom',
    'category': 'hhdgroup',
    'description': """
Kanban Load Data On Scroll Bottom
========================

""",
    'version': '1.0',
    'depends': ['web'],
    'data' : [
        'views/asset.xml',
    ],
    'qweb' : [
        'static/src/xml/*.xml',
    ],
    'auto_install': False,
    'appication' : True
}