// Função de login
function login() {
  // Obtém os valores do formulário
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Referência ao elemento de mensagem de erro
  var errorMessageElement = document.getElementById('errorMessage');

  // Verifica se os campos estão preenchidos
  if (username.trim() === '' || password.trim() === '') {
    // Exibe a mensagem de erro
    errorMessageElement.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  // Limpa a mensagem de erro
  errorMessageElement.textContent = '';

  // Autentica o usuário no Firebase
  firebase.auth().signInWithEmailAndPassword(username, password)
    .then(function (userCredential) {
      // Verifica se o usuário está autenticado
      if (firebase.auth().currentUser) {
        // Autenticação bem-sucedida, redirecione para a próxima página
        window.location.href = "./page/Home.html";
      } else {
        // Se não estiver autenticado, exibe uma mensagem de erro
        errorMessageElement.textContent = "Usuário não autenticado";
      }
    })
    .catch(function (error) {
      // Trata os erros de autenticação aqui
      if (error.code === 'auth/wrong-password') {
        errorMessageElement.textContent = "Senha incorreta. Por favor, tente novamente.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessageElement.textContent = "Usuário não encontrado. Por favor, verifique seu usuário.";
      } else {
        errorMessageElement.textContent = "Erro de autenticação: " + error.message;
      }
    });
}