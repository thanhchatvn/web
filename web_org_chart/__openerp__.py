{
    'name': 'HHD ORG Chart Department',
    'version': '1.0',
    'category': 'hhdgroup',
    'summary': 'Web ORG Chart Department',
    'author': 'hhdgroup',
    'website': 'http://hhdgroup.com',
    'depends': ['hr', 'web'],
    'data': [
        'view/web_orgchart.xml',
        'view/hr_department.xml',
     ],
    'qweb': [
        'static/src/xml/*.xml'
     ],
    'installable': True,
    'auto_install': False,
    'application': True,
}
