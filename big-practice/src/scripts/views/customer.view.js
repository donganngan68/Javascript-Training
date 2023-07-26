import imgDot from "../../assets/images/dot.png";
import { getElementById, querySelector, querySelectorAll } from "../helpers";
import { MESSAGES } from "../constants/messages";

class CustomerView {
  constructor() {
    this.selectedOptionSort = querySelector('.sort-type');
    this.dropdownItems = querySelectorAll('.dropdown-item', this.dropDownContent);
    this.imgDropdown = querySelector('.dropdown');
    this.dropDownContent = querySelector('.dropdown-content');
    this.searchInput = querySelector('.search-text');
    this.currentPagePlaceholder = querySelector('.currentPagePlaceholder');
    this.totalPagesPlaceholder = querySelector('.totalPagesPlaceholder');
    this.prevPageButton = querySelector('.prevPageButton');
    this.nextPageButton = querySelector('.nextPageButton');
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
    this.overlay = querySelector('.overlay');

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
    this.iconCancelDelete.addEventListener('click', this.hideDeleteCustomerModal);
    this.btnCancelDelete.addEventListener('click', this.hideDeleteCustomerModal);
    this.btnConfirmDelete.addEventListener('click', this.bindHandleDeleteCustomer);
    this.prevPageButton.addEventListener('click', this.handPrevPageButton);
    this.nextPageButton.addEventListener('click', this.handNextPageButton);
    this.handleSearch();
    this.imgDropdown.addEventListener('click', this.handDropDownIcon);
    this.currentPage = 1;
    this.itemsPerPage = 8;
    this.customerList = undefined;
    this.totalPages = undefined;
  }

  handleSearch = () => {
    this.searchInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.handleSearchInput();
      }
    });
  }

  handDropDownIcon = () => {
    this.dropDownContent.classList.toggle('active');
  }

  handDropDownIconAction = () => {
    this.dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        const selectedSortBy = item.dataset.sortby;
        this.selectedOptionSort.textContent = `${selectedSortBy.charAt(0).toUpperCase() + selectedSortBy.slice(1)}`;
        if (selectedSortBy) {
          this.sortData(selectedSortBy);
          this.renderData(this.customerList);
        }
        this.dropDownContent.classList.remove('active');
      });
    });
  }

  sortData(sortBy) {
    this.customerList.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'company') {
        return a.company.localeCompare(b.company);
      } else if (sortBy === 'phone') {
        return a.phone.localeCompare(b.phone);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      } else if (sortBy === 'country') {
        return a.country.localeCompare(b.country);
      }
    });
  }

  handleSearchInput = () => {
    const searchTerm = this.searchInput.value.trim().toLowerCase();
    const filteredList = this.customerList.filter((customer) => {
      // Convert all fields to lowercase before comparison.
      const { name, company, phone, email, country } = customer;
      return (
        name.toLowerCase().includes(searchTerm) ||
        company.toLowerCase().includes(searchTerm) ||
        phone.toLowerCase().includes(searchTerm) ||
        email.toLowerCase().includes(searchTerm) ||
        country.toLowerCase().includes(searchTerm)
      );
    });
    this.renderData(filteredList);
  }

  handPrevPageButton = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderData(this.customerList);
      this.updatePaginationPlaceholders();
    }
  }

  handNextPageButton = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderData(this.customerList);
      this.updatePaginationPlaceholders();
    }
  }

  updatePaginationPlaceholders() {
    this.currentPagePlaceholder.textContent = this.currentPage;
    this.totalPagesPlaceholder.textContent = this.totalPages;
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
      this.nameError.textContent = `${MESSAGES.NAME_REQUIRED}`;
      this.nameInput.classList.add('valid-check');
    } else if (!this.nameInput.value.match(nameRegex)) {
      isValid = false;
      this.nameError.textContent = `${MESSAGES.INVALID_NAME}`;
      this.nameInput.classList.add('valid-check');
    } else {
      this.nameError.textContent = '';
      this.nameInput.classList.remove('valid-check');
    }

    if (this.companyInput.value.trim() === '') {
      isValid = false;
      this.companyError.textContent = `${MESSAGES.COMPANY_REQUIRED}`;
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
    const phoneRegex = /^0[1-9]\d{8}$/;

    if (this.phoneInput.value.trim() === '') {
      isValid = false;
      this.phoneError.textContent = `${MESSAGES.PHONE_REQUIRED}`;
      this.phoneInput.classList.add('valid-check');
    } else if (!this.phoneInput.value.match(phoneRegex)) {
      isValid = false;
      this.phoneError.textContent = `${MESSAGES.INVALID_PHONE}`;
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

    if (this.emailInput.value.trim() === '') {
      isValid = false;
      this.emailError.textContent = `${MESSAGES.EMAIL_REQUIRED}`;
      this.emailInput.classList.add('valid-check');
    } else if (!this.emailInput.value.match(emailRegex)) {
      isValid = false;
      this.emailError.textContent = `${MESSAGES.INVALID_EMAIL}`;
      this.emailInput.classList.add('valid-check');
    } else {
      this.emailError.textContent = '';
      this.emailInput.classList.remove('valid-check');
    }

    if (this.country.value === '') {
      isValid = false;
      this.countryError.textContent = `${MESSAGES.COUNTRY_REQUIRED}`;
      this.country.classList.add('valid-check');
    } else {
      this.countryError.textContent = '';
      this.country.classList.remove('valid-check');
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
    this.overlay.style.display = 'none';
    this.modalCustomerDel.classList.remove('show');
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
    const customerListExists = this.customerList !== null && this.customerList !== undefined;
    if (!customerListExists) {
      this.customerList = list;
    }
    this.totalPages = Math.ceil(list.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToRender = list.slice(startIndex, endIndex);
    let result = ''
    itemsToRender.map(
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
      }
    )
    this.handleTableRowAction(list);
    this.handDropDownIconAction();
  }

  initializeEditForm = (customer) => {
    const { name, company, phone, email, country, id, status } = customer;
    this.nameInput.value = name;
    this.companyInput.value = company;
    this.phoneInput.value = phone;
    this.emailInput.value = email;
    this.countrySelect.value = country;
    this.btnSubmit.value = id;
    status === false ? this.toggleInput.removeAttribute('checked') : this.toggleInput.setAttribute('checked', 'checked');
  }

  handleTableRowAction = (customers) => {
    if (!customers?.length) {
      return;
    }

    this.table.addEventListener('click', (e) => {
      const currentItem = e.target?.getAttribute('data-option-id');

      const editItemId = e.target?.getAttribute('data-edit-id');

      const removeItemId = e.target?.getAttribute('data-remove-id');

      const isKeepActionsPanel = !!editItemId || !!removeItemId;

      // TODO: Refactor this
      const actionsPanel = querySelectorAll('div[data-actions-id]');

      if (editItemId) {
        this.formCustomer.classList.add('show');
        this.overlay.style.display = 'block';
        const formTitle = querySelector('.form-title', this.formCustomer);
        formTitle.innerHTML = 'Update Customer';
        customers.forEach(item => {
          item.id === editItemId && this.initializeEditForm(item);
        })

        const currentPanel = document.querySelector(`div[data-actions-id="${editItemId}"]`);
        currentPanel.style.visibility = "hidden";
      }

      if (removeItemId) {
        this.modalCustomerDel.classList.add('show');
        this.overlay.style.display = 'block';
        this.btnConfirmDelete.value = removeItemId;

        const currentPanel = document.querySelector(`div[data-actions-id="${removeItemId}"]`);
        currentPanel.style.visibility = "hidden";
      }

      actionsPanel.forEach(nodeItem => {
        const panelId = nodeItem.getAttribute('data-actions-id');
        if (currentItem === panelId) {
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
    this.overlay.style.display = 'block';
    const formTitle = querySelector('.form-title', this.formCustomer);
    formTitle.innerHTML = 'Create Customer';
    this.btnSubmit.value = '';
  }

  bindHandleSubmit = (handler) => {
    this.formCustomer.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.validateForm(event)) {
        return;
      }
      handler(this.getCustomer());
    });
  }

  bindHandleDeleteCustomer = (handler) => {
    this.btnConfirmDelete.addEventListener('click', () => {
      handler(this.btnConfirmDelete.value)
    })
  }

  hideDeleteCustomerModal = () => {
    this.modalCustomerDel.classList.remove('show');
  }

  getDeleteCustomerId = () => {
    return this.btnConfirmDelete.value;
  }
}

export default CustomerView;
