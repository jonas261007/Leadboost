// Cadastro do aluno - form.html

function enviarParaFirebase() {
    var formulario = document.getElementById("meuForm");
    var dadosFormulario = obterValoresDoFormulario();

    // Verifica se todos os campos obrigatórios estão preenchidos e se o termo foi aceito
    if (camposPreenchidos(dadosFormulario) && dadosFormulario['aceitarTermos']) {
      // Envia os dados para o Firebase Realtime Database
      firebase.database().ref('formulario').push(dadosFormulario)
        .then(function () {
          alert("Formulário enviado com sucesso!");
          // Limpa o formulário após o envio bem-sucedido
          formulario.reset();
        })
        .catch(function (error) {
          console.error("Erro ao enviar formulário:", error.message);
          alert("Erro ao enviar formulário. Por favor, tente novamente.");
        });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios e aceite os termos.");
    }
  }

  // Função para verificar se todos os campos obrigatórios estão preenchidos
  function camposPreenchidos(dadosFormulario) {
    // Adicione verificação para cada campo obrigatório
    return (
      dadosFormulario['nome'] &&
      dadosFormulario['telefone'] &&
      dadosFormulario['cidade'] &&
      // Adicione mais campos conforme necessário
      true // Exemplo de retorno, ajuste conforme sua estrutura de dados
    );
  }

  // Ouvinte de evento para o envio do formulário de cadastro
  document.getElementById('meuForm').addEventListener('submit', function (event) {
    // Evita o envio padrão do formulário
    event.preventDefault();

    // Chama a função de envio para o Firebase
    enviarParaFirebase();
  });

  // Função auxiliar para obter todos os valores do formulário
  function obterValoresDoFormulario() {
    var formulario = document.getElementById("meuForm");
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

    // Adiciona o valor do checkbox separadamente, pois é um caso especial
    dadosFormulario['aceitarTermos'] = formulario['aceitar-termos'].checked;

    return dadosFormulario;
  }

  // Mantivemos as outras funções conforme fornecido
  function obterValorDoCampoPorId(campoId) {
    return document.getElementById(campoId).value;
  }

  function exibirMensagemDeErroAutenticacao(error) {
    var errorMessageElement = document.getElementById('errorMessage');
    switch (error.code) {
      case 'auth/wrong-password':
        errorMessageElement.textContent = "Senha incorreta. Por favor, tente novamente.";
        break;
      case 'auth/user-not-found':
        errorMessageElement.textContent = "Usuário não encontrado. Por favor, verifique seu usuário.";
        break;
      default:
        errorMessageElement.textContent = "Erro de autenticação: " + error.message;
    }
  }

  function apagarFormulario() {
    document.getElementById("meuForm").reset();
  }