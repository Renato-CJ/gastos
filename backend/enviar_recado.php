<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_tipo'] !== 'admin') {
    header('Location: login.html');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recado = $_POST['recado'];
    $usuario_id = $_SESSION['user_id'];

    $query = "INSERT INTO recados (recado, usuario_id) VALUES (?, ?)";
    $stmt = $pdo->prepare($query);
    if ($stmt->execute([$recado, $usuario_id])) {
        header('Location: admin.html');
        exit();
    } else {
        die("Erro ao enviar o recado.");
    }
}
?>

<form action="enviar_recado.php" method="POST">
    <textarea name="recado" placeholder="Digite seu recado aqui..." required></textarea>
    <button type="submit">Enviar Recado</button>
</form>
