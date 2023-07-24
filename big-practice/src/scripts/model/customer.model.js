const headerConfig = {
  'Content-Type': 'application/json',
}

class CustomerService {
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

  editCustomer = async (customer) => {
    const response = await fetch(`${process.env.BASE_URL}customers/${customer.id}`, {
      method: 'PUT',
      headers: headerConfig,
      body: JSON.stringify(customer),
    })
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error creating customer');
    }
  }

  deleteCustomer = async (id) => {
    const response = await fetch(`${process.env.BASE_URL}customers/${id}`, {
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

export default CustomerService;
