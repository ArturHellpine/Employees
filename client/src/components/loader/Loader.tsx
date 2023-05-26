import React from 'react'
import { Spin } from 'antd'

export const Loader = () => {
    return (
        <Spin tip="Loading..." size="large" style={{ marginTop: '20vh' }}>
            <div />
        </Spin>
    )
}
