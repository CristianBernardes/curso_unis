window.onload = function () {

    if (localStorage.getItem('token')) {

        window.location.href = "index.html";
    }

    if (!localStorage.getItem('users')) {

        window.localStorage.setItem('users', JSON.stringify([]));
    }
};

function checkLogin() {

    const email = document.getElementById('email');

    const password = document.getElementById('password');

    login(email.value, password.value)
}

function login(email, pass) {

    if (email === 'admin@admin.com' && pass === '123456') {

        window.localStorage.setItem('token', generateRandomString(150));

        window.localStorage.setItem('usuario_logado', email);

        window.location.href = "index.html";

    } else if (checkExistsUser(email, pass) === true) {

        window.localStorage.setItem('token', generateRandomString(150));

        window.localStorage.setItem('usuario_logado', email);

        window.location.href = "index.html";

    } else {

        alert('Email ou senha incorretos!');
    }
}

function generateRandomString(size) {

    let randomString = '';

    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < size; i++) {

        randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

    }

    return randomString;
}

function checkExistsUser(email, password) {

    let users = JSON.parse(localStorage.getItem('users'));

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.email === email && element.password === password) {
            return true;
        }
    }
}