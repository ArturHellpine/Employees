import React, {useState} from 'react'
import { Layout } from '../../components/layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { CustomInput } from '../../components/custom-input/CustomInput'
import { PasswordInput } from '../../components/password-input/PasswordInput'
import { CustomButton } from '../../components/custom-button/CustomButton'
import {Link, useNavigate} from 'react-router-dom'
import { Paths } from '../../paths/paths'
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useRegisterMutation} from "../../app/services/auth";
import {RegisterData} from "../../types/types";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {ErrorMessage} from "../../components/error-message/ErrorMessage";

export const Register = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [error, setError] = useState('')
    const [registerUser] = useRegisterMutation()

    const register = async (data: RegisterData) => {
        try {
            await registerUser(data).unwrap()
            navigate(Paths.home)
        } catch (err) {
            const maybeError = isErrorWithMessage(err)
            if(maybeError){
                setError(err.data.message)
            } else {
                setError('Невідома помилка')
            }
        }
    }

    return (
        <Layout>
            <Row align='middle' justify='center'>
                <Card title='Реєстрація' style={{ width: '30rem' }}>
                    <Form onFinish={register}>
                        <CustomInput
                            name='name'
                            placeholder='Повне ім’я'
                        />
                        <CustomInput
                            type='email'
                            name='email'
                            placeholder='Пошта'
                        />
                        <PasswordInput
                            name='password'
                            placeholder='Пароль'
                        />
                        <PasswordInput
                            name='confirmPassword'
                            placeholder='Повторіть пароль'
                        />
                        <CustomButton type='primary' htmlType='submit'>
                            Зареєструватись
                        </CustomButton>
                    </Form>
                    <Space direction='vertical' size='large'>
                        <Typography.Text>
                            Вже зареєстровані? <Link to={Paths.login}>Ввійти</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}
