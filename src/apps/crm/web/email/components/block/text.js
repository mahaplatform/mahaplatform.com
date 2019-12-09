import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, config, sectionIndex } = this.props
    const { columns } = config
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex } text-block block`}>
        <tbody>
          <tr>
            { new Array(columns).fill(0).map((column, index) => (
              <td key={`cell_${index}`} { ...this._getCell(index)} />
            )) }
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>

    )
  }

  _getCell(index) {
    const { config } = this.props
    return {
      className: this._getCellClass(index),
      dangerouslySetInnerHTML: {
        __html: config[`content_${index}`]
      }
    }
  }

  _getCellClass(index) {
    const { columns, split } = this.props.config
    const classes=[`large-${split[index]}`]
    if(index === 0) classes.push('first')
    if(index === columns - 1) classes.push('last')
    classes.push('columns')
    return classes.join(' ')
  }

}

export default Text