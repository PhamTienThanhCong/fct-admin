import { Button } from 'antd'
import React, { ReactNode } from 'react'

interface BtnProps {
  size?: 'middle' | 'small' | 'large'
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
  item: ReactNode
  shape?: 'default' | 'circle' | 'round'
  disabled?: boolean
  shadow?: boolean
  hover?: boolean
  opacity?: boolean
  style?: React.CSSProperties
  className?: string
  danger?: boolean
  loading?: boolean
  icon?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
  htmlType?: 'button' | 'submit' | 'reset'
}

const CustomButton = (props: BtnProps, ref: any) => (
  <Button
    disabled={props.disabled}
    ref={ref}
    onClick={props.onClick}
    onBlur={props.onBlur}
    size={props.size ?? 'middle'}
    type={props.type ?? 'default'}
    shape={props.shape ?? 'default'}
    style={{ ...props.style }}
    danger={props.danger}
    loading={props.loading}
    icon={props.icon}
    className={`flex items-center ${props.className}`}
    htmlType={props.htmlType ?? 'button'}
  >
    {props.item}
  </Button>
)

export default CustomButton
