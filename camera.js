const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = ""; // Variável global para armazenar a imagem

botaoIniciarCamera.addEventListener("click", async function () {
    try {
        // Acessa a câmera do usuário
        const iniciarVideo = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        // Esconde o botão de iniciar câmera e mostra o campo da câmera
        botaoIniciarCamera.style.display = "none";
        campoCamera.style.display = "block";

        // Exibe o vídeo da câmera
        video.srcObject = iniciarVideo;
    } catch (error) {
        console.error("Erro ao acessar a câmera: ", error);
    }
});

botaoTirarFoto.addEventListener("click", function() {
    // Desenha a imagem do vídeo no canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Gera a URL da imagem em formato JPEG e armazena na variável global
    imagemURL = canvas.toDataURL("image/jpeg"); // Remover a declaração `const`

    // Esconde o campo da câmera e exibe a mensagem de confirmação
    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");

    // Verifica se há dados no local storage
    if (receberDadosExistentes) {
        const converteRetorno = JSON.parse(receberDadosExistentes);
        
        // Adiciona a imagem à estrutura de dados existente
        converteRetorno.imagem = imagemURL;

        // Salva os dados atualizados de volta ao local storage
        localStorage.setItem('cadastro', JSON.stringify(converteRetorno));
    }

    // Redireciona para a nova página
    window.location.href = "abrir-conta-form-3.html";
});

