# -*- coding: utf-8 -*-
import logging
from odoo import http, SUPERUSER_ID
from odoo.http import request
from odoo.exceptions import UserError

import base64

_logger = logging.getLogger(__name__)


class CrmController(http.Controller):

    def _send_email(self, model_id, template_ref):
        template = request.env['mail.template'].sudo().browse(request.env.ref(template_ref).id)
        if template:
            template.with_user(SUPERUSER_ID).send_mail(model_id, force_send=True)
        else:
            raise UserError("Mail Template not found. Please check the template.")

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
            'company_id': request.env['res.company'].sudo().search([]).id,
            'description': description,
            'stage_id': request.env['crm.stage'].sudo().search([('name', '=', 'New')]).id,
        })

        self._send_email(model_id=lead.id, template_ref='tiassicuro_crm.crm_mail_template')

        return {'success': True, 'message': f'Insertado correctamente: {lead.id}.'}

    @http.route('/tiassicuro_crm/work_us/send_email', type='json', auth='public', methods=['POST'])
    def work_us_send_email(self, **kwargs):

        name = kwargs.get('name')
        email = kwargs.get('email')
        phone = kwargs.get('phone')
        description = kwargs.get('description')
        curriculum = kwargs.get('curriculum')
        curriculum_filename = kwargs.get('curriculum_filename')

        if not (name and email and curriculum):
            return {'success': False, 'message': 'Faltan datos requeridos.'}

        partner = request.env['res.partner'].sudo().search([('email', '=', email)])

        if not partner:
            partner = request.env['res.partner'].sudo().create({
                'name': name,
                'email': email,
                'phone': phone,
                'parent_id': False,
                'is_company': False,
                'company_id': request.env['res.company'].sudo().search([]).id,
            })

        attachment_values = {
            'name': curriculum_filename,
            'description': description,
            'type': 'binary',
            'datas': curriculum,
            'mimetype': 'application/pdf',
        }

        attachment = request.env['ir.attachment'].sudo().create(attachment_values)

        mail_template = request.env['mail.template'].sudo().browse(
            request.env.ref('tiassicuro_crm.crm_mail_curriculum_template').id)

        mail_template.attachment_ids = [(6, 0, [attachment.id])]

        mail_template.with_user(SUPERUSER_ID).send_mail(partner.id, force_send=True)

        mail_template.attachment_ids = [(3, attachment.id)]

        return {'success': True, 'message': f'Enviado email: {mail_template.id}.'}
