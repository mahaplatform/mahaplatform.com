import PropTypes from 'prop-types'
import { ModalPanel } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Mapping extends React.PureComponent {

  static propTypes = {
    mappings: PropTypes.array,
    mapping: PropTypes.object,
    fields: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { fields } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-search-options">
          <div className="maha-search-results">
            { fields.map((segment, index) => (
              <div className="maha-search-segment" key={`segment_${index}`}>
                <div className="maha-search-segment-title">
                  { segment.label }
                </div>
                { segment.fields.map((field, index) => (
                  <div key={`filter_${index}`} className={ this._getClass(field.name) } onClick={ this._handleChoose.bind(this, field.name) }>
                    <div className="maha-search-item-label padded">
                      { field.label }
                    </div>
                    <div className="maha-search-item-icon">
                      { this._getChecked(field.name) &&
                        <i className="fa fa-fw fa-check" />
                      }
                    </div>
                  </div>
                )) }
              </div>
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getClass(field) {
    const { mapping, mappings } = this.props
    const mapped = _.find(mappings, { field })
    const classes = ['maha-search-item']
    if(mapped && mapped.header !== mapping.header) classes.push('disabled')
    return classes.join(' ')
  }

  _getChecked(field) {
    const { mapping } = this.props
    return mapping.field === field
  }

  _getPanel() {
    return {
      title: 'Choose Field',
      leftItems: [
        { icon : 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleChoose(field) {
    const { mapping } = this.props
    this.props.onDone({
      ...mapping,
      field
    })
  }

}

export default Mapping
