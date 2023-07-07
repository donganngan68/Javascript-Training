import CustomerController from './controllers/customerController';
import CustomerService from './services/customerService';
import CustomerView from './views/customerView';

const customerController = new CustomerController(new CustomerView(), new CustomerService());
customerController.init();
