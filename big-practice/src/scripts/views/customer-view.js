import imgDot from '../../assets/images/dot.png';
import { getElementById, querySelector, querySelectorAll } from '../../dom-helpers/get-element';
import { NAME_REQUIRED_ERROR_MESSAGE, INVALID_NAME_ERROR_MESSAGE, INVALID_PHONE_ERROR_MESSAGE, PHONE_REQUIRED_ERROR_MESSAGE,  COMPANY_REQUIRED_ERROR_MESSAGE, EMAIL_REQUIRED_ERROR_MESSAGE, INVALID_EMAIL_ERROR_MESSAGE, COUNTRY_REQUIRED_ERROR_MESSAGE } from '../constants/error-messages';

class CustomerView {
  constructor() {
    this.table = querySelector('.table-customer-body');
    this.iconAddCustomer = querySelector('.icon-add-modal');
    this.formCustomer = querySelector('.form-customer');
    this.iconCancelSubmit = querySelector('.icon-cancel-submit', this.formCustomer);
    this.btnCancelSubmit = querySelector('.btn-secondary', this.formCustomer);
    this.modalCustomer = querySelector('.modal-customer');
    this.inputFields = querySelectorAll('.input-control', this.formCustomer);
    this.errorMessages = querySelectorAll('.mess-invalid-form', this.formCustomer);
    this.successSnackbar = querySelector('.valid-snackbar');
    this.errorSnackbar = querySelector('.error-snackbar');
    this.modalCustomerDel = querySelector('.modal-customer-del'); // Del = Delete

    this.customerTable = querySelector('.customer-table');
    this.toggleInput = querySelector('.on-off-input');
    this.btnSubmit = querySelector('.btn-submit')
    this.iconCancelDelete = querySelector('.icon-cancel-delete');
    this.btnCancelDelete = querySelector('.btn-cancel-delete');
    this.btnConfirmDelete = querySelector('.btn-confirm-delete');
    
    this.nameInput = querySelector('.name');
    this.nameError = this.nameInput.nextElementSibling;
    this.companyInput = querySelector('.company');
    this.companyError = this.companyInput.nextElementSibling;
    this.phoneInput = querySelector('.phone');
    this.phoneError = this.phoneInput.nextElementSibling;
    this.emailInput = querySelector('.email');
    this.emailError = this.emailInput.nextElementSibling;
    this.countrySelect = getElementById('country');
    this.countryError = this.countrySelect.nextElementSibling;
  }

  getCustomer() {
    const name = this.nameInput.value;
    const company = this.companyInput.value;
    const phone = this.phoneInput.value;
    const email = this.emailInput.value;
    const country = this.countrySelect.value;
    const status = this.toggleInput.checked;
    const id = this.btnSubmit.value;
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

  init() {
    this.iconAddCustomer.addEventListener('click', this.showCustomerModal);
    this.iconCancelSubmit.addEventListener('click', this.hideCustomerModal);
    this.btnCancelSubmit.addEventListener('click', this.hideCustomerModal);
    document.addEventListener('mousedown', this.handleOutsideClick);
    this.handleTableRowAction();
    this.iconCancelDelete.addEventListener('click', this.hideDeleteCustomerModal);
    this.btnCancelDelete.addEventListener('click', this.hideDeleteCustomerModal);
    this.btnConfirmDelete.addEventListener('click', this.bindHandleDeleteCustomer);
  }

  validateForm() {
    let isValid = true;

    // Regular expression to validate the customer name
    /**
     * The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
     * [a-zA-Z\s] matches any uppercase or lowercase letter or whitespace character.
     * {6,30} specifies that the name should have a length between 2 and 30 characters.
     * Therefore, this regex pattern helps validate whether a string represents a valid name containing only letters and spaces, with a length between 2 and 30 characters.
    */
    const nameRegex = /^[a-zA-Z\s]{6,30}$/;

    if (this.nameInput.value.trim() === '') {
      isValid = false;
      this.nameError.textContent = `${NAME_REQUIRED_ERROR_MESSAGE}`;
      this.nameInput.classList.add('valid-check');
    } else if (!this.nameInput.value.match(nameRegex)) {
      isValid = false;
      this.nameError.textContent = `${INVALID_NAME_ERROR_MESSAGE}`;
      this.nameInput.classList.add('valid-check');
    } else {
      this.nameError.textContent = '';
      this.nameInput.classList.remove('valid-check');
    }

    if (this.companyInput.value.trim() === '') {
      isValid = false;
      this.companyError.textContent = `${COMPANY_REQUIRED_ERROR_MESSAGE}`;
      this.companyInput.classList.add('valid-check');
    } else {
      this.companyError.textContent = '';
      this.companyInput.classList.remove('valid-check');

    }

    // Regular expression to validate the phone number (start with 0 and no additional zeros after the initial zero)
    /**
     * The pattern starts and ends with the ^ and $ anchors, respectively, ensuring the entire string is matched.
     * 0 matches the digit 0 at the beginning of the phone number.
     * [1-9] matches any digit from 1 to 9, ensuring the second digit is not 0.
     * [0-9]{8} matches exactly eight digits from 0 to 9, ensuring the total length of the phone number is 10 digits.
     * Therefore, this regex pattern helps validate whether a string represents a valid phone number starting with 0 and having a total of 10 digits.
    */
    const phoneRegex = /^0[1-9][0-9]{8}$/;

    if (this.phoneInput.value.trim() === '') {
      isValid = false;
      this.phoneError.textContent = `${PHONE_REQUIRED_ERROR_MESSAGE}`;
      this.phoneInput.classList.add('valid-check');
    } else if (!this.phoneInput.value.match(phoneRegex)) {
      isValid = false;
      this.phoneError.textContent = `${INVALID_PHONE_ERROR_MESSAGE}`;
      this.phoneInput.classList.add('valid-check');
    } else {
      this.phoneError.textContent = '';
      this.phoneInput.classList.remove('valid-check');
    }

    // Regular expression pattern to validate an email address
    /**
     * ^ asserts the start of the string.
     * [a-zA-Z0-9._%+-]+ matches one or more alphanumeric characters, dots, underscores, percentage signs, plus signs, or hyphens.
     *  This represents the username part of the email address.
     * '@' matches the "@" symbol.
     * '[a-zA-Z0-9.-]+' matches one or more alphanumeric characters, dots, or hyphens. This represents the domain name part of the email address.
     * '\.' matches a dot character. We need to escape it with a backslash since the dot has a special meaning in regex.
     * '[a-zA-Z]{2,}' matches two or more letters. This represents the top-level domain (TLD) part of the email address.
     * '$' asserts the end of the string.
    */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (this.emailInput.value.trim() === ''){
      isValid = false;
      this.emailError.textContent = `${EMAIL_REQUIRED_ERROR_MESSAGE}`;
      this.emailInput.classList.add('valid-check');
    } else if (!this.emailInput.value.match(emailRegex)) {
      isValid = false;
      this.emailError.textContent = `${INVALID_EMAIL_ERROR_MESSAGE}`;
      this.emailInput.classList.add('valid-check');
    } else {
      this.emailError.textContent = '';
      this.emailInput.classList.remove('valid-check');
    }

    if (country.value === '') {
      isValid = false;
      this.countryError.textContent = `${COUNTRY_REQUIRED_ERROR_MESSAGE}`;
      country.classList.add('valid-check');
    } else {
      this.countryError.textContent = '';
      country.classList.remove('valid-check');
    }

    return isValid;
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
    this.formCustomer.classList.remove('show');
  }

  handleOutsideClick = (event) => {
    if (!this.modalCustomer.contains(event.target)) {
      this.hideCustomerModal();
    }
  }

  handleSubmitDataSuccess = () => {
    this.formCustomer.classList.remove('show');
      this.successSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.successSnackbar.style.visibility = 'hidden';
      }, 3000);
  }

  handleSubmitDataFailed = () => {
    this.errorSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.errorSnackbar.style.visibility = 'hidden';
      }, 3000);
  }

  renderData(list) {
    let result = ''
    list.map(
      (customer) => {
        const { name, company, phone, email, country, status, id } = customer;
        const customerStatus = status === true ? 'Active' : 'Inactive';
        const btnStatusClassName = status === true ? 'btn-active' : 'btn-inactive';
        result += `
        <tr class="table-body customer-table">
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
        this.handleTableRowAction(list);
      }
    )
  }

  initializeEditForm = (customer) => {
    const {name, company, phone, email, country, id, status} = customer;
    this.nameInput.value = name;
    this.companyInput.value = company;
    this.phoneInput.value = phone;
    this.emailInput.value = email;
    this.countrySelect.value = country;
    this.btnSubmit.value = id;
    status === false ? this.toggleInput.removeAttribute('checked') : this.toggleInput.setAttribute('checked', 'checked');
  }

  handleTableRowAction = (customers) => {
    this.table.addEventListener('click', (e) => {
      const currentItem = e.target?.getAttribute('data-option-id');

      const editItemId = e.target?.getAttribute('data-edit-id');

      const removeItemId = e.target?.getAttribute('data-remove-id');

      const isKeepActionsPanel = !!editItemId || !!removeItemId;

      // TODO: Refactor this
      const actionsPanel = document.querySelectorAll('div[data-actions-id]');

      if (editItemId) {
        this.formCustomer.classList.add('show');
        const formTitle = querySelector('.form-title', this.formCustomer);
        formTitle.innerHTML = 'Update Customer';
        customers && customers.map(item => {
          item.id === editItemId && this.initializeEditForm(item);
        })
      }

      if (removeItemId) {
        this.showDeleteCustomerModal()
        this.btnConfirmDelete.value = removeItemId;
      }

      actionsPanel.forEach(nodeItem => {
        const panelId = nodeItem.getAttribute('data-actions-id');
        if (currentItem === panelId) {
          // nodeItem.style.visibility = nodeItem.style.visibility === "visible" ? "hidden" : "visible";
          nodeItem.style.visibility = "visible";
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
    this.formCustomer.classList.add('show');
    const formTitle = querySelector('.form-title', this.formCustomer);
    formTitle.innerHTML = 'Create Customer';
    this.btnSubmit.value = '';
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
    this.formCustomer.classList.remove('show');
  }

  showDeleteCustomerModal = () => {
    this.modalCustomerDel.classList.add('show');
  }

  hideDeleteCustomerModal = () => {
    this.modalCustomerDel.classList.remove('show');
  }

  handleOutsideClick = (event) => {
    if (!this.modalCustomer.contains(event.target)) {
      this.hideCustomerModal();
    }
  }

  getDeleteCustomerId = () => {
    return this.btnConfirmDelete.value;
  }

  handleSubmitDataSuccess = () => {
    this.formCustomer.classList.remove('show');
      this.successSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.successSnackbar.style.visibility = 'hidden';
      }, 3000);
  }

  handleSubmitDataFailed = () => {
    this.errorSnackbar.style.visibility = 'visible';
      setTimeout(() => {
        this.errorSnackbar.style.visibility = 'hidden';
      }, 3000);
  }

}

export default CustomerView;
