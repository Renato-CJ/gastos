// Usuário administrador padrão
const defaultAdmin = { username: 'admin', password: 'admin123', admin: true };

// Carrega usuários e mensagens do localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Adiciona o administrador ao localStorage, se não existir
if (!users.some(user => user.username === defaultAdmin.username)) {
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para carregar mensagens no menu do administrador
function loadAdminMessages() {
    const adminMessages = document.getElementById('adminMessages');
    adminMessages.innerHTML = '';
    if (messages.length > 0) {
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `
                <p><strong>${msg.sender}</strong>: ${msg.text}</p>
                <small class="text-muted">Enviado em: ${msg.timestamp}</small>
                <button class="btn btn-sm btn-warning mt-2 me-2" onclick="editMessage(${index})">Editar</button>
                <button class="btn btn-sm btn-danger mt-2" onclick="deleteMessage(${index})">Excluir</button>
            `;
            adminMessages.appendChild(messageElement);
        });
    } else {
        adminMessages.innerHTML = '<p class="text-muted">Não há recados disponíveis.</p>';
    }
}

// Função para carregar a lista de usuários
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <p>${user.username} (${user.admin ? 'Admin' : 'Usuário'})</p>
            <button class="btn btn-sm btn-danger mt-2" onclick="deleteUser(${index})">Excluir</button>
        `;
        userList.appendChild(userElement);
    });
}

// Função para enviar um recado
document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const messageText = document.getElementById('messageText').value;
    const newMessage = {
        sender: 'Admin',
        text: messageText,
        timestamp: new Date().toLocaleString()
    };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages)); // Atualiza apenas mensagens
    document.getElementById('messageText').value = '';
    loadAdminMessages();
});

// Função para registrar um novo usuário
document.getElementById('registerUserForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (users.some(user => user.username === username)) {
        alert('Usuário já existe!');
        return;
    }

    const newUser = { username, password, admin: false };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Atualiza apenas usuários
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    loadUsers();
});

// Função para excluir um usuário
function deleteUser(index) {
    if (users[index].username === 'admin') {
        alert('Não é possível excluir o administrador padrão.');
        return;
    }

    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users)); // Atualiza apenas usuários
    loadUsers();
}

// Função para excluir uma mensagem
function deleteMessage(index) {
    messages.splice(index, 1);
    localStorage.setItem('messages', JSON.stringify(messages)); // Atualiza apenas mensagens
    loadAdminMessages();
}

// Função para editar uma mensagem
function editMessage(index) {
    const newText = prompt('Edite o recado:', messages[index].text);
    if (newText !== null) {
        messages[index].text = newText;
        messages[index].timestamp = new Date().toLocaleString();
        localStorage.setItem('messages', JSON.stringify(messages)); // Atualiza apenas mensagens
        loadAdminMessages();
    }
}

// Inicializa o menu do administrador
function initAdminMenu() {
    loadAdminMessages();
    loadUsers();
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
            initAdminMenu();
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

// Funções de logout
document.getElementById('logoutButton').addEventListener('click', function () {
    document.getElementById('adminMenu').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
});

document.getElementById('logoutUser').addEventListener('click', function () {
    document.getElementById('userView').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
});
