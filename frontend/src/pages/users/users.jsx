import styled from "styled-components";
import { useEffect, useState } from "react";
import { H2, PrivetContent } from "../../components";
import { UserRow, TableRow } from "./components";
import { ROLE } from "../../constants";
import { checkAccess, request } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { openModal, closeModal } from "../../actions";

export const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldDeleteUserList, setShouldDeleteUserList] = useState(false);

  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) return;

    Promise.all([request("/api/users/"), request("/api/users/roles")]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setErrorMessage(usersRes.error || rolesRes.error);
          return;
        }
        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      }
    );
  }, [shouldDeleteUserList]);

  const onUserRemove = (userId) => {
    dispatch(
      openModal({
        text: "Benutzer löschen ?",
        onConfirm: () => {
          if (!checkAccess([ROLE.ADMIN], userRole)) return;
          request(`/api/users/${userId}`, "DELETE")
            .then(() => {
              setShouldDeleteUserList(!shouldDeleteUserList);
            })
            .finally(() => {
              dispatch(closeModal());
            });
        },
        onCancel: () => dispatch(closeModal()),
      })
    );
  };

  return (
    <PrivetContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <div className={className}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">Login</div>
            <div className="register-at-column">Registrierungsdatum</div>
            <div className="role-column">Rolle</div>
          </TableRow>

          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter((role) => Number(role.id) !== ROLE.GUST)}
              onUserRemove={() => {
                onUserRemove(id);
              }}
            />
          ))}
        </div>
      </div>
    </PrivetContent>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto;
  // width: 570px;
  // font-size: 18px;
`;
