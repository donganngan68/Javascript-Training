class CustomerController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.model.fetchData().then((data) => {
      this.view.renderData(data);
    });
  }
}

export default CustomerController;
