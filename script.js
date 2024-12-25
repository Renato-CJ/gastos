// Funções de login e redirecionamento
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Salva o usuário logado no localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redireciona para a página apropriada
        if (user.admin) {
            window.location.href = "adminPage.html"; // Página do admin
        } else {
            window.location.href = "userPage.html";  // Página do usuário
        }
    } else {
        const feedback = document.getElementById('loginFeedback');
        feedback.textContent = 'Usuário ou senha inválidos!';
        feedback.classList.remove('d-none');
    }
});

// Função para carregar mensagens para o usuário comum
function loadUserMessages() {
    const userMessages = document.getElementById('userMessages');
    userMessages.innerHTML = ''; // Limpa as mensagens antigas

    // Carrega as mensagens enviadas pelo administrador
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    if (messages.length > 0) {
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `
                <p><strong>${msg.sender}</strong>: ${msg.text}</p>
                <small class="text-muted">Enviado em: ${msg.timestamp}</small>
            `;
            userMessages.appendChild(messageElement);
        });
    } else {
        userMessages.innerHTML = '<p class="text-muted">Não há recados disponíveis.</p>';
    }
}

// Função para inicializar a página do usuário
function initUserPage() {
    // Verificar se o usuário está logado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = "loginPage.html"; // Redireciona para o login se não estiver logado
    } else {
        // Carregar as mensagens
        loadUserMessages();
    }
}

// Função para sair (logout)
document.getElementById('logoutButton').addEventListener('click', function () {
    // Limpa o localStorage e redireciona para o login
    localStorage.removeItem('loggedInUser');
    window.location.href = "loginPage.html"; // Redireciona para a página de login
});

// Função de inicialização da página de admin
function initAdminPage() {
    // Verificar se o usuário é admin
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || !loggedInUser.admin) {
        window.location.href = "loginPage.html"; // Redireciona para o login se não for admin
    } else {
        // Carregar as mensagens e usuários
        loadAdminMessages();
        loadUsers();
    }
}

// Inicializar as páginas após o carregamento
window.addEventListener('load', function () {
    // Verifica a página atual e inicializa o conteúdo
    if (window.location.href.includes('userPage.html')) {
        initUserPage(); // Para a página do usuário comum
    } else if (window.location.href.includes('adminPage.html')) {
        initAdminPage(); // Para a página do administrador
    }
});
