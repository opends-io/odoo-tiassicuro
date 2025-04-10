/** @odoo-module **/
/* jshint esversion: 10 */
/* jshint strict:false */

import {rpc} from "@web/core/network/rpc";

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.FormValidation = publicWidget.Widget.extend({
    selector: 'form.form_widget_container',
    events: {
        'submit': '_onSubmit',
    },

    start: function () {

        this.submitButton = this.$('button[type="submit"]');
        this.inputs = this.$('input, textarea, select');
        this.isValid = true;

        this.inputs.each((index, input) => {
            this.$(input).on("blur input change", this._handleInputChange.bind(this));
        });

        this._validateForm();
        this._toggleSubmitButton();

        return this._super.apply(this, arguments);
    },

    async _onSubmit(event) {
        event.preventDefault();

        const name = this.$('input[name="yourName"]').val();
        const email = this.$('input[name="yourEmail"]').val();
        const phone = this.$('input[name="yourTelefono"]').val();
        const opportunity = this.$('select[name="optionName"]').val();
        const description = this.$('textarea[name="yourMessage"]').val();


        try {
            const response = await rpc("/tiassicuro_crm/lead/quote", {
                name: name,
                email: email,
                phone: phone,
                opportunity: opportunity,
                description: description,
            });


        } catch {
            console.warn("Error while saving data");
        }

    },

    _handleInputChange(event) {
        const input = event.target;
        this.$(input).addClass("touched");
        this._validateForm();
        this._toggleSubmitButton();
    },

    _validateForm() {

        const inputs = this.inputs;

        inputs.each((index, input) => {
            const errorId = this.$(input).data("error");
            const errorMessage = document.getElementById(errorId);

            if (errorMessage) {
                errorMessage.style.display = "none";
                errorMessage.textContent = "";
            }

            this.$(input).removeClass("error-border");

            if (this.$(input).hasClass("touched")) {
                if (this.$(input).is("[required]") && !this.$(input).val().trim()) {
                    this._displayError(input, errorMessage, "Campo obbligatorio");
                } else {
                    switch (this.$(input).attr("type")) {
                        case "checkbox":
                            if (this.$(input).is("[required]") && !this.$(input).is(":checked")) {
                                this._displayError(input, errorMessage, "Campo obbligatorio");
                            }
                            break;
                        case "email":
                            if (!this._validateEmail(this.$(input).val())) {
                                this._displayError(input, errorMessage, "Email inserito non valido");
                            }
                            break;
                        case "file":
                            if (this.$(input)[0].files.length === 0) {
                                this._displayError(input, errorMessage, "Campo obbligatorio");
                            }
                            break;
                        case "text":
                            if (!this._validateText(this.$(input).val())) {
                                this._displayError(input, errorMessage, "Inserire solo testo");
                            } else {
                                this._checkLengthConstraints(input, errorMessage);
                            }
                            break;
                        case "number":
                            if (!this._validateNumber(this.$(input).val())) {
                                this._displayError(input, errorMessage, "Inserire solo numeri");
                            } else {
                                this._checkLengthConstraints(input, errorMessage);
                            }
                            break;
                        default:
                            this._checkLengthConstraints(input, errorMessage);
                    }
                }
            }
        });

        this.submitButton.prop("disabled", !this.isValid);
        this.submitButton.toggleClass("invalid-button", !this.isValid);

        return this.isValid;
    },

    _displayError(input, errorElement, message) {
        if (errorElement) {
            errorElement.style.display = "block";
            errorElement.textContent = message;
        }
        this.$(input).addClass("error-border");
        this.isValid = false;
    },

    _checkLengthConstraints(input, errorElement) {
        const maxLength = this.$(input).attr("maxlength") || this.$(input).attr("max");
        const minLength = this.$(input).attr("minlength") || this.$(input).attr("min");
        const valueLength = this.$(input).val().length;

        if (maxLength && valueLength > Number(maxLength)) {
            this._displayError(input, errorElement, `Lunghezza massima ${maxLength}`);
        } else if (minLength && valueLength < Number(minLength)) {
            this._displayError(input, errorElement, `Lunghezza minima ${minLength}`);
        }
    },

    _validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    },

    _validateText(value) {
        const re = /^[A-Za-z\s]+$/;
        return re.test(value);
    },

    _validateNumber(value) {
        const re = /^\d+$/;
        return re.test(value);
    },

    _toggleSubmitButton() {
        const allFieldsValid = Array.from(this.$("input, textarea, select")).every((input) => input.checkValidity());
        this.submitButton.prop("disabled", !allFieldsValid);
        this.submitButton.toggleClass("invalid-button", !allFieldsValid);
    }
});

export default publicWidget.registry.FormValidation;


export const FormValidation1 = publicWidget.registry.FormValidation.extend({
    selector: 'form.form_widget_container1',
    events: Object.assign({}, publicWidget.registry.FormValidation.prototype.events, {
        'change input[name="curriculum"]': 'attachment_input',
    }),

    init: function () {
        this._super.apply(this, arguments);
        this.curriculum = null;
    },

    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    attachment_input: function (e) {
        this.curriculum = e.target.files[0];
    },

    async _onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        data.curriculum = await this.fileToBase64(this.curriculum);
        data.curriculum_filename = this.curriculum.name;

        try {
            const response = await rpc("/tiassicuro_crm/work_us/send_email", data);
        } catch {
            console.warn("Error while saving data");
        }

    },
});


publicWidget.registry.FormValidation1 = FormValidation1;