export class UserExterno {
    constructor(
        public id: string,
        public name: string,
        public username: string,
        public email: string,
        public address: {
            street: string,
            suite: string,
            city: string,
            zipcode: string,
        },
        public phone: string,
        public website: string,
        public company: string,
    ) { }
}
