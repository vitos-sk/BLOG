import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions";
import { Button, H2, Input, AuthFormError } from "../../components";
import { useResetAuthForm } from "../../hooks";
import { request } from "../../utils";

//

const authFormSchema = yup.object({
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

export function AuthorizationContainer({ className }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useResetAuthForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/api/login", "POST", { login, password }).then(
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

  const formError = errors?.login?.message || errors?.password?.message;

  const errorMassage = formError || serverError;

  return (
    <div className={className}>
      <H2>Autorisierung</H2>
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
        <Button type="submit" height="40px" disabled={!!formError}>
          Einloggen
        </Button>
        {errorMassage && <AuthFormError>{errorMassage}</AuthFormError>}
        <StyledLink to="/register">Registrieren</StyledLink>
      </form>
    </div>
  );
}

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

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
