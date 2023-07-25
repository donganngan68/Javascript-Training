import HttpRequestHelper  from "../helpers/api-request";

const baseUrl = process.env.BASE_URL; // Get key in env

class CustomerModel {
  path = 'customers';

  constructor() {
    this.httpHelper =  new HttpRequestHelper(baseUrl);
  }
  async getListCustomer() {
    const apiRequest = await fetch(`${this.httpHelper.baseUrl}${this.path}`);
    const dataResponse = await apiRequest.json();
    return dataResponse.reverse();
  }

  createCustomer (customer) {
    return this.httpHelper.post(this.path, customer);
  }

  editCustomer (customer) {
    return this.httpHelper.put(this.path, customer.id, customer );
  }

  deleteCustomer(id) {
    return this.httpHelper.delete(this.path, customer.id, id);
  }
};

export default CustomerModel;
