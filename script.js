const defaultAdmin = { username: 'admin', password: 'admin123', admin: true };
let users = JSON.parse(localStorage.getItem('users')) || [];
const messages = JSON.parse(localStorage.getItem('messages')) || [];

// Verifica se o admin padrão já foi registrado, se não, adiciona.
if (!users.some(user => user.username === defaultAdmin.username)) {
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Busca pelo usuário no localStorage
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('loginForm').classList.add('d-none');
        if (user.admin) {
            document.getElementById('adminMenu').classList.remove('d-none');
            loadMessagesForAdmin();
        } else {
            document.getElementById('userMenu').classList.remove('d-none');
            loadMessagesForUser();
        }
    } else {
        const feedback = document.getElementById('loginFeedback');
        feedback.textContent = 'Usuário ou senha inválidos!';
        feedback.classList.remove('d-none');
    }
});

// Função para exibir mensagens do admin
function loadMessagesForAdmin() {
    const adminMessages = document.getElementById('recados');
    adminMessages.innerHTML = '';
    if (messages.length > 0) {
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('mb-3', 'p-2', 'border', 'rounded');
            messageElement.innerHTML = `
                <strong>${msg.sender}</strong>: ${msg.text}<br>
                <small class="text-muted">Enviado em: ${msg.timestamp}</small>
                <button class="btn btn-sm btn-danger mt-2" onclick="deleteSpecificMessage(${index})">Excluir</button>
            `;
            adminMessages.appendChild(messageElement);
        });
    } else {
        adminMessages.innerHTML = '<p class="text-muted">Não há recados disponíveis.</p>';
    }
}

// Função para exibir apenas as mensagens para o usuário comum
function loadMessagesForUser() {
    const userMessages = document.getElementById('recados');
    userMessages.innerHTML = '';
    if (messages.length > 0) {
        messages.forEach((msg) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('mb-3', 'p-2', 'border', 'rounded');
            messageElement.innerHTML = `
                <strong>${msg.sender}</strong>: ${msg.text}<br>
                <small class="text-muted">Enviado em: ${msg.timestamp}</small>
            `;
            userMessages.appendChild(messageElement);
        });
    } else {
        userMessages.innerHTML = '<p class="text-muted">Não há recados disponíveis.</p>';
    }
}

// Função para excluir um recado específico (apenas para admin)
function deleteSpecificMessage(index) {
    if (confirm('Tem certeza de que deseja excluir este recado?')) {
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessagesForAdmin();
        alert('Recado excluído com sucesso!');
    }
}

// Função para verificar se o nome de usuário já existe ao registrar
document.getElementById('registerUser').addEventListener('click', function () {
    toggleVisibility('registrationForm');
});

// Registrar Usuário
document.getElementById('registerUserBtn').addEventListener('click', function () {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (username && password) {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert('Este nome de usuário já está registrado!');
            return;
        }

        users.push({ username, password, admin: false });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário registrado com sucesso!');
        toggleVisibility('');
    } else {
        alert('Preencha todos os campos!');
    }
});

// Exibir Formulário para Excluir Usuário
document.getElementById('deleteUser').addEventListener('click', function () {
    toggleVisibility('deleteUserForm');
});

// Excluir Usuário
document.getElementById('deleteUserButton').addEventListener('click', function () {
    const username = document.getElementById('deleteUsername').value;
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário excluído com sucesso!');
    toggleVisibility('');
});

// Enviar Recado
document.getElementById('sendMessage').addEventListener('click', function () {
    toggleVisibility('sendMessageForm');
});

// Enviar Recado
document.getElementById('sendMessageButton').addEventListener('click', function () {
    const text = document.getElementById('messageText').value;
    if (text) {
        const message = {
            sender: 'Administrador',
            text,
            timestamp: new Date().toLocaleString()
        };
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
        document.getElementById('messageText').value = '';
        alert('Recado enviado com sucesso!');
        loadMessagesForAdmin();
    } else {
        alert('O recado não pode estar vazio!');
    }
});

// Logout do Admin
document.getElementById('logoutButton').addEventListener('click', function () {
    document.getElementById('adminMenu').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
    localStorage.removeItem('loggedInUser');
});

// Logout do Usuário
document.getElementById('logoutUserButton').addEventListener('click', function () {
    document.getElementById('userMenu').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
    localStorage.removeItem('loggedInUser');
});

// Função de controle de visibilidade dos formulários
function toggleVisibility(id) {
    const forms = ['registrationForm', 'deleteUserForm', 'sendMessageForm', 'allMessages'];
    forms.forEach(formId => {
        document.getElementById(formId).classList.add('d-none');
    });
    if (id) {
        document.getElementById(id).classList.remove('d-none');
    }
}
