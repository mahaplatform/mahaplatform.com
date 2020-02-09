import PropTypes from 'prop-types'
import React from 'react'

class Web extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    return (
      <table className="row collapse">
        <tbody>
          <tr>
            <td dangerouslySetInnerHTML={{ __html: config.text }} />
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

export default Web
