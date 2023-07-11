import imgDot from '../../assets/images/dot.png';

class CustomerView {
  constructor() {
    this.table = document.querySelector('.table-customer-body');
    this.iconAddCustomer = document.querySelector('.icon-add-modal');
    this.modalCustomer = document.querySelector('.modal-customer');
    this.iconCancel = document.querySelector('.icon-cancel');
    this.btnCancel = document.querySelector('.btn-secondary');
    this.formCustomer = document.querySelector('.form-customer');
    this.inputTitle = document.querySelectorAll('.input-title');
    this.messInvalidForm = document.querySelectorAll('.mess-invalid-form');

    const showCustomerModal = () => {
      this.modalCustomer.style.display = 'block';
    };

    const hideCustomerModal = () => {
      this.modalCustomer.style.display = 'none';
      resetFormInputs();
    };

    const handleOutsideClick = (event) => {
      if (!this.formCustomer.contains(event.target)) {
        hideCustomerModal();
        resetFormInputs();
      }
    };

    this.inputTitle.forEach((itemInput, i) => {
      const showMessInvalid = (event) => {
        if (!event.target.value) {
          this.messInvalidForm[i].style.display = 'block';
          itemInput.style.border = '1px solid #f00';
        } else {
          this.messInvalidForm[i].style.display = 'none';
          itemInput.style.border = '1px solid #000';
        }
      };

      itemInput.addEventListener('blur', showMessInvalid);
      itemInput.addEventListener('input', showMessInvalid);
    })

    const resetFormInputs = () => {
      this.inputTitle.forEach(input => {
        input.value = '';
        input.style.border = '1px solid #000';
      });

      this.messInvalidForm.forEach(mess => {
        mess.style.display = 'none';
      });
    };

    this.iconAddCustomer.addEventListener('click', showCustomerModal);

    this.iconCancel.addEventListener('click', hideCustomerModal);

    this.btnCancel.addEventListener('click', hideCustomerModal);

    document.addEventListener('mousedown', handleOutsideClick);
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

