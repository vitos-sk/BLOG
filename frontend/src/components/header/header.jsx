import styled from "styled-components";
import { ControlPanel, Logo } from "./components";

const Description = styled.div`
    margin-left: -100px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    padding: 0 0 0 70px;
    @media (max-width: 740px) {
        display: none;
    }

    @media (max-width: 600px) {
        display: none;
    }
    @media (max-width: 400px) {
        display: none;
    }
    @media (max-width: 300px) {
        display: none;
    }
`;

const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Description>
            Web-Technologien <br />
            Code schreiben <br />
            Fehleranalyse
        </Description>

        <ControlPanel />
    </header>
);

export const Header = styled(HeaderContainer)`
    position: fixed;
    left: 100;
    right: 100;
    top: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 40px;
    font-weight: bold;
    width: 1000px;
    height: 100px;
    border-bottom: 1px solid #3f3f3f;
    background-color: #000000;
    z-index: 1;

    @media (max-width: 1020px) {
        width: 100%;

        padding: 5px 25px;
    }
    @media (max-width: 600px) {
        padding: 5px 10px;
        font-size: 12px;
        height: 70px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
        height: 60px;
    }
    @media (max-width: 300px) {
        font-size: 8px;
        padding: 5px;
        height: 50px;
    }
`;
