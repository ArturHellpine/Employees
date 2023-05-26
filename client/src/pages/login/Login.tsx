import React, { useState } from 'react'
import { Layout } from '../../components/layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { CustomInput } from '../../components/custom-input/CustomInput'
import { PasswordInput } from '../../components/password-input/PasswordInput'
import { CustomButton } from '../../components/custom-button/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths/paths'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/error-message/ErrorMessage'

export const Login = () => {
	const [loginUser, loginUserResult] = useLoginMutation()
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const login = async(data: UserData) => {
		try {
			await loginUser(data).unwrap()
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
				<Card title='Вхід' style={{ width: '30rem' }}>
					<Form onFinish={ login }>
						<CustomInput
							type='email'
							name='email'
							placeholder='Пошта'
						/>
						<PasswordInput 
							name='password'
							placeholder='Пароль'
						/>
						<CustomButton type='primary' htmlType='submit'>
							Ввійти
						</CustomButton>
					</Form>
					<Space direction='vertical' size='large'>
						<Typography.Text>
							Немає акаунта? <Link to={Paths.register}>Зареєструватись</Link>
						</Typography.Text>
						<ErrorMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	)
}
