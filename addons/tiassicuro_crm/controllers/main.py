# -*- coding: utf-8 -*-
import logging
from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)


class CrmController(http.Controller):
    @http.route('/tiassicuro_crm/lead/quote', type='json', auth='public', methods=['POST'])
    def crm_lead_quote(self, **kwargs):

        name = kwargs.get('name')
        email = kwargs.get('email')
        phone = kwargs.get('phone')
        opportunity = kwargs.get('opportunity')
        description = kwargs.get('description')

        if not (name and email and opportunity and description):
            return {'success': False, 'message': 'Faltan datos requeridos.'}

        partner = request.env['res.partner'].sudo().search([('email', '=', email)])

        if not partner:
            partner = request.env['res.partner'].sudo().create({
                'name': name,
                'email': email,
                'phone': phone,
                'parent_id': False,
                'is_company': False,
            })

        lead = request.env['crm.lead'].sudo().create({
            'name': opportunity,
            'type': 'opportunity',
            'partner_id': partner.id,
            'email_from': email,
            'phone': phone,
            'description': description,
            'stage_id': request.env['crm.stage'].sudo().search([('name', '=', 'New')]).id,
        })

        return {'success': True, 'message': f'Insertado correctamente: {lead.id}.'}
