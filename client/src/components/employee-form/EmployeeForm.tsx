import { Employee } from '@prisma/client'
import { Card, Form, Space } from 'antd'
import React, {FC, useState} from 'react'
import { CustomInput } from '../custom-input/CustomInput'
import { ErrorMessage } from '../error-message/ErrorMessage'
import { CustomButton } from '../custom-button/CustomButton'

interface EmployeeFormProps<T>  {
    onFinish: (values: T) => void
    btnText: string
    title: string
    error?: string
    employee?: T
}

export const EmployeeForm: FC<EmployeeFormProps<Employee>> = ({onFinish, btnText, title, error, employee}) => {
  return (
    <Card title={title} style={{width: '30rem'}}>
        <Form name='employee-form' onFinish={onFinish} initialValues={employee}>
            <CustomInput 
                type='text'
                name='firstName'
                placeholder='Ім’я'
            />
            <CustomInput 
                type='text'
                name='lastName'
                placeholder='Прізвище'
            />
            <CustomInput 
                type='number'
                name='age'
                placeholder='Вік'
            />
            <CustomInput 
                type='text'
                name='address'
                placeholder='Місто'
            />
            <Space>
                <ErrorMessage message={error} />
                <CustomButton htmlType='submit'>
                    {btnText}
                </CustomButton>
            </Space>
        </Form>
    </Card>
  )
}
