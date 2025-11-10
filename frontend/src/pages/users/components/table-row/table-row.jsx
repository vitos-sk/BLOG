import PropTypes from "prop-types";
import { styled } from "styled-components";
//

const TableRowContainer = ({ className, children }) => {
    return <div className={className}>{children}</div>;
};
export const TableRow = styled(TableRowContainer)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: ${({ border }) => (border ? "1px solid #5f5f5f" : "none")};
    box-shadow: ${({ shadow }) =>
        shadow ? "0px 2px 12px rgba(255, 255, 255, 0.2)" : "none"};
    border-radius: 15px;

    & > div {
        display: flex;
        padding: 0 10px;
    }

    & .login-column {
        width: 172px;
    }
    & .register-at-column {
        width: 213px;
    }
    & .role-column {
        width: auto;
    }

    @media (min-width: 1024px) {
        font-size: 16px;
    }

    @media (max-width: 1023px) and (min-width: 768px) {
        font-size: 14px;

        & .login-column {
            width: 150px;
        }
        & .register-at-column {
            width: 180px;
        }
    }

    @media (max-width: 620px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 8px;
        font-size: 12px;

        & > div {
            width: 100%;
            padding: 4px 0;
        }

        & .login-column,
        & .register-at-column,
        & .role-column {
            width: 100%;
        }
    }
`;

TableRow.propTypes = {
    children: PropTypes.node.isRequired,
};
