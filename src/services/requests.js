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

export const createUptateAjax = async (method, url, body, access_token) => {
  const headers = access_token
    ? {
        headers: {
          Authorization: `${access_token}`,
        },
      }
    : null;

  try {
    const response = await axios[method](url, body, headers);

    return { isLoading: false, data: response.data, errors: "" };
  } catch (er) {
    return { isLoading: false, data: null, errors: er.response.data };
  }
};
