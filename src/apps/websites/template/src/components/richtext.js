import ReactHtmlParser from 'react-html-parser'
import template from './template'
import Link from 'next/link'
import React from 'react'

const transform = (node, index) => {

  if(node.name === 'a') {
    return (
      <Link key={`node_${index}`} href={ node.attribs.href }>
        <a >{ node.children[0].data }</a>
      </Link>
    )
  }

}

function RichText(text, data) {
  const rendered = data ? template(text, data) : text
  return ReactHtmlParser(rendered, {
    transform
  })
}

export default RichText
