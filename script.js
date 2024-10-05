import ehUmCPF from "valida-cpf.js";
import ehMaiorDeIdade from "valida-idade.js";

const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let todosValidos = true;  // Variável para checar se todos os campos estão válidos

    camposDoFormulario.forEach(campo => {
        verificaCampo(campo); // Verifica cada campo antes de enviar
        if (!campo.checkValidity()) {
            todosValidos = false; // Se algum campo não for válido, marca como falso
        }
    });

    if (todosValidos) { // Apenas se todos os campos forem válidos
        const listaRespostas = {
            "nome": e.target.elements["nome"].value,
            "email": e.target.elements["email"].value,
            "rg": e.target.elements["rg"].value,
            "cpf": e.target.elements["cpf"].value,
            "aniversario": e.target.elements["aniversario"].value,
        };

        localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
        window.location.href = 'abrir-conta-form-2.html';
    }
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
};

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity(''); // Limpa erros personalizados

    // Verifica CPF
    if (campo.name === "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);  // Validação de CPF
    }

    // Verifica data de nascimento (idade)
    if (campo.name === "aniversario" && campo.value !== "") {
        ehMaiorDeIdade(campo);  // Validação de idade
    }

    // Verifica todos os tipos de erro para o campo atual
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];  // Atribui a mensagem correta
            console.log(mensagem);  // Exibe a mensagem de erro no console
        }
    });

    // Mostra a mensagem de erro no campo de mensagem-erro associado
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();  // Verifica se o input é válido

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;  // Exibe a mensagem de erro
    } else {
        mensagemErro.textContent = "";  // Limpa a mensagem se não houver erro
    }
}

