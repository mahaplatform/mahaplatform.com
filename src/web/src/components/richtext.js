import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import Style from './style'
import React, { Fragment } from 'react'

function RichText(text, config) {

  const transform = (config) => (node, index) => {

    if(node.name === 'h2') {
      return (
        <h2 key={`node_${index}`} style={ Style('h2', config.style) }>
          { node.children.map((child, index) => (
            <Fragment key={`child_${index}`}>
              { transform(config)(child) }
            </Fragment>
          )) }
        </h2>
      )
    }

    if(node.name === 'h3') {
      return (
        <h3 key={`node_${index}`} style={ Style('h3', config.style) }>
          { node.children.map((child, index) => (
            <Fragment key={`child_${index}`}>
              { transform(config)(child) }
            </Fragment>
          )) }
        </h3>
      )
    }

    if(node.name === 'p') {
      return (
        <p key={`node_${index}`} style={ Style('p', config.style) }>
          { node.children.map((child, index) => (
            <Fragment key={`child_${index}`}>
              { transform(config)(child) }
            </Fragment>
          )) }
        </p>
      )
    }

    if(node.name === 'a') {
      return (
        <Link key={`node_${index}`} href={ node.attribs.href }>
          <a>{ node.children[0].data }</a>
        </Link>
      )
    }

    if(node.name === 'br') {
      return <br />
    }

    if(node.data) return node.data

  }

  return ReactHtmlParser(text, {
    transform: transform(config)
  })

}

export default RichText
