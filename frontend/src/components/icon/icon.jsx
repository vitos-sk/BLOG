import styled from "styled-components";
import PropTypes from "prop-types";

const IconContainer = ({ className, id, onClick }) => (
    <div className={className} onClick={onClick}>
        <i className={`fa ${id} `} aria-hidden="true"></i>
    </div>
);

export const Icon = styled(IconContainer)`
    font-size: ${({ size = "24px" }) => size};
    margin-right: ${({ margin_r = "0" }) => margin_r};

    color: ${({ disabled }) => (disabled ? "#727272" : "#ffffff")};

    &:hover {
        cursor: ${({ inactiv }) => (inactiv ? "default" : "pointer")};
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

Icon.propTypes = {
    id: PropTypes.string.isRequired,
};
