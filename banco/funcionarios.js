var toggleFormButton = document.getElementById("toggleFormButton");
var formContainer = document.getElementById("formContainer");
var cadastrarButton = document.getElementById("cadastrarButton");
var cancelarButton = document.getElementById("cancelarButton");
var apagarButton = document.getElementById("apagarButton");

toggleFormButton.addEventListener("click", function() {
    if (formContainer.style.display === "none") {
        formContainer.style.display = "block";
        // Rolar a página até o formulário
        window.scrollTo({ top: formContainer.offsetTop, behavior: 'smooth' });
    } else {
        formContainer.style.display = "none";
    }
});

cancelarButton.addEventListener("click", function() {
    formContainer.style.display = "none";
});

apagarButton.addEventListener("click", function() {
    // Adicione aqui a lógica para apagar o conteúdo do formulário
    // Por exemplo, limpar os campos de entrada
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    // Limpe os campos de entrada
    nomeInput.value = "";
    emailInput.value = "";
});

function enviarParaFirebase() {
    var formulario = document.querySelector("#meuForm");
    var dadosFormulario = obterValoresDoFormulario();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (camposPreenchidos(dadosFormulario)) {
        // Envia os dados para o Firebase Realtime Database
        firebase.database().ref('funcionarios').push(dadosFormulario)
            .then(function () {
                alert("Funcionário cadastrado com sucesso!");
                // Limpa o formulário após o envio bem-sucedido
                formulario.reset();
            })
            .catch(function (error) {
                console.error("Erro ao cadastrar funcionário:", error.message);
                alert("Erro ao cadastrar funcionário. Por favor, tente novamente.");
            });
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
}

function obterValoresDoFormulario() {
    var formulario = document.querySelector("#meuForm");
    var elementos = formulario.elements;
    var dadosFormulario = {};

    for (var i = 0; i < elementos.length; i++) {
        var elemento = elementos[i];

        // Verifica se o elemento tem um nome e não é o botão de submit
        if (elemento.name && elemento.type !== "submit") {
            // Modifica para obter o texto da opção selecionada em vez do valor
            if (elemento.tagName.toLowerCase() === 'select') {
                dadosFormulario[elemento.name] = elemento.options[elemento.selectedIndex].text;
            } else {
                // Adiciona o valor do elemento ao objeto
                dadosFormulario[elemento.name] = elemento.value;
            }
        }
    }

    return dadosFormulario;
}

function camposPreenchidos(dadosFormulario) {
    // Adicione verificação para cada campo obrigatório no novo formulário
    return (
        dadosFormulario['nome'] &&
        dadosFormulario['email'] &&
        dadosFormulario['cargo'] &&
        true
    );
}
