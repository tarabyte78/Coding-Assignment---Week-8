class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    describe() {
        return `Username: ${this.username}, Password: ${this.password}`;
    }
}

class Users {
    constructor() {
        this.logins = [];
    }

    addLogin(login) {
        if (login instanceof Login) {
            this.logins.push(login);
        } else {
            throw new Error(`Invalid login object: ${login}`);
        }
    }

    describe() {
        return this.logins.map(login => login.describe()).join('\n');
    }

    deleteLogin(username) {
        this.logins = this.logins.filter(login => login.username !== username);
    }
}

class Menu {
    constructor() {
        this.users = new Users();
    }

    showMainMenu() {
        return prompt(`Menu:
        1. Create Login
        2. View Logins
        3. Delete Login
        4. Exit`);
    }

    start() {
        let selection = this.showMainMenu();
        while (selection !== '4') {
            switch(selection) {
                case '1':
                    this.createLogin();
                    break;
                case '2':
                    this.viewLogins();
                    break;
                case '3':
                    this.deleteLogin();
                    break;
                default:
                    alert('Invalid option. Please try again.');
            }
            selection = this.showMainMenu();
        }
        alert('Goodbye!');
    }

    createLogin() {
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');
        const login = new Login(username, password);
        this.users.addLogin(login);
        alert('Login created successfully!');
    }

    viewLogins() {
        const loginsInfo = this.users.describe();
        alert(loginsInfo);
    }

    deleteLogin() {
        const username = prompt('Enter username to delete:');
        try {
            this.users.deleteLogin(username);
            alert(`Login for '${username}' deleted successfully!`);
        } catch (error) {
            alert(error.message);
        }
    }
}

const menu = new Menu();
menu.start();
