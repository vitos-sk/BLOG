import { useEffect, useState } from "react";
import styled from "styled-components";

const WeatherContainer = styled.div`
    display: flex;
    font-weight: bold;
    padding: 10px 12px;
    border-radius: 10px;
    flex-direction: column;
    background-color: #161616;
    & > div {
        cursor: default;
    }
    @media (max-width: 600px) {
        font-size: 12px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
    }
    @media (max-width: 300px) {
        font-size: 8px;
    }
`;
const NumContainer = styled.span`
    font-size: 18px;
    color: #5cc05a;
    @media (max-width: 600px) {
        font-size: 16px;
    }
    @media (max-width: 400px) {
        font-size: 14px;
    }
    @media (max-width: 300px) {
        font-size: 12px;
    }
`;

const FooterContainer = ({ className }) => {
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [weather, setWether] = useState("");

    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Freiburg, DE&units=metric&lang=de&appid=1498c247df9d6e8abd9b63620a6d51e2"
        )
            .then((data) => data.json())
            .then(({ name, main, weather }) => {
                setCity(name);
                setTemperature(Math.trunc(main.temp));
                setWether(weather[0].description);
            });
    }, []);

    return (
        <div className={className}>
            <div>
                <div>Blog Webentwicklung</div>
                <div>web@entwickler.de</div>
            </div>
            <WeatherContainer>
                <div>
                    {city}{" "}
                    <span style={{ color: "yellow" }}>
                        {new Date().toLocaleString("de-DE", {
                            day: "numeric",
                            timeZone: "Europe/Berlin",
                        })}
                    </span>{" "}
                    {new Date().toLocaleString("de-DE", {
                        month: "long",
                        timeZone: "Europe/Berlin",
                    })}
                </div>

                <div>
                    <NumContainer>{temperature}</NumContainer>°C, {weather}
                </div>
            </WeatherContainer>
        </div>
    );
};

export const Footer = styled(FooterContainer)`
    // position: fixed;
    // left: 100;
    // right: 100;
    // bottom: 0;
    // z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 40px;
    font-weight: bolt;
    width: 1000px;
    height: 90px;
    border-top: 1px solid #3f3f3f;
    background-color: #000000;
    box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.25);
    @media (max-width: 1020px) {
        width: 100%;
        padding: 5px 20px;
    }
    @media (max-width: 600px) {
        font-size: 12px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
    }
    @media (max-width: 300px) {
        font-size: 8px;
    }
`;
/*---------------------------------*/
