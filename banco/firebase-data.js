// Home - Cadastro dos alunos

// Espera o carregamento do documento HTML
document.addEventListener("DOMContentLoaded", function () {
    // Referência ao nó 'formulario' no banco de dados Firebase
    var formularioRef = firebase.database().ref('formulario');
  
    // Observador para eventos de valor no nó 'formulario'
    formularioRef.on('value', function (snapshot) {
      // Limpa a tabela antes de adicionar os novos dados
      var tableBody = document.querySelector('#example tbody');
      tableBody.innerHTML = "";
  
      // Itera sobre os dados do snapshot
      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        // Cria uma nova linha na tabela com os dados do Firebase
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
          <td>${data.nome}</td>
          <td>${data.ddd}</td>
          <td>${data.telefone}</td>
          <td>${data.cidade}</td>
          <td>${data.bairro}</td>
          <td>${data.curso}</td>
          <td>${data.ingresso}</td>
          <td>${data.semestre}</td>
          <td>${data.conheceu}</td>
          <td>${data.observacoes}</td>
          <td>${data.aceitarTermos ? 'Sim' : 'Não'}</td>
          <td>
            <button class="btn-edit">Editar</button>
            <button class="btn-save" style="display:none;">Salvar</button>
            <button class="btn-cancel mt-2" style="display:none;">Cancelar</button>
            <button class="btn-delete mt-2">Excluir</button>
          </td>
        `;
      });
    });
  });
  