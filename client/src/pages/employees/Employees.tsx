import React, { useEffect } from 'react'
import { Layout } from '../../components/layout'
import { CustomButton } from '../../components/custom-button/CustomButton'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import { useGetAllEmployeesQuery } from '../../app/services/employees'
import { columns } from './columns'
import { Paths } from '../../paths/paths'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'


export const Employees = () => {
	const { data, isLoading } = useGetAllEmployeesQuery()
	const user = useSelector(selectUser)

	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate(Paths.login)
		}
	}, [navigate, user])

	const goToAddUser = () => {
		navigate(Paths.employeeAdd)
	}

	return (
		<Layout>
			<CustomButton type='primary' onClick={goToAddUser} icon={<PlusCircleOutlined />}>
				Додати
			</CustomButton>
			<Table
				loading={isLoading}
				dataSource={data}
				pagination={false}
				columns={columns}
				rowKey={(record) => record.id}
				onRow={(record) => {
					return {
						onClick: () => navigate(`${Paths.employee}/${record.id}`)
					}
				}}
			/>
		</Layout>
	)
}
