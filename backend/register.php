<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // Senha criptografada
    $confirm_senha = $_POST['confirm_senha'];

    if ($senha !== $confirm_senha) {
        die("As senhas não coincidem.");
    }

    $query = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
    $stmt = $pdo->prepare($query);
    if ($stmt->execute([$email, $senha])) {
        header('Location: login.html'); // Redireciona para a página de login
        exit();
    } else {
        die("Erro ao cadastrar usuário.");
    }
}
?>

<!-- Formulário HTML (deve ser colocado no mesmo arquivo ou em um HTML separado) -->
<form action="register.php" method="POST">
    <input type="email" name="email" placeholder="E-mail" required>
    <input type="password" name="senha" placeholder="Senha" required>
    <input type="password" name="confirm_senha" placeholder="Confirmar Senha" required>
    <button type="submit">Registrar</button>
</form>
