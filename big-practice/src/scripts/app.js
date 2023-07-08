import CustomerController from "./controllers/customerController";
import CustomerView from "./views/customerView";
import CustomerService from './services/customerService';

export class App {
    constructor() {}

    startApp() {
        // Init the customer controller
        const customerController = new CustomerController(new CustomerView(), new CustomerService());
       
        customerController.init();
    }
}
