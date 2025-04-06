/** @odoo-module **/
/* jshint esversion: 8 */
import {rpc} from "@web/core/network/rpc";
import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.FormValidation = publicWidget.Widget.extend({
    selector: 'form.form_widget_container',
    events: {
        'submit': '_onSubmit',
    },

    start: function () {

        this.submitButton = $('button[type="submit"]');
        this.inputs = $('input, textarea, select');
        this.isValid = true;

        this.inputs.each((index, input) => {
            $(input).on("blur input change", this._handleInputChange.bind(this));
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
        $(input).addClass("touched");
        this._validateForm();
        this._toggleSubmitButton();
    },

    _validateForm() {

        const inputs = this.inputs;

        inputs.each((index, input) => {
            const errorId = $(input).data("error");
            const errorMessage = document.getElementById(errorId);

            if (errorMessage) {
                errorMessage.style.display = "none";
                errorMessage.textContent = "";
            }

            $(input).removeClass("error-border");

            if ($(input).hasClass("touched")) {
                if ($(input).is("[required]") && !$(input).val().trim()) {
                    this._displayError(input, errorMessage, "Campo obbligatorio");
                } else {
                    switch ($(input).attr("type")) {
                        case "checkbox":
                            if ($(input).is("[required]") && !$(input).is(":checked")) {
                                this._displayError(input, errorMessage, "Campo obbligatorio");
                            }
                            break;
                        case "email":
                            if (!this._validateEmail($(input).val())) {
                                this._displayError(input, errorMessage, "Email inserito non valido");
                            }
                            break;
                        case "file":
                            if ($(input)[0].files.length === 0) {
                                this._displayError(input, errorMessage, "Campo obbligatorio");
                            }
                            break;
                        case "text":
                            if (!this._validateText($(input).val())) {
                                this._displayError(input, errorMessage, "Inserire solo testo");
                            } else {
                                this._checkLengthConstraints(input, errorMessage);
                            }
                            break;
                        case "number":
                            if (!this._validateNumber($(input).val())) {
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
        $(input).addClass("error-border");
        this.isValid = false;
    },

    _checkLengthConstraints(input, errorElement) {
        const maxLength = $(input).attr("maxlength") || $(input).attr("max");
        const minLength = $(input).attr("minlength") || $(input).attr("min");
        const valueLength = $(input).val().length;

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
        const allFieldsValid = Array.from($("input, textarea, select")).every((input) => input.checkValidity());
        this.submitButton.prop("disabled", !allFieldsValid);
        this.submitButton.toggleClass("invalid-button", !allFieldsValid);
    }
});

export default publicWidget.registry.FormValidation;