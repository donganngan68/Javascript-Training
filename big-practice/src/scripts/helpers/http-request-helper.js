class HttpRequestHelper {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, id) {
    return this.sendRequest(`${path}/${id}`, { method: 'GET' });
  }

  post(path, data) {
    return this.sendRequest(path, { method: 'POST', body: data });
  }

  put(path, id, data) {
    return this.sendRequest(`${path}/${id}`, 'PUT', data );
  }

  delete(path, id) {

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

export default HttpRequestHelper;
