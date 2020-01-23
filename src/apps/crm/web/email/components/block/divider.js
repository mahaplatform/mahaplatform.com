import PropTypes from 'prop-types'
import React from 'react'

class Divider extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, sectionIndex } = this.props
    return (
      <table className={`row collapse section-${ sectionIndex }-block-${ blockIndex } divider-block block`}>
        <tbody>
          <tr>
            <td className="divider-block-content">
              <table className="row collapse">
                <tbody>
                  <tr>
                    <td className="large-12 first last columns">
                      <div className="divider" />
                    </td>
                    <td className="expander"></td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

export default Divider
