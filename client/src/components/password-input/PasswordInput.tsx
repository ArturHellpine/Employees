import React, {FC} from 'react'
import { NamePath } from 'antd/es/form/interface'
import { Form, Input } from 'antd'


interface PasswordInputProps {
    name: string
    placeholder: string
    dependencies?: NamePath[]
}

export const PasswordInput: FC<PasswordInputProps> = ({name, placeholder, dependencies}) => {
    return (
        <Form.Item
            name={name}
            dependencies={dependencies}
            hasFeedback
            rules={[{required: true, message: 'Обов’язкове поле'}, ({getFieldValue}) => ({
                validator(_, value) {
                    if(!value) {
                        return Promise.resolve()
                    }
                    if(name === 'confirmPassword') {
                        if(!value || getFieldValue(('password')) === value) {
                            return Promise.resolve()
                        }
                        return Promise.reject(new Error('Паролі мають бути одинаковими'))
                    } else {
                        if(value.length < 6) {
                            return Promise.reject(new Error('Пароль не менше 6-ти символів'))
                        }
                        return Promise.resolve()
                    }
                }
            })]}
        >
            <Input.Password 
                placeholder={placeholder}
                size='large'
            />
        </Form.Item>
    )
}
