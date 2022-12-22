class CRUD {
    constructor(apiUrl = 'https://62054479161670001741b708.mockapi.io/api/contacts') {
        this.apiUrl = apiUrl;
    }

    validateResponse(response) {
        if (response.status >= 400) {
            throw new Error('Network error');
        }
    }

    async get(id) {
       try {
           const response = await fetch(id ? `${this.apiUrl}/${id}`: this.apiUrl);
           this.validateResponse(response);
           return response.json();
       } catch(exception) {
           console.log('debug exception: ', exception);
           return [];
       }
    }

    async create(contact) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            this.validateResponse(response);
            return response.json();
        } catch (exception) {
            console.log('debug exception: ', exception);
        }
    }

    async update(id, contact) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(contact),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            this.validateResponse(response);
            return response.json();
        } catch (exception) {
            console.log('debug exception: ', exception);
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE',
            });
            this.validateResponse(response);
            return response.json();
        } catch (exception) {
            console.log('debug exception: ', exception);
        }
    }
}