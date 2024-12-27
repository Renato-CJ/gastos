<?php
$host = "ghostly-effectual-hammerhead.data-1.use1.tembo.io"; // ou seu host
$db = "recados_qualidade";
$user = "root"; // ou seu usuário MySQL
$password = ""; // ou sua senha MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar: " . $e->getMessage());
}
?>
