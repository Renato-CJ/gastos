// Dados do Admin
const defaultAdmin = { username: 'admin', password: 'admin123', admin: true };
let users = JSON.parse(localStorage.getItem('users')) || [];
const messages = JSON.parse(localStorage.getItem('messages')) || [];

// Salvar admin se não existir
if (!users.some(user => user.username === defaultAdmin.username)) {
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
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

// Logout Admin e Usuário
document.getElementById('logoutUser').addEventListener('click', function () {
    document.getElementById('userView').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
});

// Exibição dos formulários
document.getElementById('showRegistration').addEventListener('click', function () {
    toggleVisibility('registrationForm');
});

document.getElementById('registerUser').addEventListener('click', function () {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    if (username && password) {
        users.push({ username, password, admin: false });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário registrado com sucesso!');
        toggleVisibility('');
    } else {
        alert('Preencha todos os campos!');
    }
});

document.getElementById('deleteUser').addEventListener('click', function () {
    toggleVisibility('deleteUserForm');
});

document.getElementById('deleteUserButton').addEventListener('click', function () {
    const username = document.getElementById('deleteUsername').value;
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário excluído com sucesso!');
    toggleVisibility('');
});

document.getElementById('showMessages').addEventListener('click', function () {
    toggleVisibility('sendMessageForm');
});

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

document.getElementById('showAllMessages').addEventListener('click', function () {
    toggleVisibility('allMessages');
});

document.getElementById('backFromAllMessages').addEventListener('click', function () {
    toggleVisibility('');
});

document.getElementById('deleteMessage').addEventListener('click', function () {
    if (messages.length > 0) {
        messages.pop();
        localStorage.setItem('messages', JSON.stringify(messages));
        alert('Último recado excluído com sucesso!');
        loadAdminMessages();
        loadMessages();
    } else {
        alert('Não há recados para excluir!');
    }
});

// Voltar dos formulários
document.getElementById('backFromRegistration').addEventListener('click', function () {
    toggleVisibility('');
});

document.getElementById('backFromDelete').addEventListener('click', function () {
    toggleVisibility('');
});

document.getElementById('backFromSendMessage').addEventListener('click', function () {
    toggleVisibility('');
});

// Carregar Recados Administrativos
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

function deleteSpecificMessage(index) {
    if (confirm('Tem certeza de que deseja excluir este recado?')) {
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadAdminMessages();
        loadMessages();
        alert('Recado excluído com sucesso!');
    }
}

// Carregar recados para o usuário
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

// Função de alternância de visibilidade
function toggleVisibility(id) {
    const forms = ['registrationForm', 'deleteUserForm', 'sendMessageForm', 'allMessages'];
    forms.forEach(formId => {
        document.getElementById(formId).classList.add('d-none');
    });
    if (id) {
        document.getElementById(id).classList.remove('d-none');
    }
}
