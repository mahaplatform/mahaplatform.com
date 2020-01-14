import { Buttons, List, Loader, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
    const { defaultMapping, imports, status } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { status === 'loading' && <Loader { ...this._getLoader() } /> }
        { status === 'success' &&
          <div className="import-intro">
            <div className="import-intro-start">
              <h3>Import Records</h3>
              <p>To make bulk entry easier, you can import records from a spreadsheet</p>
              <button className="ui green fluid large button start-new" onClick={ this._handleNew }>
                Start New Import
                <i className="fa fa-chevron-right" />
              </button>
            </div>
            { defaultMapping &&
              <div className="import-intro-template">
                <h3>Templates</h3>
                <p>To keeps things simple, download this template and then reupload with your data</p>
                <Buttons { ...this._getTemplateButtons() } />
              </div>
            }
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
    const { table, onFetch } = this.props
    onFetch(table)
  }

  _getPanel() {
    return {
      title: 'Import Contacts',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getLoader() {
    return {
      label: 'Loading previous imports'
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

  _getList() {
    const { imports } = this.props
    return {
      items: [
        ...imports.map((item, index) => ({
          icon: 'file-excel-o',
          component: () => (
            <div className="import-item">
              <strong>{item.name || item.asset.original_file_name}</strong><br />
              { moment(item.created_at).format('MMM DD, YYYY @ h:mm a') }<br />
              <div className="import-item-remove" onClick={ this._handleRemove.bind(this, item) }>Delete Import</div>
            </div>
          ),
          handler: this._handleResume.bind(this, item)
        }))
      ]
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
