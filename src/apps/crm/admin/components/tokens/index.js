import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Token from './token'
import React from 'react'

class Tokens extends React.Component {

  static propTypes = {
    tokens: PropTypes.array,
    onPop: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { tokens } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="designer-tokens">
          <table className="ui celled compact table">
            <tbody>
              { tokens.reduce((rows, group, i) => [
                ...rows,
                <tr key={`group_${i}`}>
                  <td colSpan="2">{ group.title }</td>
                </tr>,
                ...group.tokens.map((token, j) => (
                  <tr key={`group_${i}_token_${j}`}>
                    <td>{ token.name }</td>
                    <td>
                      <Token label={ token.token } />
                    </td>
                  </tr>
                ))
              ], []) }
            </tbody>
          </table>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Tokens',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

}

export default Tokens
