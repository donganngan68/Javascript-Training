import imgDot from '../../assets/images/dot.png';

class CustomerView {
  constructor() {
    this.table = document.querySelector('.table-main');
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

