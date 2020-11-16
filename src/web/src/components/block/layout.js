import Style from './style'
import Block from './index'
import React from 'react'

const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen']

function LayoutBlock({ children, config }) {

  const _getGridClass = ({ flow, responsive }) => {
    const classes = ['ui']
    if(flow === 'fluid') classes.push('fluid')
    if(responsive === 'stackable') classes.push('stackable')
    classes.push('grid')
    if(flow === 'fixed') classes.push('container')
    return classes.join(' ')
  }

  const _getRowClass = ({ columnSizing, numColumns }) => {
    const classes = []
    if(columnSizing === 'fixed') classes.push(`${numbers[numColumns]} column`)
    classes.push('row')
    return classes.join(' ')
  }

  const _getColumnClass = ({ blocks, columnWidth }, { columnSizing }) => {
    const classes = []
    if(columnSizing === 'variable') classes.push(`${numbers[columnWidth]} wide`)
    if(blocks.length === 0) classes.push('empty')
    classes.push('column')
    return classes.join(' ')
  }

  const _getColumnStyle = (config) => {
    const style = {
      ...Style(null, config)
    }
    return style
  }

  return (
    <div style={ Style(null, config) }>
      <div className={ _getGridClass(config) }>
        <div className={ _getRowClass(config) }>
          { config.columns.map((column, cindex) => (
            <div className={ _getColumnClass(column, config) } style={ _getColumnStyle(column) } key={`column_${cindex}`}>
              { column.blocks.map((block, bindex) => (
                <Block config={ block } key={`block_${cindex}_${bindex}`} />
              )) }
            </div>
          )) }
        </div>
      </div>
    </div>
  )

}

export default LayoutBlock
