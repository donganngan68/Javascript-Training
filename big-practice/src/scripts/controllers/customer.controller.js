class CustomerController {
  constructor(view, service) {
    this.view = view;
    this.service = service;
  }

  init() {
    this.handleRenderTable();
  }

  handleRenderTable = async () => {
    try {
      const data = await this.service.getListCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error); // TODO: update later
    }
  };
}

export default CustomerController;
