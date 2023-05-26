import { Button, Result, Row } from 'antd'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Statuses } from './statuses'
import { Paths } from '../../paths/paths'

export const Status = () => {
    const { status } = useParams()

    return (
        <Row align='middle' justify='center' style={{ width: '100%' }}>
            <Result
                status={ status ? 'success' : 404 }
                title={ status ? Statuses[status] : 'Не знайдено' }
                extra={
                    <Button key='dashboard'>
                        <Link to={Paths.home}>
                            На головну
                        </Link>
                    </Button>
                }
            />
        </Row>
    )
}
