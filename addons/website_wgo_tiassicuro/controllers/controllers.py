# -*- coding: utf-8 -*-
# from odoo import http


# class WebsiteWgoTiassicuro(http.Controller):
#     @http.route('/website_wgo_tiassicuro/website_wgo_tiassicuro', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/website_wgo_tiassicuro/website_wgo_tiassicuro/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('website_wgo_tiassicuro.listing', {
#             'root': '/website_wgo_tiassicuro/website_wgo_tiassicuro',
#             'objects': http.request.env['website_wgo_tiassicuro.website_wgo_tiassicuro'].search([]),
#         })

#     @http.route('/website_wgo_tiassicuro/website_wgo_tiassicuro/objects/<model("website_wgo_tiassicuro.website_wgo_tiassicuro"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('website_wgo_tiassicuro.object', {
#             'object': obj
#         })

