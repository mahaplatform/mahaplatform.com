import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import Style from './style'
import React, { Fragment } from 'react'

function RichText(text, style) {

  const transform = (style) => (node, index) => {

    if(node.name === 'h2') {
      return (
        <h2 key={`node_${index}`} style={ Style('h2', style) }>
          { node.children.map((child, cindex) => (
            <Fragment key={`child_${cindex}`}>
              { transform(style)(child, cindex) }
            </Fragment>
          )) }
        </h2>
      )
    }

    if(node.name === 'h3') {
      return (
        <h3 key={`node_${index}`} style={ Style('h3', style) }>
          { node.children.map((child, cindex) => (
            <Fragment key={`child_${cindex}`}>
              { transform(style)(child, cindex) }
            </Fragment>
          )) }
        </h3>
      )
    }

    if(node.name === 'p') {
      return (
        <p key={`node_${index}`} style={ Style('p', style) }>
          { node.children.map((child, cindex) => (
            <Fragment key={`child_${cindex}`}>
              { transform(style)(child, cindex) }
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
    transform: transform(style)
  })

}

export default RichText
