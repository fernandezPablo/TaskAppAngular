export class User {
    _id: string;
    User: string;
    Password: string;

    constructor(user: string, password: string = '', id: string = ''){
        this._id = id;
        this.User = user;
        this.Password = password;
    }

}