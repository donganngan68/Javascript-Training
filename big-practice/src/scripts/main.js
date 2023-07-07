import CustomerController from './controllers/customerController';
import CustomerModel from './models/customerModel';
import CustomerView from './views/customerView';

const customerController = new CustomerController(new CustomerView(), new CustomerModel());
customerController.init();
