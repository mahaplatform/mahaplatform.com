import Style from '../style'
import Block from './block'
import React from 'react'

const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen']

function Section({ column, config, data }) {

  const _getColumnClass = ({ blocks, columnWidth }, { columnSizing }) => {
    const classes = []
    if(columnSizing === 'variable') classes.push(`${numbers[columnWidth]} wide`)
    if(blocks.length === 0) classes.push('empty')
    classes.push('column')
    return classes.join(' ')
  }

  const _getContentStyle = ({ verticalAlign}) => {
    const style = {}
    if(verticalAlign === 'bottom') style.margin = '0 0 auto'
    if(verticalAlign === 'middle') style.margin = 'auto 0'
    if(verticalAlign === 'bottom') style.margin = 'auto 0 0'
    return style
  }

  return (
    <div className={ _getColumnClass(column, config) }>
      <div className="maha-column-content" style={ Style(null, column.style) }>
        <div style={ _getContentStyle(column) }>
          { column.blocks.map((block, index) => (
            <Block config={ block } data={ data } key={`block_${index}`} />
          )) }
        </div>
      </div>
    </div>
  )

}

export default Section
