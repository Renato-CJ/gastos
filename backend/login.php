<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $query = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if ($usuario && password_verify($senha, $usuario['senha'])) {
        $_SESSION['user_id'] = $usuario['id'];
        $_SESSION['user_email'] = $usuario['email'];
        $_SESSION['user_tipo'] = $usuario['tipo'];

        // Redireciona dependendo do tipo de usuário
        if ($usuario['tipo'] === 'admin') {
            header('Location: admin.html');
        } else {
            header('Location: index.html');
        }
        exit();
    } else {
        die("E-mail ou senha inválidos.");
    }
}
?>

<!-- Formulário HTML de login -->
<form action="login.php" method="POST">
    <input type="email" name="email" placeholder="E-mail" required>
    <input type="password" name="senha" placeholder="Senha" required>
    <button type="submit">Login</button>
</form>
