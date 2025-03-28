# -*- coding: utf-8 -*-
{
    'name': "Theme TiAssicuro Website",
    'summary': "Theme for the TiAssicuro SA Enterprise Website",
    'description': "Theme for the TiAssicuro SA Enterprise Website",
    'author': "Wisegar Development Group",
    'website': "https://wisegar.org",
    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Theme',
    'sequence': 10,
    'version': '1.0',
    # any module necessary for this one to work correctly
    'depends': ['website'],
    # only loaded in demonstration mode
    'demo': [],
    'data': [
      'views/header.xml',
      'views/footer.xml',
      'views/menus.xml',
      
      'views/pages/home_page.xml',
      'views/pages/assicurazioni_auto_page.xml',
      'views/pages/services_page.xml',
      'views/pages/maxi_schermo_page.xml',
      'views/pages/protezione_giuridica_page.xml',
      
      'views/snippets/intro_snippet.xml',
      'views/snippets/snippets.xml',
    ],
    'images': [],
    'assets': {
      'web.assets_frontend': [
        'theme_wgo_tiassicuro/static/scss/styles.scss'
    ],
    'web._assets_primary_variables': [
      "theme_wgo_tiassicuro/static/scss/primary_variables.scss"
    ]
  }
}

