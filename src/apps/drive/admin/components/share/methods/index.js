import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Methods extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
    methods: PropTypes.array,
    onChooseMethod: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { methods } = this.props
    if(!methods) return null
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="drive-share-methods">
          { methods.map((method, index) => (
            <div className="drive-share-methods-item" key={ `item_${index}` } onClick={ this._handleChoose.bind(this, index) }>
              <div className="drive-share-methods-item-icon">
                <i className={ `fa fa-${ method.icon }` } />
              </div>
              <div className="drive-share-methods-item-text">
                Share via { method.label }
              </div>
              <div className="drive-share-methods-item-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { item } = this.props
    const type = _.capitalize(item.type)
    return {
      title: `Share ${type}`,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChoose(index) {
    this.props.onChooseMethod(index)
  }

}

export default Methods
