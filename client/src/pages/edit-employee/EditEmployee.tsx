import React, {FC, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEditEmployeeMutation, useGetEmployeeQuery} from "../../app/services/employees";
import {Loader} from "../../components/loader/Loader";
import {Layout} from "../../components/layout";
import {Row} from "antd";
import {EmployeeForm} from "../../components/employee-form/EmployeeForm";
import {Employee} from "@prisma/client";
import {Paths} from "../../paths/paths";
import {isErrorWithMessage} from "../../utils/is-error-with-message";

const EditEmployee: FC = () => {
    const navigate = useNavigate()
    const params = useParams<{id: string}>()
    const [error, setError] = useState('')
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [editEmployee] = useEditEmployeeMutation()

    if(isLoading) {
        return <Loader />
    }

    const handleEditUser = async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...data, ...employee
            }
            await editEmployee(editedEmployee).unwrap()
            navigate(`${Paths.status}/updated`)
        } catch (e) {
            const maybeError = isErrorWithMessage(e)
            if(maybeError) {
                setError(e.data.message)
            } else {
                setError('Невідома помилка')
            }
        }
    }

    return (
        <Layout>
            <Row align='middle' justify='center'>
                <EmployeeForm
                    onFinish={handleEditUser}
                    employee={data}
                    error={error}
                    btnText='Редагувати'
                    title='Редагування працівника'
                />
            </Row>
        </Layout>
    );
};

export default EditEmployee;