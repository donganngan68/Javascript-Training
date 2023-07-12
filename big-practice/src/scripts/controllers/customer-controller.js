import { errorName } from '../../constants/url';
import { errorNameRegex } from '../../constants/url';
import { errorPhoneRegex } from '../../constants/url';
import { errorPhone } from '../../constants/url';
import { errorCompany } from '../../constants/url';


class CustomerController {
  constructor(view, service) {
    this.view = view
    this.service = service
  }

  init = () => {
    this.handleRenderTable()
    this.view.init()
    this.form = document.querySelector('.modal-customer');
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
    const nameRegex = /^[a-zA-Z\s]{2,30}$/

    if (nameInput.value.trim() === '') {
      isValid = false;
      nameError.textContent = `${errorName}`;
    } else if (!nameInput.value.match(nameRegex)) {
      isValid = false;
      nameError.textContent = `${errorNameRegex}`;
    } else {
      nameError.textContent = '';
    }

    let companyInput = document.getElementById('company');
    let companyError = document.getElementById('company-error');
    if (companyInput.value.trim() === '') {
      isValid = false;
      companyError.textContent = `${errorCompany}`;
    } else {
      companyError.textContent = '';
    }

    let phoneInput = document.getElementById('phone');
    let phoneError = document.getElementById('phone-error');

    // Regular expression to validate the phone number (start with 0 and no additional zeros after the initial zero)
    const phoneRegex = /^0[1-9][0-9]{8}$/;
    if (phoneInput.value.trim() === '') {
      isValid = false;
      phoneError.textContent = `${errorPhone}`;
    } else if (!phoneInput.value.match(phoneRegex)) {
      isValid = false;
      phoneError.textContent = `${errorPhoneRegex}`;
    } else {
      phoneError.textContent = '';
    }
    return isValid;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validateForm(event)) {
      return false;
    }

    const name = this.form.querySelector('#name').value;
    const company = this.form.querySelector('#company').value;
    const phone = this.form.querySelector('#phone').value;
    const email = this.form.querySelector('#email').value;
    const country = this.form.querySelector('#country').value;
    const status = this.form.querySelector('.on-off-input').checked;

    const customer = {
      name,
      company,
      phone,
      email,
      country,
      status,
    }

    try {
      await this.service.createCustomer(customer);
      this.form.reset();
      this.form.style.display = 'none';
      this.handleRenderTable();
    } catch (error) {
      console.error('Error creating customer:', error); // TODO: update later
    }
  }
}

export default CustomerController;
