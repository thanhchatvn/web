{
    'name': 'HHD Kanban Add Old Stage',
    'category': 'hhdgroup',
    'description': """
Kanban Add Old Stage
========================

""",
    'version': '1.0',
    'depends': ['project'],
    'data' : [
        'views/asset.xml',
    ],
    'qweb' : [
        'static/src/xml/*.xml',
    ],
    'auto_install': True
}
