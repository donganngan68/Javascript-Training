import imgDot from '../../assets/images/dot.png'
import { getElementById, querySelector, querySelectorAll } from '../../utils/get-element'
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
    this.form.addEventListener('submit', this.handleSubmit);
  }

  init() {
    this.iconAddCustomer.addEventListener('click', this.showCustomerModal.bind(this));
    this.iconCancel.addEventListener('click', this.hideCustomerModal.bind(this));
    this.btnCancel.addEventListener('click', this.hideCustomerModal.bind(this));
    document.addEventListener('mousedown', this.handleOutsideClick.bind(this));
  }

  showCustomerModal = () => {
    this.modalCustomer.classList.add('show');
  }

  hideCustomerModal = () => {
    this.countrySelect.selectedIndex = 0;
    this.inputFields.forEach(function (input) {
      input.value = '';
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
      (customer) => `
        <tr class="table-body">
          <td class="table-data">${customer.name}</td>
          <td class="table-data">${customer.company}</td>
          <td class="table-data">${customer.phone}</td>
          <td class="table-data">${customer.email}</td>
          <td class="table-data">${customer.country}</td>
          <td class="table-data table-data-icon">
            <button class="btn-active">Active</button>
            <img src="${imgDot}" alt="icon for click del or edit">
          </td>
        </tr>
      `
    )

    this.table.innerHTML = html.join('');
  }
}

export default CustomerView;
