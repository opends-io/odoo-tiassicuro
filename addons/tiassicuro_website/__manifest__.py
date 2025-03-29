# -*- coding: utf-8 -*-
{
    "name": "Tiassicuro Website",
    "description": "Customization for Tiassicuro Website",
    "version": "1.0",
    "category": "Website",
    "author": "Opends",
    "depends": ['website'],
    "installable": True,
    "application": False,
    'data': [
        'views/home.xml',
        'views/assicurazione.xml',
        'views/protezione_giuridica.xml',
        'data/website_data.xml',
        'views/website_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'tiassicuro_website/static/src/css/home.css',
            'tiassicuro_website/static/src/css/assicurazione.css',
            'tiassicuro_website/static/src/css/protezione_giuridica.css',
        ],
    },
}
