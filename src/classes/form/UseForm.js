class UseForm {
    static FORM_CLASS = 'form';
    static FORM_ERROR_CLASS = 'form__error';
    static FORM_FIELD_CLASS = constants.FORM_FIELD_CLASS;
    static SUBMIT_BTN_CLASSES = 'btn btn-primary btn-submit';

    fields = [];
    onSubmitHandler;
    constructor(props) {
        const { fields, onSubmit, formContainer, submitBtnText = 'Save' } = props;
        this.onSubmitHandler = onSubmit;
        this.formContainerEl = formContainer;
        this.btnSubmitEl = null;
        this.invalidFields = [];
        this.submitBtnText = submitBtnText;

        fields.forEach(field => this.fields.push(new Text(field)));
    }

    render() {
        const formHtml = this.generateFormHtml();
        this.formContainerEl.insertAdjacentHTML('beforeend', formHtml);
        this.generateFields();
    }

    remove() {
        this.formContainerEl.innerHTML = '';
    }
    
    generateFields() {
        const formContainer = this.formContainerEl.querySelector('form');
        const formSubmitBtn = this.generateSubmitBtn();

        this.fields.forEach(field => {
            const fieldHtml = field.render();
            formContainer.insertAdjacentHTML('beforeend', fieldHtml);
        })

        formContainer.insertAdjacentHTML('beforeend', formSubmitBtn);
        this.btnSubmitEl = this.formContainerEl.querySelector('.btn-submit');

        this.getFormFieldElements().forEach(formField => {
            formField.addEventListener('input', this.onFieldInput.bind(this));
        })
        
        formContainer.addEventListener('submit', this.onFormElementSubmit.bind(this));

        return formContainer;
    }

    onFormElementSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [];
        this.invalidFields = [];

        formData.forEach((item, name) => {
            const formField = event.target.querySelector(`input[name=${name}]`);

            data.push({
                name,
                value: String(item),
                validationRule: formField.getAttribute('data-validation-rule'),
            })
        })

        const validator = new FormValidator(data);
        this.invalidFields = validator.validate();

        if(this.invalidFields.length) {
            this.invalidFields.forEach(field => {
                const invalidFormField = event.target.querySelector(`[data-name=${field.name}]`);
                this.renderFormFieldError(invalidFormField, field.errorMessage);
                this.disabledSubmitBtn();
            })

            return;
        }

        this.onSubmitHandler(data.reduce((acc, field) => ({...acc, [field.name]: field.value}), {}));
        event.target.reset();
    }

    onFieldInput(event) {
        const fieldErrorEl = event.target.nextElementSibling;
        const fieldName = event.target.getAttribute('name');

        if(fieldErrorEl) {
            fieldErrorEl.remove();
            this.invalidFields = this.invalidFields.filter(item => item.name !== fieldName);
        }

        if(!this.invalidFields.length) {
            this.enabledSubmitBtn();
        }
    }

    renderFormFieldError(fieldEl, message) {
        fieldEl.insertAdjacentHTML('beforeend', this.generateFieldErrorHtml(message));
    }

    getFormFieldElements() {
        return Array.from(this.formContainerEl.querySelectorAll(`.${UseForm.FORM_FIELD_CLASS}`));
    }

    generateFormHtml() {
        return `<form class="${UseForm.FORM_CLASS}"></form>`
    }

    generateSubmitBtn() {
        return `<button class="${UseForm.SUBMIT_BTN_CLASSES}" type="submit">${this.submitBtnText}</button>`
    }

    generateFieldErrorHtml(message) {
        return `<p class="${UseForm.FORM_ERROR_CLASS}">${message}</p>`
    }

    disabledSubmitBtn() {
        this.btnSubmitEl.setAttribute('disabled', 'disabled');
    }

    enabledSubmitBtn() {
        this.btnSubmitEl.removeAttribute('disabled');
    }
}
