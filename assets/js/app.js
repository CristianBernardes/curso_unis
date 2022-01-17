window.onload = function () {
    console.log('Olá Mundo');
}

function getUserGitHub() {
    let user = document.getElementById('search').value;

    fetch(`https://api.github.com/users/${user}`)
        .then(function (response) {
            response.json().then(function (data) {
                if (!data.message) {

                    document.getElementById('avatar').src = data.avatar_url;
                    document.getElementById('name').innerHTML = data.name;
                    document.getElementById('location').innerHTML = data.location;
                    document.getElementById('bio').innerHTML = data.bio;
                    document.getElementById('public-repos').innerHTML = data.public_repos;
                    document.getElementById('public-gists').innerHTML = data.public_gists;
                    document.getElementById('followers').innerHTML = data.followers;
                    document.getElementById('following').innerHTML = data.following;
                } else {
                    alert('Usuário Não foi Encontrado.');
                }
            });
        })
        .catch(function (erro) {
            console.log('Ops! Alguma coisa, deu errado', erro);
        })
}