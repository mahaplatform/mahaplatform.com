import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import React from 'react'
import _ from 'lodash'

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

const transform = (node, index) => {

  if(node.name === 'a') {
    return (
      <Link key={`node_${index}`} href={ node.attribs.href }>
        <a >{ node.children[0].data }</a>
      </Link>
    )
  }

}

function RichText(text) {
  return ReactHtmlParser(text, {
    transform
  })
}

export default RichText
