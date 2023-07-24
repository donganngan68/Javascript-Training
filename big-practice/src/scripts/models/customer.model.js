import HttpRequestHelper from "../helpers/http-request-helper";
const headerConfig = {
  'Content-Type': 'application/json',
}

class CustomerModel {
  path = 'customers';

  constructor(httpRequestHelper) {
    this.httpRequestHelper = httpRequestHelper;
  }

  getListCustomer = async () => {
    const apiRequest = await fetch(`${process.env.BASE_URL}customers`);
    return await apiRequest.json();
  }

  createCustomer = async (customer) => {
    const response = await fetch(`${process.env.BASE_URL}customers`, {
      method: 'POST',
      headers: headerConfig,
      body: JSON.stringify(customer),
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }

  editCustomer (customer) {
    return this.httpRequestHelper.put(this.path, customer.id, customer );
  }

  deleteCustomer = async (id) => {
    const response = await fetch(`${process.env.BASE_URL}this.path/${id}`, {
      method: 'DELETE',
      headers: headerConfig,
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }
};

export default CustomerModel;
