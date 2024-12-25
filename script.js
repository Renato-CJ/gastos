const defaultAdmin = { username: 'admin', password: 'admin123', admin: true };

let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

if (!users.some(user => user.username === defaultAdmin.username)) {
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.admin) {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
    } else {
        const feedback = document.getElementById('loginFeedback');
        feedback.textContent = 'Usuário ou senha inválidos!';
        feedback.classList.remove('d-none');
    }
});




// Função de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Log de depuração para ver o que está sendo enviado no login
    console.log('Tentativa de Login:', username, password);

    // Verifica se o usuário existe
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Log de depuração para verificar o usuário encontrado
        console.log('Usuário encontrado:', user);

        document.getElementById('loginForm').classList.add('d-none');
        if (user.admin) {
            // Redireciona para o painel de administrador
            window.location.href = 'admin.html'; 
        } else {
            // Redireciona para a visão do usuário comum
            window.location.href = 'user.html'; 
        }
    } else {
        // Log de depuração caso o usuário ou senha sejam inválidos
        console.log('Usuário ou senha inválidos.');
        const feedback = document.getElementById('loginFeedback');
        feedback.textContent = 'Usuário ou senha inválidos!';
        feedback.classList.remove('d-none');
    }
});
