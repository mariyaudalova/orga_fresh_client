import axios from "axios";

export const getAjax = async (url, headers) => {
  try {
    const request = await axios.get(url, headers);
    return { isLoading: false, data: request.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.message };
  }
};

export const deleteAjax = async (url) => {
  try {
    const request = await axios.delete(url);
    return { isLoading: false, data: request.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.message };
  }
};

export const createUptateAjax = async (method, url, body) => {
  try {
    const request = await axios[method](url, body);
    return { isLoading: false, data: request.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.message };
  }
};
