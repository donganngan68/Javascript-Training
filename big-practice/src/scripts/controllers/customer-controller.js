import { errorName, errorNameRegex, errorPhoneRegex, errorPhone,  errorCompany, errorEmail, errorEmailRegex, errorCountry } from '../../constants/errorMessages';

class CustomerController {
  constructor(view, service) {
    this.view = view;
    this.service = service;
    Object.assign(this, this.view);
  }

  init = () => {
    this.handleRenderTable();
    this.view.init();
    this.form.addEventListener('submit', this.handleSubmit);
  }

  handleRenderTable = async () => {
    try {
      const data = await this.service.getListCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  validateForm() {
    let nameInput = document.getElementById('name');
    let nameError = document.getElementById('name-error');
    let isValid = true;

    // Regular expression to validate the customer name
    const nameRegex = /^[a-zA-Z\s]{6,30}$/
    // - The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
    // - [a-zA-Z\s] matches any uppercase or lowercase letter or whitespace character.
    // - {2,30} specifies that the name should have a length between 2 and 30 characters.
    // Therefore, this regex pattern helps validate whether a string represents a valid name containing only letters and spaces, with a length between 2 and 30 characters.

    if (nameInput.value.trim() === '') {
      isValid = false;
      nameError.textContent = `${errorName}`;
      nameInput.classList.add('valid-check');
    } else if (!nameInput.value.match(nameRegex)) {
      isValid = false;
      nameError.textContent = `${errorNameRegex}`;
      nameInput.classList.add('valid-check');
    } else {
      nameError.textContent = '';
      nameInput.classList.remove('valid-check');
    }

    let companyInput = document.getElementById('company');
    let companyError = document.getElementById('company-error');
    if (companyInput.value.trim() === '') {
      isValid = false;
      companyError.textContent = `${errorCompany}`;
      companyInput.classList.add('valid-check');
    } else {
      companyError.textContent = '';
      companyInput.classList.remove('valid-check');

    }

    let phoneInput = document.getElementById('phone');
    let phoneError = document.getElementById('phone-error');

    // Regular expression to validate the phone number (start with 0 and no additional zeros after the initial zero)
    const phoneRegex = /^0[1-9][0-9]{8}$/;
    // - The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
    // - 0 matches the digit 0 at the beginning of the phone number.
    // - [1-9] matches any digit from 1 to 9, ensuring the second digit is not 0.
    // - [0-9]{8} matches exactly eight digits from 0 to 9, ensuring the total length of the phone number is 10 digits.
    // Therefore, this regex pattern helps validate whether a string represents a valid phone number starting with 0 and having a total of 10 digits.

    if (phoneInput.value.trim() === '') {
      isValid = false;
      phoneError.textContent = `${errorPhone}`;
      phoneInput.classList.add('valid-check');
    } else if (!phoneInput.value.match(phoneRegex)) {
      isValid = false;
      phoneError.textContent = `${errorPhoneRegex}`;
      phoneInput.classList.add('valid-check');
    } else {
      phoneError.textContent = '';
      phoneInput.classList.remove('valid-check');
    }

    let emailInput = document.getElementById('email');
    let emailError = document.getElementById('email-error');

    // Regular expression pattern to validate an email address
    const emailRegex = /^[\w\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/ ;
    // - The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
    // - [\w\.-]+ matches one or more word characters (a-z, A-Z, 0-9, or _) or dots (.) or hyphens (-) before the @ symbol.
    // - @[a-zA-Z0-9-]+ matches the @ symbol followed by one or more alphanumeric characters or hyphens before the dot.
    // - \.[a-zA-Z]{2,4} matches a dot followed by two to four uppercase or lowercase letters.
    // Therefore, this regex pattern helps validate whether a string represents a valid email address.

    if (emailInput.value.trim() === ''){
      isValid = false;
      emailError.textContent = `${errorEmail}`;
      emailInput.classList.add('valid-check');
    } else if (!emailInput.value.match(emailRegex)) {
      isValid = false;
      emailError.textContent = `${errorEmailRegex}`;
      emailInput.classList.add('valid-check');
    } else {
      emailError.textContent = '';
      emailInput.classList.remove('valid-check');
    }

    let countryError = document.getElementById('country-error');
    if (country.value === '') {
      isValid = false;
      countryError.textContent = `${errorCountry}`;
      country.classList.add('valid-check');
    } else {
      countryError.textContent = '';
      country.classList.remove('valid-check');
    }

    return isValid;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validateForm(event)) {
      return false;
    }

    try {
      await this.service.createCustomer(this.view.getCustomer());
      this.form.classList.remove('show');
      this.handleRenderTable();
    } catch (error) {
      console.error('Error creating customer:', error); // TODO: update later
    }
  }
}

export default CustomerController;
