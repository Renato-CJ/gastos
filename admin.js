// Carregar usuários e mensagens do localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Função para carregar mensagens
function loadAdminMessages() {
    const adminMessages = document.getElementById('adminMessages');
    adminMessages.innerHTML = '';
    if (messages.length > 0) {
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'border p-2 mb-2 bg-light';
            messageElement.innerHTML = `
                <p><strong>${msg.sender}</strong>: ${msg.text}</p>
                <small class="text-muted">Enviado em: ${msg.timestamp}</small>
                <button class="btn btn-sm btn-warning mt-2 me-2" onclick="editMessage(${index})">Editar</button>
                <button class="btn btn-sm btn-danger mt-2" onclick="deleteMessage(${index})">Excluir</button>
            `;
            adminMessages.appendChild(messageElement);
        });
    } else {
        adminMessages.innerHTML = '<p class="text-muted">Nenhum recado enviado.</p>';
    }
}

// Função para carregar usuários
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        userList.innerHTML += `
            <div class="border p-2 mb-2 bg-light">
                <p>${user.username} (${user.admin ? 'Admin' : 'Usuário'})</p>
                ${user.admin ? '' : `<button class="btn btn-sm btn-danger mt-2" onclick="deleteUser(${index})">Excluir</button>`}
            </div>`;
    });
}

// Registrar Usuário
document.getElementById('registerUserForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (users.some(user => user.username === username)) {
        alert('Usuário já existe!');
        return;
    }

    users.push({ username, password, admin: false });
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    loadUsers();
});

// Enviar Mensagem
document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const messageText = document.getElementById('messageText').value;
    messages.push({ sender: 'Admin', text: messageText, timestamp: new Date().toLocaleString() });
    localStorage.setItem('messages', JSON.stringify(messages));
    document.getElementById('messageText').value = '';
    loadAdminMessages();
});

// Excluir Mensagem
function deleteMessage(index) {
    messages.splice(index, 1);
    localStorage.setItem('messages', JSON.stringify(messages));
    loadAdminMessages();
}

// Editar Mensagem
function editMessage(index) {
    const newText = prompt('Edite a mensagem:', messages[index].text);
    if (newText) {
        messages[index].text = newText;
        messages[index].timestamp = new Date().toLocaleString();
        localStorage.setItem('messages', JSON.stringify(messages));
        loadAdminMessages();
    }
}

// Excluir Usuário
function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Logout
document.getElementById('logoutButton').addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Inicializar
loadAdminMessages();
loadUsers();
