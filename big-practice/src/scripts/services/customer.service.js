class CustomerService {
  constructor() {
    this.data = [];
  }

  getListCustomer = async () => {
    const apiRequest = await fetch('https://64a67a49096b3f0fcc7fda51.mockapi.io/ngando/customers');
    const dataReponse = await apiRequest.json();
    return dataReponse;
  };

  getData() {
    return this.data;
  }
}

export default CustomerService;
