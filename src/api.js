import axios from "axios";

export const baseURL = getBaseUrl();

export default function callApi(endpoint, method = "GET", body) {
  return axios({
    method,
    url: `${baseURL}${endpoint}`,
    data: body,
  })
  
}

function getBaseUrl()
{
	return document.getElementsByTagName('server')[0].getAttribute('href');
}
