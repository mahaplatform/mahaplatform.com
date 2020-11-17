import Column from './column'
import Style from '../style'
import React from 'react'

const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen']

function Section({ config }) {

  const { columns, datasource, data, dataTemplate } = config

  const _getGridClass = ({ columns, flow, gutters, responsive }) => {
    const classes = ['ui','centered']
    if(flow === 'fluid') classes.push(flow)
    if(responsive === 'stackable') classes.push(responsive)
    classes.push('grid')
    if(flow === 'fixed') classes.push('container')
    return classes.join(' ')
  }

  const _getRowClass = ({ columnSizing, computerColumns, tabletColumns, mobileColumns  }) => {
    const classes = []
    if(columnSizing === 'fixed') {
      if(computerColumns) classes.push(`computer ${numbers[computerColumns]} column`)
      if(tabletColumns) classes.push(`tablet ${numbers[tabletColumns]} column`)
      if(mobileColumns) classes.push(`mobile ${numbers[mobileColumns]} column`)
    }
    classes.push('row')
    return classes.join(' ')
  }

  return (
    <div className="maha-section" style={ Style(null, config.style) }>
      <div className={ _getGridClass(config) }>
        { datasource === 'dynamic' ?
          <div className={ _getRowClass(config) }>
            { data.map((record, cindex) => (
              <Column data={ record } column={ dataTemplate } config={ config } key={`column_${cindex}`} />
            )) }
          </div> :
          <div className={ _getRowClass(config) }>
            {  columns.map((column, cindex) => (
              <Column column={ column } config={ config } key={`column_${cindex}`} />
            )) }
          </div>
        }
      </div>
    </div>
  )

}

export default Section
