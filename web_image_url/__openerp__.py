{
    'name': 'HHD Render Image From URL Task',
    'category': 'hhdgroup',
    'version': '1.0',
    'summary': 'Render Image',
    'depend': ['sale'],
    'description':
        """
        Render Image From URL Task
        """,
    'data': [
        'image_url.xml',
        'security/ir.model.access.csv'
    ],
    'qweb': ['static/src/xml/*.xml'],
    'application': True,
}