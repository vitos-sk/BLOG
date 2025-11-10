import styled from "styled-components";
import { PROP_TYPE } from "../../constants";
//
const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

export const Error = ({ error }) => {
    if (!error) return null;

    return (
        <Div>
            <div>
                {typeof error === "string"
                    ? error
                    : error?.message ?? String(error)}
            </div>
        </Div>
    );
};

Error.propTypes = {
    error: PROP_TYPE.ERROR,
};
