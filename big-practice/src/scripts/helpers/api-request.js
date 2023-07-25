class ApiRequest {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    console.log(baseUrl)
  }

  get(path, id) {
    return this.sendRequest(`${path}`, 'GET', data);
  }

  post(path, data) {
    return this.sendRequest(`${path}`, 'POST', data );
  }

  put(path, id, data) {
    return this.sendRequest(`${path}/${id}`, 'PUT', data );
  }

  delete(path, id) {
    return this.sendRequest(`${path}/${id}`, 'DELETE', data);
  }

  async sendRequest (path, method, body) {
    const url = `${this.baseUrl}/${path}`;
    const response = await fetch(url, {
      method,
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      // return response.json();
      return await response.json();
    }
      throw new Error('Error creating customer');
  }
}

export default ApiRequest;
