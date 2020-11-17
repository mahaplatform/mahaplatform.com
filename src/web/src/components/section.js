import Style from './style'
import Block from './block'
import React from 'react'

const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen']

function Section({ children, config }) {

  const _getGridClass = ({ columns, flow, responsive }) => {
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

  const _getContentStyle = ({ verticalAlign}) => {
    const style = {}
    if(verticalAlign === 'bottom') style.margin = '0 0 auto'
    if(verticalAlign === 'middle') style.margin = 'auto 0'
    if(verticalAlign === 'bottom') style.margin = 'auto 0 0'
    return style
  }

  return (
    <div className="maha-section" style={ Style(null, config.style) }>
      <div className={ _getGridClass(config) }>
        <div className={ _getRowClass(config) }>
          { config.columns.map((column, cindex) => (
            <div className={ _getColumnClass(column, config) } key={`column_${cindex}`}>
              <div className="maha-column-content" style={ Style(null, column.style) }>
                <div style={ _getContentStyle(column) }>
                  { column.blocks.map((block, bindex) => (
                    <div style={ Style(null, block.style) } key={`block_${cindex}_${bindex}`}>
                      <Block config={ block } />
                    </div>
                  )) }
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  )

}

export default Section
