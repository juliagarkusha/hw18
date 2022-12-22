class Contact {
    static CONTACTS_ITEM_CLASS = constants.CONTACTS_ITEM_CLASS;
    static CONTACTS_EDIT_BTN_CLASSES = 'btn btn-primary';
    static CONTACTS_DELETE_BTN_CLASSES = 'btn btn-danger';

    constructor(props) {
        const { id, firstName, lastName, phone } = props;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    render(container) {
        const contactHtml = this.generateHTML();
        container.insertAdjacentHTML('beforeend', contactHtml);
    }

    generateHTML() {
        return `
            <article class="${Contact.CONTACTS_ITEM_CLASS}" data-id=${this.id}>
                <span>${this.id}</span>
                <span>${this.firstName}</span>
                <span>${this.lastName}</span>
                <span>${this.phone}</span>
                <div class="btn__container">
                    <button class="${Contact.CONTACTS_EDIT_BTN_CLASSES}" data-action="edit">Edit</button>
                    <button class="${Contact.CONTACTS_DELETE_BTN_CLASSES}" data-action="delete">Delete</button>
                </div>
            </article>
        `
    }
}