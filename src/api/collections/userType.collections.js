class UserType {
    constructor() {
        const userTypes = [
            {id: 1, description: 'Cliente'},
            {id: 2, description: 'Operador'}
        ];

        this.userTypes = new Map();
        userTypes.map(type => this.userTypes.set(type.id, type));
    }

    get(key) {
        return this.userTypes.get(key);
    }
}

export default new UserType();