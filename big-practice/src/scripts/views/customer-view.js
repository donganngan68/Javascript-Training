import imgDot from '../../assets/images/dot.png';
import { getElementById, querySelector, querySelectorAll } from '../../utils/get-element';
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
    this.form = document.querySelector('.modal-customer');
  }

  getCustomer() {
    const name = this.form.querySelector('#name').value;
    const company = this.form.querySelector('#company').value;
    const phone = this.form.querySelector('#phone').value;
    const email = this.form.querySelector('#email').value;
    const country = this.form.querySelector('#country').value;
    const status = this.form.querySelector('.on-off-input').checked;
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
