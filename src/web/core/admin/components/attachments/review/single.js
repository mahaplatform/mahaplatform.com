import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Processing extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onBack: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    const file = this.props.files[0]
    return (
      <div className="maha-attachments-processing">
        <div className="maha-attachments-processing-image">
          <div style={{backgroundImage:`url(${file.thumbnail })`}}>
            <img src={ `/admin/images/services/${file.service}.png` } />
          </div>
        </div>
        { file.name }<br />
        { file.asset ?
          <span className="finished">
            <i className="fa fa-fw fa-check" /> Imported
          </span> :
          <span>
            <i className="fa fa-fw fa-spin fa-circle-o-notch" /> Importing
          </span>
        }
      </div>
    )
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Processing)
