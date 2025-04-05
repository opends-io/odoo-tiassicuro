/** @odoo-module **/
/* jshint esversion: 8 */

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.FormValidation = publicWidget.Widget.extend({
    selector: 'form.form_widget_container',
    events: {
        'submit': '_onSubmit',
    },

    start: function () {

        this.submitButton = $('button[type="submit"]');
        this.inputs = $('input, textarea, select');

        this.inputs.each((index, input) => {
            $(input).on("blur input change", this._handleInputChange.bind(this));
        });


        this._validateForm();
        this._toggleSubmitButton();

        return this._super.apply(this, arguments);
    },

    _onSubmit(event) {
        event.preventDefault();

    },

    _handleInputChange(event) {
        const input = event.target;
        $(input).addClass("touched");
        this._validateForm();
        this._toggleSubmitButton();
    },

    _validateForm() {
        let isValid = true;
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

        this.submitButton.prop("disabled", !isValid);
        this.submitButton.toggleClass("invalid-button", !isValid);

        return isValid;
    },

    _displayError(input, errorElement, message) {
        if (errorElement) {
            errorElement.style.display = "block";
            errorElement.textContent = message;
        }
        $(input).addClass("error-border");
        this._lastValid = false;
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