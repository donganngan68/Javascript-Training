import { BASE_URL } from '../../constants/url';

class CustomerService {
  getListCustomer = async () => {
    const apiRequest = await fetch(`${BASE_URL}customers`);
    const dataReponse = await apiRequest.json();
    return dataReponse;
  }

  async createCustomer(customer) {
    const response = await fetch(`${BASE_URL}customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }

  validateForm() {
    var nameInput = document.getElementById('name');
    var nameError = document.getElementById('name-error');
    var isValid = true;
    var nameRegex = /^[a-zA-Z\s]{10,30}$/

    if (nameInput.value.trim() === '') {
      var isValid = false;
      nameError.textContent = 'The customer name is required';
    } else if (!nameInput.value.match(nameRegex)) {
      var isValid = false;
      nameError.textContent = 'Please enter a valid customer name';
    } else {
      nameError.textContent = '';
    }

    var companyInput = document.getElementById('company');
    var companyError = document.getElementById('company-error');
    if (companyInput.value.trim() === '') {
      var isValid = false;
      companyError.textContent = 'The company name is required';
    } else {
      companyError.textContent = '';
    }

    var phoneInput = document.getElementById('phone');
    var phoneError = document.getElementById('phone-error');
    var phoneRegex = /^0\d{9}$/;
    if (phoneInput.value.trim() === '') {
      var isValid = false;
      phoneError.textContent = 'The phone number is required';
    } else if (!phoneInput.value.match(phoneRegex)) {
      var isValid = false;
      phoneError.textContent = 'Please enter a valid valid phone number';
    } else {
      phoneError.textContent = '';
    }
    return isValid;
  }
}

export default CustomerService;