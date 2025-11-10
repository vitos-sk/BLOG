import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal, openModal, removePostAsync } from "../../../../actions";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";
import { checkAccess } from "../../../../utils";
import { Icon } from "../../../../components";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);

  const onPostRemove = (id) => {
    dispatch(
      openModal({
        text: "Artikel löschen ?",
        onConfirm: () => {
          dispatch(removePostAsync(id)).then(() => navigate("/")),
            dispatch(closeModal());
        },
        onCancel: () => dispatch(closeModal()),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && (
          <Icon id="fa-calendar-o" margin_r="10px" size="16px" inactiv={true} />
        )}
        <div className="date">{publishedAt}</div>
      </div>

      {isAdmin && (
        <div className="buttons">
          {editButton}
          {publishedAt && (
            <Icon
              id="fa-trash-o"
              size="22px"
              onClick={() => onPostRemove(id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  margin: -20px 0 20px;
  font-size: 12px;

  & .published-at {
    display: flex;
    position: relative;
    color: #afafaf;
  }

  & .buttons {
    display: flex;
    position: relative;
    top: -6px;
  }
`;

SpecialPanel.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  editButton: PropTypes.node.isRequired,
};
