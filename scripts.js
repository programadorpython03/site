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

// Carrossel Automático
let currentSlide = 0;
const slides = document.querySelectorAll('.carrossel-item');

function nextSlide() {
    slides[currentSlide].classList.remove('ativo');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('ativo');
    document.querySelector('.carrossel-container').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Inicia o carrossel (muda a cada 5 segundos)
setInterval(nextSlide, 5000);

// Salva o histórico de navegação no sessionStorage
function updateBreadcrumbs() {
  const currentPage = window.location.pathname.split('/').pop();
  let history = sessionStorage.getItem('navHistory') || '[]';
  history = JSON.parse(history);

  // Evita duplicar a última página
  if (history[history.length - 1] !== currentPage) {
      history.push(currentPage);
      sessionStorage.setItem('navHistory', JSON.stringify(history));
  }

  // Atualiza o HTML
  const breadcrumbs = document.getElementById('breadcrumbs');
  breadcrumbs.innerHTML = history.map(page => 
      `<a href="${page}">${page.replace('.html', '').replace(/-/g, ' ')}</a>`
  ).join(' > ');
}

// Executa ao carregar a página
window.onload = updateBreadcrumbs;