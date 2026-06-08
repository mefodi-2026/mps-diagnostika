const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const business = document.getElementById('business').value.trim();
  const turnover = document.getElementById('turnover').value;
  const problem = document.getElementById('problem').value.trim();

  if (!name || !phone || !business || !turnover) {
    alert('Пожалуйста, заполните обязательные поля.');
    return;
  }

  const text = `Здравствуйте! Хочу пройти бесплатную диагностику бизнеса.%0A%0AИмя: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}%0AСфера бизнеса: ${encodeURIComponent(business)}%0AОборот: ${encodeURIComponent(turnover)}%0AЧто беспокоит: ${encodeURIComponent(problem || 'Не указано')}`;
  window.open(`https://wa.me/77064261056?text=${text}`, '_blank');
});
