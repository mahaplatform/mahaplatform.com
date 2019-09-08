import PropTypes from 'prop-types'
import React from 'react'

class Spacer extends React.Component {

  static propTypes = {
    height: PropTypes.string
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
      height,
      style: {
        fontSize: height,
        lineHeight: height
      }
    }
  }

}

export default Spacer
