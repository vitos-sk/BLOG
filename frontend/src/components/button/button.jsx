import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ children, className, width, height, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    width: ${({ width = "100%" }) => width};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding: 5px 10px;
    height: ${({ height }) => height};
    color: #ffffff;
    border: 1px solid #292828;
    box-shadow: 0px 2px 12px rgba(83, 83, 83, 0.2);
    border-radius: 5px;
    background-color: ${({ disabled }) => (disabled ? "#101010" : "#000000")};

    &:hover {
        cursor: pointer;
        cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
        background-color: ${({ disabled }) => (disabled ? "none" : "#292828")};
    }
`;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
};
