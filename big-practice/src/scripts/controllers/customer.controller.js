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
      this.view.customerList = data;
    } catch (error) {
      // TODO: update later
    }
  }

  handleRenderForm = async () => {
    try {
      const data = await this.model.editCustomer();
      this.view.renderData(data);
    } catch (error) {
      // TODO: update later
    }
  }

  handleSubmit = async (data) => {
    try {
      if (data.id) {
        await this.model.editCustomer(data);
      } else {
        const { id, ...rest } = data;
        await this.model.createCustomer(rest);
      }
      this.handleRenderTable();
      this.view.handleSubmitDataSuccess();
    } catch (error) {
      // TODO: update later
      this.view.handleSubmitDataFailed();
    }
  }

  handleDeleteCustomer = async (id) => {
    this.view.hideDeleteCustomerModal();
    try {
      await this.model.deleteCustomer(id);
      this.handleRenderTable();
    } catch (error) {
      // TODO: update later
    }
  }
}

export default CustomerController;
