import './style.css';

(() => {
  const form = document.querySelector('form');
  const email = document.getElementById('email');
  const emailError = document.querySelector("input[type='email'] + span");

  function showEmailError() {
    if (email.validity.valueMissing) {
      emailError.textContent = 'You need to enter an email address';
    } else if (email.validity.typeMismatch) {
      emailError.textContent = 'Entered value needs to be an email address';
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email.minLength} 
                                characters; you entered ${email.value.length}`;
    }

    email.className = 'required';
    emailError.className = 'error active';
  }

  email.addEventListener('input', () => {
    if (email.validity.valid) {
      email.className = '';
      emailError.textContent = '';
      emailError.className = 'error';
    } else {
      showEmailError();
    }
  });

  form.addEventListener('submit', (e) => {
    if (!email.validity.valid) {
      showEmailError();
      e.preventDefault();
    }
  });
})();
