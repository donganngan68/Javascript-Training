class CustomerModel {
  constructor() {
    this.data = [];
  }

  fetchData() {
    return fetch('https://64a67a49096b3f0fcc7fda51.mockapi.io/ngando/customers')
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        return data;
      });
  }

  getData() {
    return this.data;
  }
}

export default CustomerModel;
