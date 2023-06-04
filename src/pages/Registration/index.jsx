import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from "react-redux";
import {fetchAuth, fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState:{errors, isValid}} = useForm({mode: 'onChange'})

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        if(!data.payload) {
            alert('Не вдалось зареєструватись')
        }
        if('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if(isAuth) {
        return <Navigate to='/' />
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення акаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
              className={styles.field}
              label="Повне ім’я"
              fullWidth
              error={Boolean(errors.fullName?.message)}
              helperText={errors.fullName?.message}
              {...register('fullName', {required: 'Вкажіть повне ім’я'})}
          />
          <TextField
              className={styles.field}
              label="Пошта"
              fullWidth
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              type='email'
              {...register('email', {required: 'Вкажіть пошту'})}
          />
          <TextField
              className={styles.field}
              label="Пароль"
              fullWidth
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type='password'
              {...register('password', {required: 'Вкажіть пароль'})}
          />
          <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
              Зареєструватись
          </Button>
      </form>
    </Paper>
  );
};
