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
            loadAdminMessages();
        } else {
            document.getElementById('userView').classList.remove('d-none');
            loadMessages();
        }
    } else {
        const feedback = document.getElementById('loginFeedback');
        feedback.textContent = 'Usuário ou senha inválidos!';
        feedback.classList.remove('d-none');
    }
});

// Função para exibir mensagens do admin
function loadAdminMessages() {
    const adminMessages = document.getElementById('adminMessages');
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

// Função para excluir um recado específico
function deleteSpecificMessage(index) {
    if (confirm('Tem certeza de que deseja excluir este recado?')) {
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadAdminMessages();
        loadMessages();
        alert('Recado excluído com sucesso!');
    }
}

// Função para verificar se o nome de usuário já existe ao registrar
document.getElementById('registerUser').addEventListener('click', function () {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    // Verifica se os campos estão preenchidos
    if (username && password) {
        // Verifica se o nome de usuário já existe
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert('Este nome de usuário já está registrado!');
            return;
        }

        // Registra o novo usuário
        users.push({ username, password, admin: false });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário registrado com sucesso!');
        toggleVisibility('');
    } else {
        alert('Preencha todos os campos!');
    }
});

// Logout do admin
document.getElementById('logoutButton').addEventListener('click', function () {
    document.getElementById('adminMenu').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
    localStorage.removeItem('loggedInUser');
});

// Logout do usuário
document.getElementById('logoutUser').addEventListener('click', function () {
    document.getElementById('userView').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
    localStorage.removeItem('loggedInUser');
});

// Exibição do formulário de registrar usuário
document.getElementById('showRegistration').addEventListener('click', function () {
    toggleVisibility('registrationForm');
});

// Exibição do formulário de deletar usuário
document.getElementById('showDeleteUser').addEventListener('click', function () {
    toggleVisibility('deleteUserForm');
});

// Deletar usuário
document.getElementById('deleteUserButton').addEventListener('click', function () {
    const username = document.getElementById('deleteUsername').value;
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário excluído com sucesso!');
    toggleVisibility('');
});

// Exibir o formulário para enviar um recado
document.getElementById('showMessages').addEventListener('click', function () {
    toggleVisibility('sendMessageForm');
});

// Enviar recado
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
        loadAdminMessages();
        loadMessages();
    } else {
        alert('O recado não pode estar vazio!');
    }
});

// Exibir todas as mensagens para o admin
document.getElementById('showAllMessages').addEventListener('click', function () {
    toggleVisibility('allMessages');
    loadAdminMessages();
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

// Função para carregar as mensagens para o usuário
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

// Verificar status
document.getElementById('showStatus').addEventListener('click', function () {
    const status = document.getElementById('status');
    status.textContent = `Usuário logado: ${localStorage.getItem('loggedInUser') || 'Nenhum'}`;
    toggleVisibility('statusForm');
});
