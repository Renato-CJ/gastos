// Usuários padrão
const defaultAdmin = { username: 'admin', password: 'admin123', admin: true };

// Carregar usuários do localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Adiciona o administrador ao localStorage, se não existir
if (!users.some(user => user.username === defaultAdmin.username)) {
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

// Lógica de Login
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
