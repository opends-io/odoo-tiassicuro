# -*- coding: utf-8 -*-
{
    'name': "website_wgo_tiassicuro",

    'summary': "Website theme for TiAssicuro SA",

    'description': """Website theme for TiAssicuro SA. Using the same brand signature as the company's  original website.""",

    'author': "Wisegar Development Group",
    'website': "https://www.odoo.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Theme',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'website'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}

