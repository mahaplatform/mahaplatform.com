import Loader from '../../loader'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Review extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    index: PropTypes.number,
    import: PropTypes.object,
    import_items: PropTypes.array,
    record: PropTypes.array,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onFetch: PropTypes.func,
    onInit: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)

  render() {
    const { index, import_items, status } = this.props
    const mapping = (this.props.import) ? this.props.import.mapping : {}
    const record = (import_items) ? import_items[index] : null
    return (
      <ModalPanel { ...this._getPanel() }>
        { import_items &&
          <div className="maha-import-review">
            { status === 'loading' && <Loader { ...this._getLoader() } /> }
            { (status === 'loaded' || status === 'success') &&
              <div>
                <div className="maha-import-review-pager">
                  <div className="maha-import-review-pager-item">
                    { index > 0 ?
                      <div className="ui green tiny fluid button" onClick={ this._handlePrevious }>
                        <i className="fa fa-fw fa-chevron-left" />
                      </div> :
                      <div className="ui tiny fluid button disabled">
                        <i className="fa fa-fw fa-chevron-left" />
                      </div>
                    }
                  </div>
                  <div className="maha-import-review-pager-item">
                    <label>Record Number: { index+1 }</label>
                  </div>
                  <div className="maha-import-review-pager-item">
                    { index < this.props.import.valid_count - 1 ?
                      <div className="ui green tiny fluid button" onClick={ this._handleNext }>
                        <i className="fa fa-fw fa-chevron-right" />
                      </div> :
                      <div className="ui tiny fluid button disabled">
                        <i className="fa fa-fw fa-chevron-right" />
                      </div>
                    }
                  </div>
                </div>
                <div className="maha-import-review-body">
                  <table className="maha-import-review-record">
                    <tbody>
                      <tr>
                        <th>Record ID:</th>
                        <td>{record.id}</td>
                      </tr>
                      { Object.keys(record.values).map((key, index) => (
                        <tr key={`property_${index}`}>
                          <th>{ key }</th>
                          <td>
                            { _.find(mapping, ['field', key]).type == 'upload' &&
                              <div className="image-preview">
                                <img src={record.values[key]} alt="Preview of image to be uploaded" />
                                <span>Preview</span>
                              </div>
                            }
                            { record.values[key] }
                          </td>
                        </tr>
                      )) }
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { onFetch, onInit, defaultValue } = this.props
    onInit( defaultValue )
    onFetch( defaultValue.id )
  }

  _getPanel() {
    return {
      title: 'Review New Import Records',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getLoader() {
    return {
      label: 'Loading new records...'
    }
  }

  _handleDone() {
    this.props.onBack()
  }

  _handlePrevious() {
    const { onPrevious } = this.props
    onPrevious()
  }

  _handleNext() {
    const { onNext } = this.props
    onNext()
  }

}

export default Review
