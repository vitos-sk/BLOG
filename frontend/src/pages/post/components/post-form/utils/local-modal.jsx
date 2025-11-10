import PropTypes from "prop-types";
import styled from "styled-components";

const LocalModalContainer = ({ className, onClickc }) => {
    return (
        <div className={className}>
            <div className="overlay" />
            <div className="modal-content">
                <h2>Nicht alle Felder sind ausgefüllt</h2>
                <button className="confirm" onClick={onClickc}>
                    Ja
                </button>
            </div>
        </div>
    );
};

export const LocalModal = styled(LocalModalContainer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999; /* поверх всего */
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
    }

    .modal-content {
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        padding: 20px;
        border-radius: 12px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px); /* размытие фона */
        -webkit-backdrop-filter: blur(10px); /* для Safari */

        .confirm {
            margin-top: 10px;
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            background: #000000;
            border: 1px solid #666666;
            color: #fff;
            cursor: pointer;
        }

        .confirm:hover {
            color: #000000;
            border: 1px solid #000000;
            background: #414141;
        }
    }
`;

LocalModal.propTypes = {
    onClickc: PropTypes.func.isRequired,
};
