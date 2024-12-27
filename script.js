document.addEventListener('DOMContentLoaded', function() {

    const enviarRecadoBtn = document.querySelector("#envio-recado-admin button");
    const textoRecadoAdmin = document.getElementById("texto-recado-admin");
    const emojiButtons = document.querySelectorAll(".emoji");
    const logoutBtn = document.getElementById("logout");

    // Adicionar emoji ao recado
    emojiButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            textoRecadoAdmin.value += btn.dataset.emoji;
        });
    });

    // Enviar recado
    enviarRecadoBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const recado = textoRecadoAdmin.value;
        const corTexto = document.getElementById("cor-texto").value;
        const formData = new FormData();
        formData.append('recado', recado);
        formData.append('cor', corTexto);

        fetch('backend/receber_recado.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
            if (data.success) {
                alert("Recado enviado com sucesso!");
                textoRecadoAdmin.value = ''; // Limpar campo
            } else {
                alert("Erro ao enviar recado");
            }
        });
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        fetch('backend/logout.php')
            .then(() => window.location.href = 'login.html');
    });

});
