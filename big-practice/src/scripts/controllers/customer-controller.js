import { NAME_REQUIRED_ERROR_MESSAGE, INVALID_NAME_ERROR_MESSAGE, INVALID_PHONE_ERROR_MESSAGE, PHONE_REQUIRED_ERROR_MESSAGE,  COMPANY_REQUIRED_ERROR_MESSAGE, EMAIL_REQUIRED_ERROR_MESSAGE, INVALID_EMAIL_ERROR_MESSAGE, COUNTRY_REQUIRED_ERROR_MESSAGE } from '../../constants/error-messages';

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

  handleRenderForm = async () => {
    try {
      const data = await this.service.editCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  validateForm() {
    let isValid = true;

    // Regular expression to validate the customer name
    const nameRegex = /^[a-zA-Z\s]{6,30}$/;
    /**
     * The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
     * [a-zA-Z\s] matches any uppercase or lowercase letter or whitespace character.
     * {6,30} specifies that the name should have a length between 2 and 30 characters.
     * Therefore, this regex pattern helps validate whether a string represents a valid name containing only letters and spaces, with a length between 2 and 30 characters.
    */

    if (this.nameInput.value.trim() === '') {
      isValid = false;
      this.nameError.textContent = `${NAME_REQUIRED_ERROR_MESSAGE}`;
      this.nameInput.classList.add('valid-check');
    } else if (!this.nameInput.value.match(nameRegex)) {
      isValid = false;
      this.nameError.textContent = `${INVALID_NAME_ERROR_MESSAGE}`;
      this.nameInput.classList.add('valid-check');
    } else {
      this.nameError.textContent = '';
      this.nameInput.classList.remove('valid-check');
    }

    if (this.companyInput.value.trim() === '') {
      isValid = false;
      this.companyError.textContent = `${COMPANY_REQUIRED_ERROR_MESSAGE}`;
      this.companyInput.classList.add('valid-check');
    } else {
      this.companyError.textContent = '';
      this.companyInput.classList.remove('valid-check');

    }

    // Regular expression to validate the phone number (start with 0 and no additional zeros after the initial zero)
    const phoneRegex = /^0[1-9][0-9]{8}$/;
    /**
     * The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
     * 0 matches the digit 0 at the beginning of the phone number.
     * [1-9] matches any digit from 1 to 9, ensuring the second digit is not 0.
     * [0-9]{8} matches exactly eight digits from 0 to 9, ensuring the total length of the phone number is 10 digits.
     * Therefore, this regex pattern helps validate whether a string represents a valid phone number starting with 0 and having a total of 10 digits.
    */

    if (this.phoneInput.value.trim() === '') {
      isValid = false;
      this.phoneError.textContent = `${PHONE_REQUIRED_ERROR_MESSAGE}`;
      this.phoneInput.classList.add('valid-check');
    } else if (!this.phoneInput.value.match(phoneRegex)) {
      isValid = false;
      this.phoneError.textContent = `${INVALID_PHONE_ERROR_MESSAGE}`;
      this.phoneInput.classList.add('valid-check');
    } else {
      this.phoneError.textContent = '';
      this.phoneInput.classList.remove('valid-check');
    }

    // Regular expression pattern to validate an email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    /**
     * ^ asserts the start of the string.
     * [a-zA-Z0-9._%+-]+ matches one or more alphanumeric characters, dots, underscores, percentage signs, plus signs, or hyphens.
     *  This represents the username part of the email address.
     * '@' matches the "@" symbol.
     * '[a-zA-Z0-9.-]+' matches one or more alphanumeric characters, dots, or hyphens. This represents the domain name part of the email address.
     * '\.' matches a dot character. We need to escape it with a backslash since the dot has a special meaning in regex.
     * '[a-zA-Z]{2,}' matches two or more letters. This represents the top-level domain (TLD) part of the email address.
     * '$' asserts the end of the string.
    */

    if (this.emailInput.value.trim() === ''){
      isValid = false;
      this.emailError.textContent = `${EMAIL_REQUIRED_ERROR_MESSAGE}`;
      this.emailInput.classList.add('valid-check');
    } else if (!this.emailInput.value.match(emailRegex)) {
      isValid = false;
      this.emailError.textContent = `${INVALID_EMAIL_ERROR_MESSAGE}`;
      this.emailInput.classList.add('valid-check');
    } else {
      this.emailError.textContent = '';
      this.emailInput.classList.remove('valid-check');
    }

    if (country.value === '') {
      isValid = false;
      this.countryError.textContent = `${COUNTRY_REQUIRED_ERROR_MESSAGE}`;
      country.classList.add('valid-check');
    } else {
      this.countryError.textContent = '';
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
      this.successSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.successSnackbar.style.visibility = 'hidden';
      }, 3000);
    } catch (error) {
      console.error('Error creating customer:', error); // TODO: update later
      this.wrongSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.wrongSnackbar.style.visibility = 'hidden';
      }, 3000);
    }
  }
}

export default CustomerController;
