class CustomerController {
  constructor(view, service) {
    this.view = view;
    this.service = service;
    Object.assign(this, this.view);
  }

  init = () => {
    this.handleRenderTable();
    this.view.init();
    this.modalCustomer.addEventListener('submit', this.handleSubmit);
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

    try {
      await this.service.createCustomer(this.view.getCustomer());
      this.handleRenderTable();
      this.handleSubmitDataSuccess();
    } catch (error) {
      console.error('Error creating customer:', error); // TODO: update later
      this.handleSubmitDataFailed();
    }
  }
}

export default CustomerController;
