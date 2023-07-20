class CustomerController {
  constructor(view, service) {
    this.view = view;
    this.service = service;
    Object.assign(this, this.view);
  }

  init = () => {
    this.handleRenderTable();
    this.view.init();
    this.btnConfirmDelete.addEventListener('click', this.handleDeleteCustomer);
    this.formCustomer.addEventListener('submit', this.handleSubmit);
  }

  handleRenderTable = async () => {
    try {
      const data = await this.service.getListCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  handleRenderForm = async () => {
    try {
      const data = await this.service.editCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.view.validateForm(event)) {
      return false;
    }

    const formValue = this.view.getCustomer();

    try {
      if (formValue.id.length > 0) {
        await this.service.editCustomer(formValue);
      } else {
        await this.service.createCustomer(formValue);
      }
      this.handleRenderTable();
      this.view.handleSubmitDataSuccess();
    } catch (error) {
      console.error('Error submit form customer:', error); // TODO: update later
      this.view.handleSubmitDataFailed();
    }
  }

  handleDeleteCustomer = async() => {
    const id = this.getDeleteCustomerId();
    try {
      await this.service.deleteCustomer(id);
      this.handleRenderTable();
    } catch (error) {
      console.error('Error delete customer:', error); // TODO: update later
    }
    this.hideDeleteCustomerModal();
  }
}

export default CustomerController;
