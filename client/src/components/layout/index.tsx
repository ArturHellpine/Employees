import React, { FC } from 'react'
import classes from './index.module.css'
import { Layout as AntLayout } from 'antd'
import { Header } from '../header/Header'
interface LayoutProps {
    children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className={classes.main}>
        <Header />
        <AntLayout.Content style={{height: '100%'}}>
            {children}
        </AntLayout.Content>
    </div>
  )
}
