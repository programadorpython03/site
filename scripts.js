// Exemplo de interatividade: Adicionar um alerta ao clicar no botão de reserva
document.querySelectorAll('.produto button').forEach(button => {
  button.addEventListener('click', () => {
      const produto = button.parentElement.querySelector('h3').innerText;
      alert(`Você reservou: ${produto}`);
  });
});

function atualizarTotal(kit) {
  const checkboxes = document.querySelectorAll(`.kit-info input[name="item"]`);
  let total = parseFloat(document.querySelector(`#${kit} .preco`).textContent.replace("Preço base: R$ ", ""));
  
  checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
          total += parseFloat(checkbox.value);
      }
  });

  document.querySelector(`#total-${kit.toLowerCase()}`).textContent = total.toFixed(2);
}

function reservarKit(kit) {
  const total = document.querySelector(`#total-${kit.toLowerCase()}`).textContent;
  alert(`Você reservou o Kit ${kit} por R$ ${total}. Obrigado!`);
}

// Adiciona eventos aos checkboxes
document.querySelectorAll('.opcoes input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
      const kit = checkbox.closest('.kit-info').querySelector('h3').textContent.toLowerCase();
      atualizarTotal(kit);
  });
});