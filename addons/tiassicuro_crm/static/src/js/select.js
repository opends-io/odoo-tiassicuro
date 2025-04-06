/** @odoo-module **/
/* jshint esversion: 8 */
import publicWidget from "@web/legacy/js/public/public_widget";
import {loadCSS, loadJS} from "@web/core/assets";

publicWidget.registry.MySelect = publicWidget.Widget.extend({
    selector: 'select.select_widget_container',

    willStart: async function () {
        await this._super.apply(this, arguments);
        await Promise.all([
            loadCSS('https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css'),
            loadJS("https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.full.min.js"),
        ]);
    },

    start: function () {
        this.$el.select2({ width: '100%' });
    },

});

export default publicWidget.registry.MySelect;