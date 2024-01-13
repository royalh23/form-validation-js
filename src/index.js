import './style.css';

(() => {
  const form = document.querySelector('form');
  const email = document.getElementById('email');
  const emailError = document.querySelector('#email + span');
  const country = document.getElementById('country');
  const ZIP = document.getElementById('ZIP');
  const ZIPerror = document.querySelector('#ZIP + span');

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

  function showZIPerror(constraints, countryValue) {
    if (ZIP.validity.valueMissing) {
      ZIPerror.textContent = 'You need to enter a ZIP code';
    } else {
      ZIPerror.textContent = `${constraints[countryValue][1]}`;
    }

    ZIP.className = 'invalid';
    ZIPerror.className = 'error active';
    ZIP.setCustomValidity('empty');
  }

  function checkZIP() {
    const constraints = {
      ch: [
        '^(CH-)?\\d{4}$',
        'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
      ],
      fr: [
        '^(F-)?\\d{5}$',
        'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
      ],
      de: [
        '^(D-)?\\d{5}$',
        'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
      ],
      nl: [
        '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
        'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
      ],
    };

    const countryValue = document.getElementById('country').value;
    const constraint = new RegExp(constraints[countryValue][0], '');

    if (constraint.test(ZIP.value)) {
      ZIP.className = '';
      ZIPerror.textContent = '';
      ZIPerror.className = 'error';
      ZIP.setCustomValidity('');
    } else {
      showZIPerror(constraints, countryValue);
    }
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

  country.addEventListener('change', checkZIP);

  ZIP.addEventListener('input', checkZIP);

  form.addEventListener('submit', (e) => {
    if (!email.validity.valid) {
      showEmailError();
      e.preventDefault();
    }

    if (!ZIP.validity.valid) {
      checkZIP();
      e.preventDefault();
    }
  });
})();
