import { List, Loader, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import moment from 'moment'
import React from 'react'
import qs from 'qs'

class Intro extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    imports: PropTypes.array,
    status: PropTypes.string,
    table: PropTypes.string,
    token: PropTypes.string,
    defaultMapping: PropTypes.array,
    onCancel: PropTypes.func,
    onDestroy: PropTypes.func,
    onFetch: PropTypes.func,
    onNew: PropTypes.func,
    onResume: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleDeleteAll = this._handleDeleteAll.bind(this)

  render() {
    const { imports, status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { status === 'loading' && <Loader { ...this._getLoader() } /> }
        { status === 'success' &&
          <div className="import-intro">
            { imports.length > 0 &&
              <div className="import-intro-incomplete">
                <div className="import-intro-incomplete-header">
                  <h3>Previous Imports</h3>
                  <p>We found the following incomplete imports</p>
                  <div className="import-intro-deleteall" onClick={ this._handleDeleteAll }>
                    Delete All
                  </div>
                </div>
                <List { ...this._getList() } />
              </div>
            }
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { onFetch } = this.props
    onFetch()
  }

  _getService() {
    return 'mailchimp'
  }

  _getList() {
    const { imports } = this.props
    return {
      items: [
        ...imports.map((item, index) => ({
          component: () => (
            <div className="import-item">
              <div className="import-item-icon">
                <img src={ `/admin/images/services/${item.service}.png` } />
              </div>
              <div className="import-item-label">
                <strong>{item.name || item.asset.original_file_name}</strong> ({ pluralize('record', item.item_count, true) })<br />
                { moment(item.created_at).format('MMM DD, YYYY @ h:mm a') }<br />
                <div className="import-item-remove" onClick={ this._handleRemove.bind(this, item) }>Delete Import</div>
              </div>
            </div>
          ),
          handler: this._handleResume.bind(this, item)
        }))
      ]
    }
  }

  _getLoader() {
    return {
      label: 'Loading previous imports'
    }
  }

  _getMessage() {
    return {
      icon: 'upload',
      title: 'Import Records',
      text: 'Lorem ipsum dolor amet synth hashtag tousled tattooed intelligentsia ennui paleo fingerstache.',
      button: {
        label: 'Choose File',
        handler:  this._handleNew
      }
    }
  }

  _getPanel() {
    return {
      title: 'Import Contacts',
      buttons: [
        { label: 'Start New Import', color: 'red', handler: this._handleNew }
      ]
    }
  }

  _getTemplateButtons() {
    return {
      buttons: [
        {
          label: 'CSV',
          handler: this._downloadTemplate.bind(this, 'csv')
        }, {
          label: 'XLSX',
          handler: this._downloadTemplate.bind(this, 'xlsx')
        }
      ]
    }
  }

  _handleDeleteAll() {
    const { imports } = this.props
    imports.map(item => this.props.onDestroy(item.id))
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleNew() {
    this.props.onNew()
  }

  _handleResume(item) {
    this.props.onResume(item)
  }

  _handleRemove(item, e) {
    this.props.onDestroy(item.id)
    e.stopPropagation()
  }

  _downloadTemplate(format){
    const { token } = this.props
    const columns = this.props.defaultMapping.map((item, index) => item.header)
    window.location.href = `/api/admin/imports/template.${format}?download=true&filename=template&token=${token}&${qs.stringify({ columns })}`
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(Intro)
