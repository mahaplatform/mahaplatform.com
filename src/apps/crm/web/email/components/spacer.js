import PropTypes from 'prop-types'
import React from 'react'

class Spacer extends React.Component {

  static propTypes = {
    height: PropTypes.number
  }

  render() {
    return (
      <table className="spacer">
        <tbody>
          <tr>
            <td {...this._getCell()}>&#xA0;</td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getCell() {
    const { height } = this.props
    return {
      height: height,
      style: {
        fontSize: `${height}px`,
        lineHeight: `${height}px`
      }
    }
  }

}

export default Spacer
