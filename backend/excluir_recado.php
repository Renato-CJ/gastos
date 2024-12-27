<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_tipo'] !== 'admin') {
    header('Location: login.html');
    exit();
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "DELETE FROM recados WHERE id = ?";
    $stmt = $pdo->prepare($query);
    if ($stmt->execute([$id])) {
        header('Location: admin.html');
        exit();
    } else {
        die("Erro ao excluir recado.");
    }
}
?>
