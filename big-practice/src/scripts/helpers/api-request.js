class ApiRequest {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path) {
    return this.sendRequest(`${path}`, 'GET');
  }

  post(path, data) {
    return this.sendRequest(`${path}`, 'POST', data );
  }

  put(path, id, data) {
    return this.sendRequest(`${path}/${id}`, 'PUT', data );
  }

  delete(path, id) {
    return this.sendRequest(`${path}/${id}`, 'DELETE');
  }

  async sendRequest (path, method, body) {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      return await response.json();
    }
      throw new Error('Error creating customer');
  }
}

export default ApiRequest;
