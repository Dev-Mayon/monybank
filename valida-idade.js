export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    
    // Verifica se a data é válida
    if (isNaN(dataNascimento.getTime())) {
        campo.setCustomValidity('Data de nascimento inválida.');
    } else {
        // Verifica se a data de nascimento é no futuro
        const dataAtual = new Date();
        if (dataNascimento > dataAtual) {
            campo.setCustomValidity('Data de nascimento não pode ser no futuro.');
        } else if (!validaIdade(dataNascimento)) {
            campo.setCustomValidity('Você deve ser maior que 18 anos para se cadastrar.');
        } else {
            campo.setCustomValidity('');  // Limpa o erro se a idade for válida
        }
    }
}

function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    // Retorna verdadeiro se a idade for maior ou igual a 18
    return dataAtual >= dataMais18;
}
