document.getElementById('leadForm').addEventListener('submit', async function(e) {
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

  const data = {
    name,
    phone,
    business,
    turnover,
    problem
  };

  try {
    await fetch(
      'https://script.google.com/macros/s/AKfycbxS1NA5NCNLEnfO1xz1YT7y3vaR02mNjypZqPKF6MxLEXlb0OVDniw5zVBA5gR2bkFBmA/exec',
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
    console.error(error);
  }

  const text = `Здравствуйте! Хочу пройти бесплатную диагностику бизнеса.%0A%0AИмя: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}%0AСфера бизнеса: ${encodeURIComponent(business)}%0AОборот: ${encodeURIComponent(turnover)}%0AЧто беспокоит: ${encodeURIComponent(problem || 'Не указано')}`;

  window.open(
    `https://wa.me/77064261056?text=${text}`,
    '_blank'
  );
});