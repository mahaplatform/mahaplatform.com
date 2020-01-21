import ModalPanel from '../../modal_panel'
import Infinite from '../../infinite'
import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Photos extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    source: PropTypes.object,
    onBack: PropTypes.func,
    onAdd: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onProcessing: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const { source } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-photos">
          <div className="maha-attachments-photos-header">
            <div className="maha-attachments-photos-header-icon">
              <img src={`/admin/images/services/${source.service}.png`} />
            </div>
            <div className="maha-attachments-photos-header-label">
              { source.username }
            </div>
          </div>
          <div className="maha-attachments-photos-body">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { files } = this.props
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack  }
      ],
      rightItems: files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
      ] : []
    }
  }

  _getInfinite() {
    const { source, onAdd, onRemove } = this.props
    const empty = {
      icon: 'times-circle',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/photos`,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props: {
        source,
        onAdd,
        onRemove
      }
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Photos)
