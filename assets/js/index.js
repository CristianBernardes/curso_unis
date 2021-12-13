let users = JSON.parse(localStorage.getItem('users'));

let tableUsers = document.getElementById('users');

window.onload = function () {
    init();
    getUsers();
    checkPermissions();
};

function init() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    }
}

function getUsers() {

    if (users.length > 0) {

        for (let index = 0; index < users.length; index++) {

            const element = users[index];

            storeUser(element.name, element.email, element.password, index);
        }
    }
}

function checkPermissions() {
    let user = window.localStorage.getItem('usuario_logado');

    if (user.indexOf('admin') === -1) {
        document.getElementById('register-user').remove();
        let deleteButtons = document.getElementsByClassName('btn-danger');

        for (let index = 0; index < deleteButtons.length; index++) {
            deleteButtons[index].setAttribute('onclick', `alert('Você não tem permissão para utilizar esta ação')`);
        }
    }
}

function setUser() {

    const name = document.getElementById('name-user');

    const email = document.getElementById('email-user');

    const password = document.getElementById('password-user');

    if (name.value === '' || email.value === '' || password.value === '') {

        alert('Necessário preencher todos os campos');

    } else if (typeof returnIndexArray(email) === 'undefined') {

        const user = {
            'name': name.value,
            'email': email.value,
            'password': password.value
        }

        users.push(user);

        window.localStorage.setItem('users', JSON.stringify(users));

        storeUser(user.name, user.email, user.password, users.length - 1);

        $('#modalUser').modal('hide');

        name.value = '';
        email.value = '';
        password.value = '';

    } else {

        alert('Usuário já cadastrado');

    }
}

function storeUser(name, email, password, index) {

    let row = tableUsers.insertRow(index);

    row.id = `user-${index}`;

    let nameUser = row.insertCell(0);

    let emailUser = row.insertCell(1);

    let passwordUser = row.insertCell(2);

    let buttonDelete = row.insertCell(3);

    nameUser.innerHTML = name;

    emailUser.innerHTML = email;

    passwordUser.innerHTML = password;

    buttonDelete.innerHTML = `<button type="button" onclick="deleteUser('${index}', '${email}')" class="btn btn-danger">Excluir</button>`;
}

function deleteUser(userId, email) {

    const indexUser = returnIndexArray(email);

    users.splice(indexUser, 1);

    document.getElementById(`user-${userId}`).remove();

    window.localStorage.setItem('users', JSON.stringify(users));
}

function logout() {

    window.localStorage.removeItem('token');

    window.location.href = 'login.html';
}

function filterTable() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('filter');
    filter = input.value.toUpperCase();
    table = document.getElementById('table-user');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

function returnIndexArray(email) {

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.email === email) {
            return index;
        }
    }
}