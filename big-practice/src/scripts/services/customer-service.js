import { BASE_URL } from '../constants/url';

class CustomerService {
  getListCustomer = async () => {
    const apiRequest = await fetch(`${BASE_URL}customers`);
    const dataReponse = await apiRequest.json();
    return dataReponse;
  }

  createCustomer = async (customer) => {
    // Http request helper
    const response = await fetch(`${BASE_URL}customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }

  editCustomer = async (customer) => {
    const response = await fetch(`${BASE_URL}customers/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }

  deleteCustomer = async (id) => {
    const response = await fetch(`${BASE_URL}customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }
};

export default CustomerService;
