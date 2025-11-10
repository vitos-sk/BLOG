import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon, Input } from "../../../../components";

const SearchContainer = ({ className, searchPhrase, onChange }) => (
    <div className={className}>
        <Input
            type="text"
            placeholder="Search..."
            value={searchPhrase}
            onChange={onChange}
        />
        <Icon id="fa-search" size="18px" onClick={() => {}} />
    </div>
);

export const Search = styled(SearchContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 40px;
    margin: 20px auto;
    padding: 0 10px;
    border: 1px solid #313131;
    border-radius: 20px;

    input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 14px;
        padding: 8px 10px;
        background: transparent;
        position: relative;
        top: 5px;
    }

    ${Icon} {
        cursor: pointer;
        color: #c8c6c6;
        transition: color 0.2s;
    }

    ${Icon}:hover {
        color: #555555;
    }
`;

Search.propTypes = {
    searchPhrase: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
