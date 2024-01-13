import './style.css';

(() => {
  const form = document.querySelector('form');
  const email = document.getElementById('email');
  const emailError = document.querySelector('#email + span');
  const country = document.getElementById('country');
  const ZIP = document.getElementById('ZIP');
  const ZIPerror = document.querySelector('#ZIP + span');
  const pwd = document.getElementById('pwd');
  const pwdError = document.querySelector('#pwd + span');
  const confirmationPwd = document.getElementById('confirmation-pwd');
  const confirmationPwdError = document.querySelector(
    '#confirmation-pwd + span',
  );

  function showEmailError() {
    if (email.validity.valueMissing) {
      emailError.textContent = 'Email address is required';
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
      ZIPerror.textContent = 'ZIP code is required';
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

  function showPasswordError() {
    if (pwd.validity.valueMissing && confirmationPwd.validity.valueMissing) {
      pwdError.textContent = 'Password is required';
      confirmationPwdError.textContent =
        'Confirmation password is also required';
    } else {
      pwdError.textContent = 'Passwords do not match';
      confirmationPwdError.textContent = 'Passwords do not match';
    }
    pwd.className = 'invalid';
    confirmationPwd.className = 'invalid';
    pwdError.className = 'error active';
    confirmationPwdError.className = 'error active';
    pwd.setCustomValidity('empty');
    confirmationPwd.setCustomValidity('empty');
  }

  function checkPasswords() {
    if (
      (pwd.value.length > 0 || confirmationPwd.value > 0) &&
      pwd.value === confirmationPwd.value
    ) {
      pwd.className = '';
      confirmationPwd.className = '';
      pwdError.textContent = '';
      confirmationPwdError.textContent = '';
      pwdError.className = 'error';
      confirmationPwdError.className = 'error';
      pwd.setCustomValidity('');
      confirmationPwd.setCustomValidity('');
    } else {
      showPasswordError();
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

  pwd.addEventListener('input', checkPasswords);

  confirmationPwd.addEventListener('input', checkPasswords);

  form.addEventListener('submit', (e) => {
    if (!email.validity.valid) {
      showEmailError();
      e.preventDefault();
    }

    if (!ZIP.validity.valid) {
      checkZIP();
      e.preventDefault();
    }

    if (!pwd.validity.valid || !confirmationPwd.validity.valid) {
      checkPasswords();
      e.preventDefault();
    }
  });
})();
