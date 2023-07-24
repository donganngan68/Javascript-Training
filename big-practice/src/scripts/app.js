import CustomerController from "./controllers/customer.controller";
import CustomerView from "./views/customer.view";
import CustomerModel from './models/customer.model';

export class App {
    constructor() {}

    startApp() {
        // Init the customer controller
      const customerController = new CustomerController(new CustomerView(), new CustomerModel());

      customerController.init();
    }
}
