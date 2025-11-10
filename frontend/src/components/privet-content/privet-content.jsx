// import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { checkAccess } from "../../utils";
import { Error } from "../error/error";
import { ERROR, PROP_TYPE } from "../../constants";
import PropTypes from "prop-types";

export const PrivetContent = ({ children, access, serverError = null }) => {
    const userRole = useSelector(selectUserRole);

    const accessError = checkAccess(access, userRole)
        ? null
        : ERROR.ACCESS_DENIED;

    const error = serverError || accessError;

    return error ? <Error error={error} /> : children;
};

PrivetContent.propTypes = {
    children: PropTypes.node.isRequired,
    access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    serverError: PROP_TYPE.ERROR,
};
