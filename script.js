const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.nav a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

document.getElementById('leadForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const business = document.getElementById('business').value.trim();
  const turnover = document.getElementById('turnover').value;
  const problem = document.getElementById('problem').value.trim();
  const params = new URLSearchParams(window.location.search);

  const utm_source = params.get('utm_source') || '';
  const utm_campaign = params.get('utm_campaign') || '';
  const utm_content = params.get('utm_content') || '';

  if (!name || !phone || !business || !turnover) {
    alert('Пожалуйста, заполните обязательные поля.');
    return;
  }

  const data = {
    name,
    phone,
    business,
    turnover,
    problem,
    utm_source,
    utm_campaign,
    utm_content
  };

  try {
    await fetch(
      'https://script.google.com/macros/s/AKfycbwPgAqvxZkUTirDJ7z3UJ9sAhBWCCX4QH_0UXPa2ZahwKLzRLdSbi3kNpic42B69FZwpA/exec',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
  } catch (error) {
    console.error('Ошибка отправки в таблицу:', error);
  }

  const text =
    `Здравствуйте! Хочу пройти бесплатную диагностику бизнеса.%0A%0A` +
    `Имя: ${encodeURIComponent(name)}%0A` +
    `WhatsApp: ${encodeURIComponent(phone)}%0A` +
    `Сфера бизнеса: ${encodeURIComponent(business)}%0A` +
    `Оборот: ${encodeURIComponent(turnover)}%0A` +
    `Что беспокоит: ${encodeURIComponent(problem || 'Не указано')}`;

  window.open(
    `https://wa.me/77064261056?text=${text}`,
    '_blank'
  );
});