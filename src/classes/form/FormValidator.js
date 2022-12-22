const formValidationRules = {
    required: {
        rule: /\w{1,}/,
        errorMessage: 'Wrong text value',
    },
    phone: {
        rule: /[0-9]{2}$/,
        errorMessage: 'Wrong phone number format',
    },
}

class FormValidator {
    constructor(formData) {
        this.formData = formData;
    }

    validate() {
        return this.formData
                .filter(formDataItem => !formValidationRules[formDataItem.validationRule].rule.test(String(formDataItem.value)))
                .map(invalidFormField => ({
                    name: invalidFormField.name,
                    errorMessage: formValidationRules[invalidFormField.validationRule].errorMessage,
                }));
    }
}