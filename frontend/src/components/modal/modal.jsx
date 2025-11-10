import styled from "styled-components";
import { Button } from "../button/button";
import { useSelector } from "react-redux";
import {
    selectModalIsOpen,
    selectModalText,
    selectModalOnConfirm,
    selectModalOnCancel,
} from "../../selectors";

//

const ModalContainer = ({ className }) => {
    const isOpen = useSelector(selectModalIsOpen);
    const text = useSelector(selectModalText);
    const onConfirm = useSelector(selectModalOnConfirm);
    const onCancel = useSelector(selectModalOnCancel);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={className}>
            <div className="overlay">
                <div className="box">
                    <h3>{text}</h3>
                    <div className="buttons">
                        <Button onClick={onConfirm}>Ja</Button>
                        <Button onClick={onCancel}>Abbrechen</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const Modal = styled(ModalContainer)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    & .overlay {
        position: absolute;
    }

    & .box {
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
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px); /* для Safari */
    }

    & .buttons {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        padding: 15px 10px;
        justify-content: space-between;
        width: 100%;
        color: #fff;
    }

    & .buttons:hover {
        color: #000000;
    }
`;
