import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Loader } from '../../components/loader/Loader'
import { Paths } from '../../paths/paths'
import { Layout } from '../../components/layout'
import {Descriptions, Divider, Modal, Space} from 'antd'
import { CustomButton } from '../../components/custom-button/CustomButton'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ErrorMessage} from "../../components/error-message/ErrorMessage";
import {isErrorWithMessage} from "../../utils/is-error-with-message";

export const Employee = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const params = useParams<{id: string}>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [removeEmployee] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser)

    if(isLoading) {
        return <Loader />
    }
    
    if(!data) {
        return <Navigate to={Paths.home} />
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteUser = async () => {
        hideModal()
        try {
            await removeEmployee(data.id).unwrap()
            navigate(`${Paths.status}/deleted`)
        } catch (err) {
            const maybeError = isErrorWithMessage(err)
            if(maybeError) {
                setError(err.data.message)
            } else {
                setError('Невідома помилка')
            }
        }
    }

    return (
        <Layout>
            <Descriptions title='Інформація про працівника' bordered>
                <Descriptions.Item label='Ім’я' span={3}>
                    { `${data.firstName} ${data.lastName}` }
                </Descriptions.Item>
                <Descriptions.Item label='Вік' span={3}>
                    { data.age }
                </Descriptions.Item>
                <Descriptions.Item label='Місто' span={3}>
                    { data.address }
                </Descriptions.Item>
            </Descriptions>
            {
                user?.id === data.userId && (
                    <>
                        <Divider orientation='left'>Дія</Divider>
                        <Space>
                            <Link to={`/employee/edit/${data.id}`}>
                                <CustomButton
                                    shape='round'
                                    type='default'
                                    icon={<EditOutlined />}
                                >
                                    Редагувати
                                </CustomButton>
                            </Link>
                            <CustomButton
                                shape='round'
                                danger
                                onClick={showModal}
                                icon={<DeleteOutlined />}
                            >
                                Видалити
                            </CustomButton>
                        </Space>
                    </>
                )
            }
            <ErrorMessage message={error} />
            <Modal
                title='Підтвердіть видалення'
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText='Підтвердити'
                cancelText='Відмінити'
            >
                Ви дійсно бажаєте видалити працівника з таблиці?
            </Modal>
        </Layout>
    )
}
