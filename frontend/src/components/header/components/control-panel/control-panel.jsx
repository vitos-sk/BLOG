import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../../../actions";
import { Icon } from "../../../../components";
import { ROLE } from "../../../../constants";
import { selectUserLogin, selectUserRole } from "../../../../selectors";
import { checkAccess } from "../../../../utils";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 16px;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
    gap: 8px;
  }
  @media (max-width: 300px) {
    font-size: 8px;
  }
`;

const ButtonMy = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 70px;
  height: 25px;
  color: #fff;
  background-color: #242424;
  border: 1px solid #ffffff;
  box-shadow: 0px 2px 12px rgba(172, 172, 172, 0.2);
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: #323232;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
  @media (max-width: 300px) {
    font-size: 10px;
  }
`;
const UserName = styled.div`
  color: #7b7b7b;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
  @media (max-width: 300px) {
    font-size: 10px;
  }
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUST ? (
          <ButtonMy>
            <Link to="/login">Войти</Link>{" "}
          </ButtonMy>
        ) : (
          <>
            <UserName>{login}</UserName>
            <Icon id="fa-sign-out" onClick={onLogout} />
          </>
        )}
      </RightAligned>
      <RightAligned>
        <Icon id="fa-arrow-circle-left" onClick={() => navigate(-1)} />
        {isAdmin && (
          <>
            <Link to="/post/create">
              <Icon id="fa fa-file-text" />
            </Link>
            <Link to="/users">
              <Icon id="fa fa-users" />
            </Link>
          </>
        )}
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  margin-bottom: 10px;
`;
