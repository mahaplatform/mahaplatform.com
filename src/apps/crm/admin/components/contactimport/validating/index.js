import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Validating extends React.PureComponent {

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        foo
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Validating'
    }
  }

}

export default Validating
