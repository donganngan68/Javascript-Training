class CustomerController {
  constructor(view, service) {
    this.view = view
    this.service = service
  }

  init = () => {
    this.handleRenderTable()
    this.form = document.querySelector('.modal-customer');
    this.form.addEventListener('submit', this.handleSubmit);
  }

  handleRenderTable = async () => {
    try {
      const data = await this.service.getListCustomer();
      this.view.renderData(data);
    } catch (error) {
      console.error('Error fetching data:', error);// TODO: update later
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.service.validateForm(event)) {
      return false;
    }
    
    const name = this.form.querySelector('#name').value;
    const company = this.form.querySelector('#company').value;
    const phone = this.form.querySelector('#phone').value;
    const email = this.form.querySelector('#email').value;
    const country = this.form.querySelector('#country').value;
    const status = this.form.querySelector('.on-off-input').checked;

    const customer = {
      name,
      company,
      phone,
      email,
      country,
      status,
    }

    try {
      await this.service.createCustomer(customer);
      this.form.reset();
      this.form.style.display = 'none';
      this.handleRenderTable();
    } catch (error) {
      console.error('Error creating customer:', error); // TODO: update later
    }
  }
}

export default CustomerController;