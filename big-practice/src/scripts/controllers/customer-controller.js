class CustomerController {
  constructor(view, service) {
    this.view = view;
    this.service = service;
  }

  init = () => {
    this.handleRenderTable();
    this.view.init();
    this.view.bindHandleSubmit(this.handleSubmit)
    this.view.bindHandleDeleteCustomer(this.handleDeleteCustomer)
    // this.btnConfirmDelete.addEventListener('click', this.handleDeleteCustomer);
    // this.formCustomer.addEventListener('submit', this.handleSubmit);
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

  handleSubmit = async (data) => {
    try { 
      if (data.id.length > 0) {
        await this.service.editCustomer(data);
      } else {
        await this.service.createCustomer(data);
      }
      this.handleRenderTable();
      this.view.handleSubmitDataSuccess();
    } catch (error) {
      console.error('Error submit form customer:', error); // TODO: update later
      this.view.handleSubmitDataFailed();
    }
  }

  handleDeleteCustomer = async(id) => {
    try {
      await this.service.deleteCustomer(id);
      this.handleRenderTable();
    } catch (error) {
      console.error('Error delete customer:', error); // TODO: update later
    }
    this.view.hideDeleteCustomerModal();
  }
}

export default CustomerController;
