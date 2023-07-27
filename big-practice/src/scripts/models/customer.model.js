import ApiRequest from '../helpers/api-request';

const baseUrl = process.env.BASE_URL // Get key in env

class CustomerModel {
  path = 'customers';

  constructor() {
    this.httpHelper = new ApiRequest(baseUrl);
  }

  async getListCustomer() {
    const dataResponse = await this.httpHelper.get(this.path);
    return dataResponse.reverse();
  }

  createCustomer(customer) {
    return this.httpHelper.post(this.path, customer);
  }

  editCustomer(customer) {
    return this.httpHelper.put(this.path, customer.id, customer);
  }

  deleteCustomer(id) {
    return this.httpHelper.delete(this.path, id);
  }
}

export default CustomerModel;
