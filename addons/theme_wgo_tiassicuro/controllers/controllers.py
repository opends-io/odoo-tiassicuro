# -*- coding: utf-8 -*-
# from odoo import http


# class ThemeWgoTiassicuro(http.Controller):
#     @http.route('/theme_wgo_tiassicuro/theme_wgo_tiassicuro', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/theme_wgo_tiassicuro/theme_wgo_tiassicuro/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('theme_wgo_tiassicuro.listing', {
#             'root': '/theme_wgo_tiassicuro/theme_wgo_tiassicuro',
#             'objects': http.request.env['theme_wgo_tiassicuro.theme_wgo_tiassicuro'].search([]),
#         })

#     @http.route('/theme_wgo_tiassicuro/theme_wgo_tiassicuro/objects/<model("theme_wgo_tiassicuro.theme_wgo_tiassicuro"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('theme_wgo_tiassicuro.object', {
#             'object': obj
#         })

