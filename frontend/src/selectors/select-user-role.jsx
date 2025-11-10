import { createSelector } from "reselect";

const selectUserState = (state) => state.user;

export const selectUserRole = createSelector([selectUserState], (user) => {
  const raw = user?.roleId ?? user?.role ?? user?.role_id ?? null;
  if (raw === null || raw === undefined || raw === "") {
    return null;
  }

  const num = Number(raw);
  return Number.isNaN(num) ? null : num;
});
