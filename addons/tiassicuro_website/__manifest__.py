# -*- coding: utf-8 -*-
{
    "name": "Tiassicuro Website",
    "description": "Customization for Tiassicuro Website",
    "version": "1.0",
    "category": "Website",
    "author": "Opends",
    "depends": ['website', 'theme_default'],
    "installable": True,
    "application": False,
    'data': [
        'views/landing_page.xml',
        'views/home.xml',
        'views/assicurazione.xml',
        'views/protezione_giuridica.xml',
        'views/cassa_malati.xml',
        'views/partners.xml',
        'views/note_legali.xml',
        'views/informazione_privacy.xml',
        'views/cookie_policy.xml',
        'views/terzo_pilastro.xml',
        'views/assicurazione_ticino.xml',
        'views/lavora_con.xml',
        'views/maxi_schermo.xml',
        'views/preventivo_assicurazione_ticino.xml',
        'data/website_data.xml',
        'views/header.xml',
        'views/footer.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'tiassicuro_website/static/src/js/select.js',
            'tiassicuro_website/static/src/css/home.css',
            'tiassicuro_website/static/src/css/assicurazione.css',
            'tiassicuro_website/static/src/css/cassa_malati.css',
            'tiassicuro_website/static/src/css/protezione_giuridica.css',
            'tiassicuro_website/static/src/css/partners.css',
            'tiassicuro_website/static/src/css/note_legali.css',
            'tiassicuro_website/static/src/css/informazione_privacy.css',
            'tiassicuro_website/static/src/css/cookie_policy.css',
            'tiassicuro_website/static/src/css/terzo_pilastro.css',
            'tiassicuro_website/static/src/css/assicurazione_ticino.css',
            'tiassicuro_website/static/src/css/lavora_con.css',
            'tiassicuro_website/static/src/css/maxi_schermo.css',
            'tiassicuro_website/static/src/components/**/*',
            'tiassicuro_website/static/src/css/preventivo_assicurazione_ticino.css',

        ],
    },
}
