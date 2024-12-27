<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_tipo'] !== 'admin') {
    header('Location: login.html');
    exit();
}

$query = "SELECT * FROM recados ORDER BY data_envio DESC";
$stmt = $pdo->prepare($query);
$stmt->execute();
$recados = $stmt->fetchAll();
?>

<div id="lista-recados-admin">
    <?php foreach ($recados as $recado): ?>
        <div class="recado">
            <p><?php echo htmlspecialchars($recado['recado']); ?></p>
            <p>Enviado em: <?php echo $recado['data_envio']; ?></p>
            <button onclick="excluirRecado(<?php echo $recado['id']; ?>)">Excluir</button>
        </div>
    <?php endforeach; ?>
</div>
