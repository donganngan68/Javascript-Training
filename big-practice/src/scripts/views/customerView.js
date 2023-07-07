import imgDot from '../../assets/images/dot.png';

class CustomerView {
  constructor() {
    this.table = document.querySelector('.table-main');
    this.iconModal = document.querySelector('.icon-modal');
    this.modalCustomer = document.querySelector('.modal-customer');
    this.iconCancel = document.querySelector('.icon-cancel');

    this.iconModal.addEventListener("click", () => {
      this.modalCustomer.style.display = "block";
    });

    this.iconCancel.addEventListener("click", () => {
      this.modalCustomer.style.display = "none";
    });
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

