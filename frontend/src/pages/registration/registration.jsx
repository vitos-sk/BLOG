import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useStore } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { setUser } from "../../actions";
import { Button, H2, Input, AuthFormError } from "../../components";
import { useResetAuthForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils";

//

const regFormSchema = yup.object({
    login: yup
        .string()
        .required("Заполните Логин")
        .matches(
            /^[A-Za-z0-9@._-]+$/,
            "Логин должен состоять из латинских букв, цифр и символов . _ - @"
        )
        .min(3, "Логин должен быть не менее 3 символов")
        .max(30, "Логин должен быть не более 30 символов"),
    password: yup
        .string()
        .required("Заполните Пароль")
        .matches(
            /^[A-Za-z0-9#%_]+$/,
            "Пароль должен состоять из латинских букв, цифр или символов # % _"
        )
        .min(6, "Пароль должен быть не менее 6 символов")
        .max(30, "Пароль должен быть не более 30 символов"),
    confirmPassword: yup
        .string()
        .required("Подтвердите Пароль")
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

const StyledLink = styled(Link)`
    text-align: center;
    margin: 20px;
    text-decoration: underline;
    color: #fff;

    &:hover {
        cursor: pointer;
    }
`;

export function RegistrationContainer({ className }) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(regFormSchema),
    });

    const [serverError, setServerError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useResetAuthForm(reset);

    const onSubmit = ({ login, password }) => {
        request("/api/register", "POST", { login, password }).then(
            ({ error, user }) => {
                if (error) {
                    setServerError(`Ошибка запроса: ${error}`);
                    return;
                }
                dispatch(setUser(user));
                sessionStorage.setItem("userData", JSON.stringify(user));
                navigate("/");
            }
        );
    };

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.confirmPassword?.message;

    const errorMassage = formError || serverError;

    return (
        <div className={className}>
            <H2>Registrierung</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Login"
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Passwort"
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Passwort bestätigen"
                    {...register("confirmPassword", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" height="40px" disabled={!!formError}>
                    Registrieren
                </Button>
                {errorMassage && <AuthFormError>{errorMassage}</AuthFormError>}
                <StyledLink to="/login">Einloggen</StyledLink>
            </form>
        </div>
    );
}

export const Registration = styled(RegistrationContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    & > a {
        margin: 10px 0;
    }

    & > form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 300px;
    }

    @media (max-width: 600px) {
        font-size: 14px;
        form {
            width: 250px;
        }
    }
    @media (max-width: 400px) {
        font-size: 12px;
        form {
            width: 220px;
        }
    }
    @media (max-width: 300px) {
        font-size: 10px;
    }
`;
