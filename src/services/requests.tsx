import axios from "axios";

export const getAjax = async (url: string, headers?: Object) => {
  try {
    const response = await axios.get(url, headers);
    return { isLoading: false, data: response.data, errors: "" };
  } catch (er: any) {
    return { isLoading: false, data: null, errors: er.message };
  }
};

export const deleteAjax = async (url: string) => {
  try {
    const response = await axios.delete(url);
    return { isLoading: false, data: response.data, errors: "" };
  } catch (er: any) {
    return { isLoading: false, data: null, errors: er.message };
  }
};

export const createUptateAjax = async (
  method: string,
  url: string,
  body: any,
  access_token?: string
) => {
  const headers = access_token
    ? {
        headers: {
          Authorization: `${access_token}`,
        },
      }
    : null;

  try {
    const response = await (axios as any)[method](url, body, headers);

    return { isLoading: false, data: response.data, errors: "" };
  } catch (er: any) {
    return { isLoading: false, data: null, errors: er.response.data };
  }
};
