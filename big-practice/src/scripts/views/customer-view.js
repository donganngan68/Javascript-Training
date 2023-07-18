import imgDot from '../../assets/images/dot.png';
import { getElementById, querySelector, querySelectorAll } from '../../dom-helpers/get-element';
class CustomerView {
  constructor() {
    this.table = querySelector('.table-customer-body');
    this.iconAddCustomer = querySelector('.icon-add-modal');
    this.modalCustomer = querySelector('.modal-customer');
    this.iconCancel = querySelector('.icon-cancel');
    this.btnCancel = querySelector('.btn-secondary');
    this.formCustomer = querySelector('.form-customer');
    this.countrySelect = getElementById('country');
    this.inputFields = querySelectorAll('.input-control', this.modalCustomer);
    this.errorMessages = querySelectorAll('.mess-invalid-form', this.modalCustomer);
    this.form = querySelector('.modal-customer');
    this.successSnackbar = querySelector('.valid-snackbar');
    this.wrongSnackbar = querySelector('.wrong-snackbar');

    this.nameInput = getElementById('name');
    this.nameError = getElementById('name-error');
    this.companyInput = getElementById('company');
    this.companyError = getElementById('company-error');
    this.phoneInput = getElementById('phone');
    this.phoneError = getElementById('phone-error');
    this.emailInput = getElementById('email');
    this.emailError = getElementById('email-error');
    this.countryError = getElementById('country-error');
  }

  getCustomer() {
    const name = querySelector('#name', this.form).value;
    const company = querySelector('#company', this.form).value;
    const phone = querySelector('#phone', this.form).value;
    const email = querySelector('#email', this.form).value;
    const country = querySelector('#country', this.form).value;
    const status = querySelector('.on-off-input', this.form).checked;
    return {
      name,
      company,
      phone,
      email,
      country,
      status,
    }
  }

  init() {
    this.iconAddCustomer.addEventListener('click', this.showCustomerModal);
    this.iconCancel.addEventListener('click', this.hideCustomerModal);
    this.btnCancel.addEventListener('click', this.hideCustomerModal);
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  showCustomerModal = () => {
    this.modalCustomer.classList.add('show');
  }

  hideCustomerModal = () => {
    this.countrySelect.selectedIndex = 0;
    this.inputFields.forEach(function (input) {
      input.value = '';
      input.classList.remove('valid-check');
    });
    this.errorMessages.forEach(function (error) {
      error.textContent = '';
    });
    this.modalCustomer.classList.remove('show');
  }

  handleOutsideClick = (event) => {
    if (!this.formCustomer.contains(event.target)) {
      this.hideCustomerModal();
    }
  }

  renderData(list) {
    const html = list.map(
      (customer) => {
        const {name, company, phone, email, country, status} = customer;
        const customerStatus = status === true ? 'Active' : 'Inactive';
        const btnStatusClassName = status === true ? 'btn-active' : 'btn-inactive';
        return  `
        <tr class="table-body">
          <td class="table-data">${name}</td>
          <td class="table-data">${company}</td>
          <td class="table-data">${phone}</td>
          <td class="table-data">${email}</td>
          <td class="table-data">${country}</td>
          <td class="table-data table-data-icon">
            <button class='${btnStatusClassName}'>${customerStatus}</button>
            <img src="${imgDot}" alt="icon for click del or edit">
          </td>
        </tr>
      `
      }
    )

    this.table.innerHTML = html.join('');
  }
}

export default CustomerView;
