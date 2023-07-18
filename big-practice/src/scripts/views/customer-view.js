import imgDot from '../../assets/images/dot.png';
import { getElementById, querySelector, querySelectorAll } from '../../dom-helpers/get-element';
class CustomerView {
  constructor() {
    this.table = querySelector('.table-customer-body');
    this.iconAddCustomer = querySelector('.icon-add-modal');
    this.modalCustomer = querySelector('.modal-customer');
    this.iconCancelSubmit = querySelector('.icon-cancel-submit');
    this.btnCancelSubmit = querySelector('.btn-secondary');
    this.formCustomer = querySelector('.form-customer');
    this.countrySelect = getElementById('country');
    this.inputFields = querySelectorAll('.input-control', this.modalCustomer);
    this.errorMessages = querySelectorAll('.mess-invalid-form', this.modalCustomer);
    this.form = querySelector('.modal-customer');
    this.successSnackbar = querySelector('.valid-snackbar');
    this.wrongSnackbar = querySelector('.wrong-snackbar');
    this.modalCustomerDel = querySelector('.modal-customer-del'); // Del = Delete

    this.nameInput = getElementById('name');
    this.nameError = getElementById('name-error');
    this.companyInput = getElementById('company');
    this.companyError = getElementById('company-error');
    this.phoneInput = getElementById('phone');
    this.phoneError = getElementById('phone-error');
    this.emailInput = getElementById('email');
    this.emailError = getElementById('email-error');
    this.countryError = getElementById('country-error');
    this.customerTable = getElementById('customer-table');
    this.toggleInput = querySelector('.on-off-input');
    this.btnSubmit = querySelector('.btn-submit')
    this.iconCancelDelete = querySelector('.icon-cancel-delete');
    this.btnCancelDelete = querySelector('.btn-cancel-delete');
    this.btnConfirmDelete = querySelector('.btn-confirm-delete');
  }

  init() {
    this.iconAddCustomer.addEventListener('click', this.showCustomerModal);
    this.iconCancelSubmit.addEventListener('click', this.hideCustomerModal);
    this.btnCancelSubmit.addEventListener('click', this.hideCustomerModal);
    document.addEventListener('mousedown', this.handleOutsideClick);
    this.handleClickAction();
    this.iconCancelDelete.addEventListener('click', this.hideDeleteCustomerModal);
    this.btnCancelDelete.addEventListener('click', this.hideDeleteCustomerModal);
    this.btnConfirmDelete.addEventListener('click', this.bindHandleDeleteCustomer)
  }

  renderData(list) {
    let result = ''
    list.map(
      (customer) => {
        const { name, company, phone, email, country, status, id } = customer;
        const customerStatus = status === true ? 'Active' : 'Inactive';
        const btnStatusClassName = status === true ? 'btn-active' : 'btn-inactive';
        result += `
        <tr class="table-body" id="customer-table">
          <td class="table-data">${name}</td>
          <td class="table-data">${company}</td>
          <td class="table-data">${phone}</td>
          <td class="table-data">${email}</td>
          <td class="table-data">${country}</td>
          <td class="table-data table-data-icon">
            <button class="${btnStatusClassName}">${customerStatus}</button>
            <img data-option-id="${id}" class="img-dot-customer" src="${imgDot}" alt="icon for click del or edit">
            <div data-actions-id="${id}" class="action-panel">
              <button data-edit-id="${id}" class="action-btn">Edit</button>
              <button data-remove-id="${id}" class="action-btn">Remove</button>
            </div>
          </td>
        </tr>
      `
        this.table.innerHTML = result;
        this.handleClickAction(list)
      }
    )
  }

  getCustomer() {
    const name = querySelector('#name', this.form).value;
    const company = querySelector('#company', this.form).value;
    const phone = querySelector('#phone', this.form).value;
    const email = querySelector('#email', this.form).value;
    const country = querySelector('#country', this.form).value;
    const status = querySelector('.on-off-input', this.form).checked;
    const id = this.btnSubmit.value
    return {
      id,
      name,
      company,
      phone,
      email,
      country,
      status,
    }
  }

  initializeEditForm = (customer) => {
    const {name, company, phone, email, country, id, status} = customer
    this.nameInput.value = name,
    this.companyInput.value = company
    this.phoneInput.value = phone
    this.emailInput.value = email
    this.countrySelect.value = country
    this.btnSubmit.value = id  
    status === false ? this.toggleInput.removeAttribute('checked') : this.toggleInput.setAttribute('checked', 'checked')
  }

  handleClickAction = (customers) => {
    this.table.addEventListener('click', (e) => {
      const currentItem = e.target?.getAttribute('data-option-id');
      
      const editItemId = e.target?.getAttribute('data-edit-id');

      const removeItemId = e.target?.getAttribute('data-remove-id');

      const isKeepActionsPanel = !!editItemId || !!removeItemId;

      // TODO: Refactor this
      const actionsPanel = document.querySelectorAll('div[data-actions-id]');

      if (editItemId) {

        this.form.classList.add('show');
        const formTitle = querySelector('.form-title', this.modalCustomer);
        formTitle.innerHTML = 'Update Customer';
        customers && customers.map(item => {
          item.id === editItemId && this.initializeEditForm(item)
        })
      }

      if (removeItemId) {
        this.showDeleteCustomerModal()
        this.btnConfirmDelete.value = removeItemId
      }

      actionsPanel.forEach(nodeItem => {
        const panelId = nodeItem.getAttribute('data-actions-id');
        if (currentItem === panelId) {
          // nodeItem.style.visibility = nodeItem.style.visibility === "visible" ? "hidden" : "visible";
          nodeItem.style.visibility = "visible"
        } else {
          // TODO: Refactor this condition
          if (!isKeepActionsPanel) {
            nodeItem.style.visibility = "hidden";
          }
        }
      })
    })
  }

  showCustomerModal = () => {
    this.modalCustomer.classList.add('show');
    const formTitle = querySelector('.form-title', this.modalCustomer);
    formTitle.innerHTML = 'Create Customer';
    this.btnSubmit.value = ''
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

  showDeleteCustomerModal = () => {
    this.modalCustomerDel.classList.add('show');
  }

  hideDeleteCustomerModal = () => {
    this.modalCustomerDel.classList.remove('show');
  }

  handleOutsideClick = (event) => {
    if (!this.formCustomer.contains(event.target)) {
      this.hideCustomerModal();
    }
  }
  
  getDeleteCustomerId = () => {
    return this.btnConfirmDelete.value
  }

  // bindHandleDeleteCustomer = (handler) => {
  //   this.hideDeleteCustomerModal()
  //   const customerId = this.btnConfirmDelete.value
  //   handler(customerId)
  // }

  handleSubmitDataSuccess = () => {
    this.form.classList.remove('show');
      this.successSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.successSnackbar.style.visibility = 'hidden';
      }, 3000);
  }

  handleSubmitDataFailed = () => {
    this.wrongSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.wrongSnackbar.style.visibility = 'hidden';
      }, 3000);
  }

}

export default CustomerView;
