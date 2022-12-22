class ContactList extends CRUD {
    list = [];

    constructor(props) {
        super(props);
    }

    async getAllContacts() {
        const allRawContacts = await this.get();
        this.list = allRawContacts.map((item) => new Contact(item));
        return this.list;
    }

    getContactById(contactId) {
        return this.list.find(contact => contact.id === contactId);
    }

    async createContact(firstName, lastName, phone) {
        const newContact = await this.create({firstName, lastName, phone});

        if (!newContact) {
            return this.list;
        }

        this.list.push(new Contact(newContact));
        return this.list;
    }

    async editContact(id, firstName, lastName, phone) {
        const editedContact = await this.update(id, {firstName, lastName, phone});

        if (!editedContact) {
            return this.list;
        }

        this.list = this.list.map(contact => {
            if (contact.id === id) {
                return new Contact(editedContact);
            }
            return contact;
        });
        return this.list;
    }

    async deleteContact(id) {
        await this.delete(id);

        return this.list.filter(contact => String(contact.id) !== id);
    }
}
