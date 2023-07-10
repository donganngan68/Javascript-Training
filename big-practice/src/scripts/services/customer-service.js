import {BASE_URL} from "../../constants/url";

class CustomerService {
  getListCustomer = async () => {
    const apiRequest = await fetch(`${BASE_URL}customers`);
    const dataReponse = await apiRequest.json();
    return dataReponse;
  };
}

export default CustomerService;
