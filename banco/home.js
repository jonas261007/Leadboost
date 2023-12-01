document.addEventListener("DOMContentLoaded", function () {
  var formularioRef = firebase.database().ref('formulario');
  var tableBody = document.querySelector('#example tbody');

  formularioRef.on('value', function (snapshot) {
    tableBody.innerHTML = "";

    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      var key = childSnapshot.key;

      var newRow = tableBody.insertRow();
      newRow.dataset.key = key;

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
          <button class="btn-edit btn btn-warning" onclick="editRow(this)"><i class="bi bi-pencil"></i></button>
          <button class="btn-save btn btn-success" style="display:none;" onclick="saveRow(this)">Salvar</button>
          <button class="btn-cancel btn btn-secondary mt-2" style="display:none;" onclick="cancelEdit(this)">Cancelar</button>
          <button class="btn-delete btn btn-danger mt-2" style="display:inline-block;" onclick="deleteRow(this)">Excluir</button>
        </td>
      `;
    });
  });

  window.editRow = function (button) {
    var row = button.closest('tr');
    var cells = row.cells;

    for (var i = 0; i < cells.length - 1; i++) {
      var cellValue = cells[i].textContent;
      cells[i].innerHTML = `<input class="form-control" type="text" value="${cellValue}">`;
    }

    toggleButtons(row, true);
  };

  window.saveRow = function (button) {
    var row = button.closest('tr');
    var cells = row.cells;
    var key = row.dataset.key;
    var newData = {};

    for (var i = 0; i < cells.length - 1; i++) {
      var fieldName = cells[i].textContent.toLowerCase().replace(/\s/g, ''); // Usar o texto da célula como nome do campo
      var cellValue = cells[i].querySelector('input') ? cells[i].querySelector('input').value : cells[i].textContent;

      // Verificar se a chave ou o valor estão vazios
      if (fieldName.trim() !== '' && cellValue.trim() !== '') {
        newData[fieldName] = cellValue;
      }
    }

    if (Object.keys(newData).length > 0) {
      formularioRef.child(key).update(newData, function (error) {
        if (error) {
          console.error("Erro ao atualizar no Firebase:", error);
        } else {
          console.log("Dados atualizados no Firebase com sucesso.");

          // Atualiza os dados no site
          for (var i = 0; i < cells.length - 1; i++) {
            var fieldName = cells[i].textContent.toLowerCase().replace(/\s/g, ''); // Usar o texto da célula como nome do campo
            cells[i].innerHTML = newData[fieldName];
          }

          // Volta para a exibição padrão dos botões
          toggleButtons(row, false);
        }
      });
    } else {
      console.log("Chave ou valor vazio. Não foi possível atualizar no Firebase.");
    }
  };

  window.cancelEdit = function (button) {
    // Atualiza a página para evitar inconsistências
    location.reload();
  };

  window.deleteRow = function (button) {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      var row = button.closest('tr');
      var key = row.dataset.key;
      formularioRef.child(key).remove();
      row.remove();
    }
  };

  function toggleButtons(row, isEditing) {
    var editButton = row.querySelector('.btn-edit');
    var saveButton = row.querySelector('.btn-save');
    var cancelButton = row.querySelector('.btn-cancel');
    var deleteButton = row.querySelector('.btn-delete');

    editButton.style.display = isEditing ? 'none' : 'inline-block';
    saveButton.style.display = isEditing ? 'inline-block' : 'none';
    cancelButton.style.display = isEditing ? 'inline-block' : 'none';
    deleteButton.style.display = isEditing ? 'none' : 'inline-block';
  }
});
