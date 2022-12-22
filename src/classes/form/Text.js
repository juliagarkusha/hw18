class Text {
    static FORM_FIELD_CLASS = constants.FORM_FIELD_CLASS;
    static FORM_LABEL_CLASS = 'form__label';
    static FORM_CONTROL_CLASS = 'form__control';

    constructor(props) {
        const { type, name, label, placeholder, validationRule, defaultValue } = props;
        this.type = type;
        this.name = name;
        this.label = label;
        this.placeholder = placeholder;
        this.validationRule = validationRule;
        this.defaultValue = defaultValue;
    }

    render() {
        return this.generateHtml();
    }

    generateHtml() {
        return `
            <div class="${Text.FORM_FIELD_CLASS}"  data-name="${this.name}">
                <label for="${this.name}" class="${Text.FORM_LABEL_CLASS}">${this.label}</label>
                <input 
                    id="${this.name}" 
                    name="${this.name}" 
                    type="${this.type}" 
                    class="${Text.FORM_CONTROL_CLASS}"
                    placeholder="${this.placeholder}"
                    data-validation-rule="${this.validationRule}"
                    value="${!!this.defaultValue ? this.defaultValue : ''}"
                />
            </div>
        `
    }
}
