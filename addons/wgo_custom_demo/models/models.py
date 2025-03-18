# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class wgo_custom_demo(models.Model):
#     _name = 'wgo_custom_demo.wgo_custom_demo'
#     _description = 'wgo_custom_demo.wgo_custom_demo'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

from odoo import models, fields, api

class Visit(models.Model):
    _name = 'wgo_custom_demo.visit'
    _description = 'wgo_custom_demo.visit'

    name = fields.Char(string="Name")
    customer = fields.Char(string="Customer")
    date = fields.Datetime(string="Datetime")
    type = fields.Selection([('T', 'Telephone'), ('E', 'Email'), ('W', 'Whatsap' )], string="Type", required=True)
    done = fields.Boolean(string="Done")