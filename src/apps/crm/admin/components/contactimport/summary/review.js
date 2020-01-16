import { Loader, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Review extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    index: 0,
    items: null,
    status: 'success',
    total: 0
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { index, items, status, total } = this.state
    const record = items ? items[index] : null
    const { _import } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { items &&
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
                    <label>Record { index + 1 } / { total }</label>
                  </div>
                  <div className="maha-import-review-pager-item">
                    { index < _import.valid_count - 1 ?
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
                      { Object.keys(record.values).map((key, index) => (
                        <tr key={`property_${index}`}>
                          <th>{ key }</th>
                          <td>
                            { _.find(_import.mapping, ['field', key]).type == 'upload' &&
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
    this._handleFetch()
  }

  _getPanel() {
    return {
      title: 'Review Records',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _handleFetch() {
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/imports/${_import.id}/items`,
      method: 'get',
      query: {
        $filter: {
          is_duplicate: {
            $eq: 'false'
          },
          is_omitted: {
            $eq: 'false'
          },
          is_nonunique: {
            $eq: 'false'
          },
          is_valid: {
            $eq: 'true'
          }
        }
      },
      onSuccess: this._handleSuccess
    })
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleNext() {
    const { index, items } = this.state
    this.setState({
      index: index < items.length ? index + 1 : index
    })
  }

  _handlePrevious() {
    const { index } = this.state
    this.setState({
      index: index > 0 ? index - 1 : index
    })
  }

  _handleSuccess(result) {
    this.setState({
      items: result.data,
      total: result.pagination.total
    })
  }

}

export default Review
