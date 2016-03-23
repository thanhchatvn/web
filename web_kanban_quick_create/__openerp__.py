{
    'name': 'HHD Kanban Quick Add Task',
    'category': 'hhdgroup',
    'description': """
Kanban Quick Add Task
========================

""",
    'version': '1.0',
    'depends': ['hhd_project'],
    'data' : [
        'views/asset.xml',
        'views/project.xml',
    ],
    'qweb' : [
        'static/src/xml/*.xml',
    ],
    'auto_install': True
}
