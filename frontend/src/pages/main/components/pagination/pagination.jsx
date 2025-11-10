// src/pages/main/components/pagination.jsx
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "../../../../components";

const PaginationContainer = ({ className, page, setPage, totalPages }) => (
    <div className={className}>
        <Button disabled={page === 1} onClick={() => setPage(1)}>
            Anfang
        </Button>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Zurück
        </Button>
        <div className="current-page">
            Seite: {page} / {totalPages}
        </div>
        <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
        >
            Weiter
        </Button>
        <Button
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
        >
            Ende
        </Button>
    </div>
);

export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    margin: 0 0 45px 0;
    padding: 0 20px;

    & > button {
        margin: 0 5px;
        padding: 0 10px;
    }

    & .current-page {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        font-weight: 600;
        color: #4f4f4f;
        border: 1px solid #292828;
        border-radius: 5px;
        padding: 0 10px;
        white-space: nowrap;
    }
`;

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
};
