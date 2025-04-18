# -*- coding: utf-8 -*-
{
    "name": "Tiassicuro CRM",
    "description": "Customization for Tiassicuro CRM",
    "version": "1.0",
    "category": "Sales",
    "author": "Opends",
    "depends": ['crm', 'mail'],
    "installable": True,
    "application": False,
    'data': [
        'views/form.xml',
        'data/crm_mail_template.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'tiassicuro_crm/static/src/js/select.js',
            'tiassicuro_crm/static/src/js/form_validation.js',
            'tiassicuro_crm/static/src/css/form.css',
        ],
    },
}
