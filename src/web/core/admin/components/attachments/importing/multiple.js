import AssetIcon from '../../asset/icon'
import Message from '../../message'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Multiple extends React.Component {

  static propTypes = {
    files: PropTypes.array
  }

  render() {
    const { files } = this.props
    return (
      <div className="maha-attachments-multiple">
        { files.length > 0 ?
          <div className="maha-attachments-items">
            { files.map((file, index) => (
              <div className="maha-attachments-item" key={`plain_${index}`}>
                <div className="maha-attachments-item-preview">
                  { file.thumbnail ?
                    <div className="maha-attachments-item-image">
                      <div style={{backgroundImage:`url('${file.thumbnail}')`}}>
                        <img src={ `/admin/images/services/${file.service}.png` } />
                      </div>
                    </div> :
                    <div className="maha-attachments-item-icon">
                      <AssetIcon content_type={ file.content_type } source={ file.service } />
                    </div>
                  }
                </div>
                <div className="maha-attachments-item-label">
                  <div className="maha-attachments-item-name">
                    { file.name }<br />
                    <span className={ file.status }>
                      <i className={`fa fa-fw fa-${this._getIcon(file.status)}`} />
                      { _.capitalize(file.status) }
                    </span>
                  </div>
                </div>
              </div>
            )) }
          </div> :
          <Message { ...this._getEmpty() } />
        }
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'file-o',
      title: 'No Files',
      text: 'You have not selected any files'
    }
  }

  _getIcon(status) {
    if(status === 'pending') return 'clock-o'
    if(_.includes(['importing','uploading','processing'], status)) return 'circle-o-notch fa-spin'
    if(status === 'complete') return 'check'
    if(status === 'failed') return 'exclamation-triangle'
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Multiple)
