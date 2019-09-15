import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'

class Sources extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    cancelText: PropTypes.any,
    doneText: PropTypes.string,
    counts: PropTypes.object,
    sources: PropTypes.array,
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    onChooseSource: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { counts, sources } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <div className={ this._getSourceClass(index) } key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, index)}>
              { source.photo ?
                <div className="maha-attachments-source-logo">
                  <Avatar user={{ photo: source.photo }} />
                  <div className="maha-attachments-source-network">
                    <img src={ `/admin/images/${source.network}.png` } />
                  </div>
                </div> :
                <div className="maha-attachments-source-logo">
                  <img src={ `/admin/images/${source.network}.png` } />
                </div>
              }
              <div className="maha-attachments-source-text">
                { source.username || source.network }
              </div>
              <div className="maha-attachments-source-count">
                { counts[source.source] &&
                  <div className="maha-attachments-source-count-badge">
                    { counts[source.source] }
                  </div>
                }
              </div>
              <div className="maha-attachments-source-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          ))}
          <div className="maha-attachments-source" onClick={ this._handleNew }>
            <div className="maha-attachments-source-logo">
              <i className="fa fa-fw fa-plus-circle" />
            </div>
            <div className="maha-attachments-source-text">
              Add a new source
            </div>
            <div className="maha-attachments-source-proceed">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { cancelText, doneText } = this.props
    return {
      title: 'Choose Source',
      leftItems: [
        { label: cancelText, handler: this._handleCancel }
      ],
      rightItems: [
        { label: doneText, handler: this.props.onDone }
      ]
    }
  }

  _getSourceClass(index) {
    const { active } = this.props
    const classes = ['maha-attachments-source']
    if(index === active) classes.push('active')
    return classes.join(' ')
  }

  _handleChooseSource(index) {
    this.props.onChooseSource(index)
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleNew() {

  }

}

export default Sources
