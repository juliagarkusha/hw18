'use strict'

const contactListContainer = document.querySelector(`.${constants.CONTACTS_CONTAINER_CLASS}`);
const contactFormContainer = document.querySelector(`.${constants.CONTACTS_FORM_CONTAINER_CLASS}`);
const addContactFormFields = [
    {
        type: 'text',
        name: 'firstName',
        label: 'Name',
        placeholder: 'Enter name',
        validationRule: 'required',
    },
    {
        type: 'text',
        name: 'lastName',
        label: 'Surname',
        placeholder: 'Enter surname',
        validationRule: 'required',
    },
    {
        type: 'text',
        name: 'phone',
        label: 'Phone',
        placeholder: 'Enter phone',
        validationRule: 'phone',
    }
]

const renderContacts = (contacts) => {
    contactListContainer.innerHTML = '';
    contacts.forEach(contact => contact.render(contactListContainer));
    contactListContainer.addEventListener('click', onContactListContainerClick);
}

const onCreateContact = (validData) => {
    const { firstName, lastName, phone } = validData;
    contactList
        .createContact(firstName, lastName, phone)
        .then(renderContacts);
}

const addContactForm = new UseForm({
    fields: addContactFormFields,
    onSubmit: onCreateContact,
    formContainer: contactFormContainer,
    submitBtnText: constants.CREATE_BTN_TEXT,
});

const contactList = new ContactList();

addContactForm.render();
contactList.getAllContacts().then(renderContacts);

const onEditContact = (id) => (validData) => {
    const { firstName, lastName, phone } = validData;

    contactList
        .editContact(id, firstName, lastName, phone)
        .then(renderContacts);

    contactFormContainer.innerHTML = '';
    addContactForm.render();
}

function onContactListContainerClick(event) {
    const contactEl = event.target.closest(`.${constants.CONTACTS_ITEM_CLASS}`);
    const contactId = contactEl.dataset.id;
    const action = event.target.dataset.action;
    
    if(action === 'edit') {
        const editedContact = contactList.getContactById(contactId);
        addContactForm.remove();

        const editContactForm = new UseForm({
            fields: addContactFormFields.map(field => ({...field, defaultValue: editedContact[field.name]})),
            onSubmit: onEditContact(contactId),
            formContainer: contactFormContainer,
            submitBtnText: constants.EDIT_BTN_TEXT,
        });

        editContactForm.render(contactListContainer);
    }
    
    if(action === 'delete') {
       contactList.deleteContact(contactId).then(renderContacts);
    }
}
