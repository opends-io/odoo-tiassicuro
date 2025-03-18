# -*- coding: utf-8 -*-
# from odoo import http


# class WgoCustomDemo(http.Controller):
#     @http.route('/wgo_custom_demo/wgo_custom_demo', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/wgo_custom_demo/wgo_custom_demo/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('wgo_custom_demo.listing', {
#             'root': '/wgo_custom_demo/wgo_custom_demo',
#             'objects': http.request.env['wgo_custom_demo.wgo_custom_demo'].search([]),
#         })

#     @http.route('/wgo_custom_demo/wgo_custom_demo/objects/<model("wgo_custom_demo.wgo_custom_demo"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('wgo_custom_demo.object', {
#             'object': obj
#         })

