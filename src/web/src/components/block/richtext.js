import ReactHtmlParser from 'react-html-parser'
import Style from './style'
import React from 'react'

function RichText(text, config) {

  const transform = (config) => (node, index) => {
    if(node.type === 'tag' && node.name === 'h2') {
      return (
        <h2 key={`node_${index}`} style={ Style('h2', config) }>
          { node.children[0].data }
        </h2>
      )
    }
    if(node.type === 'tag' && node.name === 'h3') {
      return (
        <h3 key={`node_${index}`} style={ Style('h3', config) }>
          { node.children[0].data }
        </h3>
      )
    }
    if(node.type === 'tag' && node.name === 'p') {
      return (
        <p key={`node_${index}`} style={ Style('p', config) }>
          { node.children[0].data }
        </p>
      )
    }
  }

  return ReactHtmlParser(text, { transform: transform(config) })

}

export default RichText
