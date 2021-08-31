import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import { loginCreator } from "../../state/user/actionsCreators";

/*
interface UserAction {
  payload: User;
  type: "LOGIN";
}
*/

export const getAuthorizedUser = async (
  access_token: string,
  dispatch: any
) => {
  const getUserUrl = `${apiUrl}/customers/customer`;
  const getCustomer = await getAjax(getUserUrl, {
    headers: {
      Authorization: `${access_token}`,
    },
  });
  const { isLoading, errors, data } = getCustomer;
  dispatch(
    loginCreator({
      isLoading: isLoading,
      error: errors,
      data: { token: access_token, ...data },
    })
  );
};
