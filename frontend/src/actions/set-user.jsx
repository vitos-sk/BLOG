import { ACTION_TYPE } from "./action-type";

export const setUser = (user) => {
  const normalized = {
    ...user,
    roleId: user.roleId ?? user.role,
  };
  return {
    type: ACTION_TYPE.SET_USER,
    payload: normalized,
  };
};
