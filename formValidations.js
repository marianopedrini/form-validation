window.addEventListener('load', function () {
  let form;
  setFormSelector = (formId) => {
    let formSelector = document.getElementById(formId);
    form = `#${formSelector.getAttribute('id')}`;
  };
  setFormSelector('formId');

  const btn = document.querySelector(`${form} #btn`);
  const inputs = document.querySelectorAll(`${form} input`);
  const selects = document.querySelectorAll(`${form} select`);

  const validations = {
    name: {
      expression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //letras y espacio.
      errorMsg: '* El nombre sólo debe contener letras.',
      isValid: false,
    },
    lastName: {
      expression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // sólo letras
      errorMsg: '* El apellido sólo debe contener letras.',
      isValid: false,
    },
    dni: {
      expression: /^\d{6,8}$/, // numero de 6 a 8 digitos
      errorMsg: '* El dni debe contener de 6 a 8 números.',
      isValid: false,
    },
    email: {
      expression: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      errorMsg:
        '* El email sólo puede contener letras, numeros, puntos, guiones y guion bajo.',
      isValid: false,
    },
    prefix: {
      expression: /^\d{2,4}$/, // numero de 2 a 4 digitos
      errorMsg:
        '* El prefijo sólo debe tener entre 2 y 4 números. Sin 0, sin 9 y sin 15.',
      isValid: false,
    },
    phone: {
      expression: /^\d{6,8}$/, // numero de 6 a 8 digitos
      errorMsg:
        '* El teléfono sólo debe tener entre 6 y 8 números. Sin 0, sin 9 y sin 15.',
      isValid: false,
    },
  };

  const validateForm = (e) => {
    const errorId = `${e.target.name}-error`;
    const errorDiv = document.getElementById(errorId);
    switch (e.target.name) {
      case 'name':
        validateInput(validations.name, e.target, errorDiv, 'nombre');
        break;

      case 'last_name':
        validateInput(validations.lastName, e.target, errorDiv, 'apellido');
        break;

      case 'dni':
        validateInput(validations.dni, e.target, errorDiv, e.target.name);
        break;

      case 'email':
        validateInput(validations.email, e.target, errorDiv, e.target.name);
        break;

      case 'prefix':
        validateInput(validations.prefix, e.target, errorDiv, 'prefijo');
        break;

      case 'phone':
        validateInput(validations.phone, e.target, errorDiv, 'celular');
        break;
    }
  };

  const validateInput = (validation, input, errorDiv, name) => {
    // if input class no-validable
    if (validation.expression.test(input.value)) {
      input.classList.remove('input-error');
      input.classList.add('is-valid');
      errorDiv.innerHTML = '';
      validation.isValid = true;
    } else if (input.value == '') {
      input.classList.add('input-error');
      input.classList.remove('is-valid');
      errorDiv.innerHTML = `* Debes ingresar tu ${name}.`;
      validation.isValid = false;
    } else {
      input.classList.add('input-error');
      input.classList.remove('is-valid');
      errorDiv.innerHTML = validation.errorMsg;
      validation.isValid = false;
    }
  };

  const validateSelect = (validation, select, errorDiv, name) => {
    if (select.value == '') {
      select.classList.add('input-error');
      select.classList.remove('is-valid');
      errorDiv.innerHTML = `* Debes ingresar tu ${name}.`;
      validation.isValid = false;
    } else {
      select.classList.remove('input-error');
      select.classList.add('is-valid');
      errorDiv.innerHTML = ``;
      validation.isValid = true;
    }
  };

  const checkWhiteSpace = (e) => {
    if (/^\s/.test(e.target.value)) {
      e.target.value = '';
    }
  };

  inputs.forEach((input) => {
    input.addEventListener('keyup', checkWhiteSpace);
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
  });

  selects.forEach((select) => {
    select.addEventListener('blur', validateForm);
    select.addEventListener('change', validateForm);
  });

  const formError = document.getElementById('form-error');
  btn.addEventListener('click', (e) => {
    for (const item in validations) {
      if (!validations[item].isValid) {
        e.preventDefault();
        formError.style['display'] = 'block';
        break;
      } else {
        formError.style['display'] = 'none';
      }
    }
  });
});
