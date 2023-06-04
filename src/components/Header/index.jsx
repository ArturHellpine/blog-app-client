import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.data);
    const onClickLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={userData ? styles.logo : ''} to="/">
                        <div>{userData?.fullName}</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/add-post">
                                    <Button variant="contained">Написати пост</Button>
                                </Link>
                                <Button
                                    onClick={onClickLogout}
                                    variant="contained"
                                    color="error"
                                >
                                    Вийти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Увійти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Створити акаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
