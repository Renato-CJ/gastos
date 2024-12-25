const defaultAdmin = { username: 'admin', password: 'admin123', admin: true };
let users = JSON.parse(localStorage.getItem('users')) || [];
const messages = JSON.parse(localStorage.getItem('messages')) || [];

// Adiciona o usuário admin se não estiver na lista de usuários
if (!users.some(user => user.username === defaultAdmin.username)) {
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

// Carrega as mensagens
function loadMessages() {
    const recados = document.getElementById('recados');
    recados.innerHTML = '';
    if (messages.length > 0) {
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('mb-3');
            messageElement.innerHTML = `<strong>${msg.sender}</strong>: ${msg.text}<br><small class="text-muted">Enviado em: ${msg.timestamp}</small>`;
            recados.appendChild(messageElement);
        });
    } else {
        recados.innerHTML = '<p class="text-muted">Não há recados disponíveis.</p>';
    }
}

// Função para login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Esconde o formulário de login
        document.getElementById('loginForm').classList.add('d-none');

        // Exibe a visão do usuário
        if (user.admin) {
            // Exibe menu administrativo
            document.getElementById('adminMenu').classList.remove('d-none');
        } else {
            // Exibe a visão do colaborador
            document.getElementById('userView').classList.remove('d-none');
            loadMessages();
        }
    } else {
        const feedback = document.getElementById('loginFeedback');
        feedback.textContent = 'Usuário ou senha inválidos!';
        feedback.classList.remove('d-none');
    }
});

// Logout para administrador
document.getElementById('logoutButton').addEventListener('click', function () {
    // Esconde o menu do administrador e volta ao login
    document.getElementById('adminMenu').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
});

// Logout para colaborador
document.getElementById('logoutUser').addEventListener('click', function () {
    // Esconde a visão do colaborador e volta ao login
    document.getElementById('userView').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
});
