from odoo import http

class GetRouteController(http.Controller):
    
    @http.route('/getroutes/', auth="public", type="json", methods=['POST'])
    def all_routes(self):
        # routes = http.request.env['mail.mail'].search_read([],['create_date', 'display_name', 'id', 'path'])
        # test controller api
        return "{ 'routes': ['/', '/home'] }" # routes

        