import { ModalPanel, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    destination: PropTypes.func,
    import: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-complete">
          <Message { ...this._getSuccessMessage() } />
        </div>
      </ModalPanel>
    )
  }

  componentDidMount(){

  }

  _getSuccessMessage() {
    const { destination } = this.props
    return {
      title: 'Import Successful!',
      text: 'Great job! Your data was imported successfully.',
      icon: 'check',
      color: 'green',
      animation: 'tada',
      button: {
        label: 'Go to records',
        handler: () => {
          if(destination) {
            const destination = this.props.destination(this.props.import.id)
            this.context.router.replace(destination)
          }
          this.context.modal.close()
        }
      }
    }
  }

  _getPanel() {
    const { status } = this.props
    const panel = {
      title: 'Import Complete',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
    return panel
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Complete
