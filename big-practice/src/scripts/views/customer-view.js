import imgDot from '../../assets/images/dot.png';

class CustomerView {
  constructor() {
    this.table = document.querySelector('.table-customer-body');
    this.iconAddCustomer = document.querySelector('.icon-add-modal');
    this.modalCustomer = document.querySelector('.modal-customer');
    this.iconCancel = document.querySelector('.icon-cancel');
    this.btnCancel = document.querySelector('.btn-secondary');
    this.formCustomer = document.querySelector('.form-customer');

    const showCustomerModal = () => {
      this.modalCustomer.style.display = "block";
    };

    const hideCustomerModal = () => {
      this.modalCustomer.style.display = "none";
    };

    const handleOutsideClick = (event) => {
      if (!this.formCustomer.contains(event.target)) {
        hideCustomerModal();
      }
    };

    this.iconAddCustomer.addEventListener("click", showCustomerModal);

    this.iconCancel.addEventListener("click", hideCustomerModal);

    this.btnCancel.addEventListener("click", hideCustomerModal);

    document.addEventListener("mousedown", handleOutsideClick);
  }

  renderData(list) {
    const html = list.map((customer) => `
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
      `);

    this.table.innerHTML = html.join('');
  }
}

export default CustomerView;

