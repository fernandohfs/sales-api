class UserType {
    constructor() {
        const userTypes = [
            {id: 1, decription: 'Cliente'},
            {id: 2, decription: 'Operador'}
        ];

        this.userTypes = new Map();
        userTypes.map(type => this.userTypes.set(type.id, type));
    }

    get(key) {
        return this.userTypes.get(key);
    }
}

export default new UserType();