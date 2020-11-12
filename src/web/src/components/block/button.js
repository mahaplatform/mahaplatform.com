import Link from 'next/link'
import React from 'react'

function ButtonBlock({ children, config }) {

  const _getClass = ({ color, flow, size }) => {
    const classes = ['ui']
    if(flow === 'fluid') classes.push(flow)
    if(color) classes.push(color)
    if(size) classes.push(size)
    classes.push('button')
    return classes.join(' ')
  }

  const _handleClick = (config, e) => {
    e.preventDefault()
    console.log('The link was clicked.')
  }

  if(config.link_strategy === 'web') {
    return (
      <Link href={ config.url } replace={ true }>
        <a className={ _getClass(config) }>
          { config.text }
        </a>
      </Link>
    )
  }

  return (
    <button className={ _getClass(config) } onClick={ _handleClick.bind(this, config) }>
      { config.text }
    </button>
  )
}

export default ButtonBlock
