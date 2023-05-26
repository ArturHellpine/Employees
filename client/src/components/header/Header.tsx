import React from 'react'
import classes from './Header.module.css'
import { Layout, Space, Typography } from 'antd'
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { CustomButton } from '../custom-button/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths/paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

export const Header = () => {
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onLogoutClick = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate(Paths.login)
	}

	return (
		<Layout.Header className={classes.header}>
			<Space>
				<TeamOutlined className={classes.teamIcon} />
				<Link to={Paths.home}>
					<CustomButton type='ghost'>
						<Typography.Title level={1}>Працівники</Typography.Title>
					</CustomButton>
				</Link>
			</Space>
			{
				user 
				? 	<CustomButton type='ghost' icon={<LogoutOutlined />} onClick={onLogoutClick} >
						Вийти
					</CustomButton>

				: 	<Space>
						<Link to={Paths.register}>
							<CustomButton type='ghost' icon={<UserOutlined />}>
								Зареєструватись
							</CustomButton>
						</Link>
						<Link to={Paths.login}>
							<CustomButton type='ghost' icon={<LoginOutlined />}>
								Увійти
							</CustomButton>
						</Link>
				   	</Space>
			}
		</Layout.Header>
	)
}
