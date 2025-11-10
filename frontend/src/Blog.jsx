import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Footer, Header, Modal, Error } from "./components";
import { Authorization, Registration, Users, Post, Main } from "./pages";
import { ERROR } from "./constants";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";

const AppColum = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    margin: 0 auto;
    background-color: #000000;
    color: #fff;
    @media (max-width: 1020px) {
        width: 100%;
    }
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

const Pages = styled.div`
    padding: 120px 20px 110px 20px;
    margin: 20px;
    @media (max-width: 600px) {
        padding: 80px 10px 60px 10px;
    }
    @media (max-width: 400px) {
        padding: 60px 10px 40px 10px;
    }
    @media (max-width: 300px) {
        padding: 40px 10px 20px 10px;
    }
`;

export function Blog() {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const currentUserDataJson = sessionStorage.getItem("userData");

        if (!currentUserDataJson) return;

        const currentUserData = JSON.parse(currentUserDataJson);

        dispatch(
            setUser({
                ...currentUserData,
                roleId: Number(currentUserData.role),
            })
        );
    }, [dispatch]);

    return (
        <AppColum>
            <Header />
            <Pages>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post/create" element={<Post />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/post/:id/edit" element={<Post />} />
                    <Route
                        path="*"
                        element={<Error error={ERROR.PAGE_NOT_EXIST} />}
                    />
                </Routes>
            </Pages>
            <Footer />
            <Modal />
        </AppColum>
    );
}
