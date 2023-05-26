import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import React, { FC } from 'react'

interface CustomInputProps {
    name: string
    placeholder: string
    type?: string
}

export const CustomInput: FC<CustomInputProps> = ({name, placeholder,type = 'text'}) => {
    return (
            <Form.Item 
                name={name} 
                shouldUpdate={true}
                rules={[{required: true, message: 'Обов’язкове поле'}]}
            >
                <Input 
                    placeholder={placeholder} 
                    type={type}
                    size='large'
                />
            </Form.Item>
        )
}
