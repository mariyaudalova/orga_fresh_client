import axios from "axios";

export const getAjax = async (url, headers) => {
  try {
    const response = await axios.get(url, headers);
    return { isLoading: false, data: response.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.message };
  }
};

export const deleteAjax = async (url) => {
  try {
    const response = await axios.delete(url);
    return { isLoading: false, data: response.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.message };
  }
};

export const createUptateAjax = async (method, url, body) => {
  try {
    const response = await axios[method](url, body);
    return { isLoading: false, data: response.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.message };
  }
};
