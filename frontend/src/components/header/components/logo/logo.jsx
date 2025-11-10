import { Link } from "react-router-dom";
import styled from "styled-components";

const LargeText = styled.div`
    font-size: 32px;
    font-weight: 600;
    margin-top: 14px;

    @media (max-width: 600px) {
        font-size: 26px;
        bottom: 5px;
    }
    @media (max-width: 400px) {
        font-size: 24px;
    }
    @media (max-width: 300px) {
        font-size: 18px;
        margin-top: 1px;
    }
`;

const SmallText = styled.div`
    font-size: 16px;
    font-weight: bold;
    line-height: 12px;
    padding-top: 10px;

    @media (max-width: 600px) {
        font-size: 14px;
    }
    @media (max-width: 400px) {
        font-size: 12px;
        padding-top: 5px;
    }
    @media (max-width: 300px) {
        font-size: 10px;
    }
`;

const LogoIcon = styled.div`
    font-size: 70px;
    margin-right: 10px;
    padding-bottom: 10px;
    @media (max-width: 600px) {
        font-size: 70px;
    }
    @media (max-width: 400px) {
        font-size: 45px;
        padding-top: 10px;
    }
    @media (max-width: 300px) {
        font-size: 30px;
        padding-top: 5px;
    }
`;

const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 600px) {
        font-size: 14px;
        margin-top: 4px;
    }
    @media (max-width: 400px) {
        font-size: 12px;
    }
    @media (max-width: 300px) {
        font-size: 10px;
    }
`;

const LogoContainer = ({ className }) => (
    <Link className={className} to="/">
        <LogoIcon>
            <i className={"fa fa-code "} aria-hidden="true" />
        </LogoIcon>
        <DivInfo>
            <LargeText>Blog</LargeText>
            <SmallText>Webentwicklung</SmallText>
        </DivInfo>
    </Link>
);
export const Logo = styled(LogoContainer)`
    display: flex;
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

