class CustomerController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init = () => {
    this.handleRenderTable();
    this.view.init();
    this.view.bindHandleSubmit(this.handleSubmit);
    this.view.bindHandleDeleteCustomer(this.handleDeleteCustomer);
  }

  handleRenderTable = async () => {
    try {
      const data = await this.model.getListCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  handleRenderForm = async () => {
    try {
      const data = await this.model.editCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  handleSubmit = async (data) => {
    try {
      if (data.id.length > 0) {
        await this.model.editCustomer(data);
      } else {
        const {...rest} = data
        await this.model.createCustomer(rest);
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
