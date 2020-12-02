import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Loader } from '@client'
import Pasteur from 'pasteur'
import React from 'react'

class Sign extends React.Component {

  static propTypes = {
    agreement: PropTypes.object,
    agreement_status: PropTypes.string,
    asset_id: PropTypes.number,
    cid: PropTypes.string,
    document: PropTypes.object,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_id: PropTypes.number,
    onCreateAgreement: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    signing: true
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    const { agreement_status } = this.props
    if(agreement_status !== 'success') return <Loader {...this._getLoader() } />
    return (
      <div className="maha-signaturefield-sign">
        <iframe {...this._getIframe() } />
      </div>
    )
  }

  componentDidMount() {
    const { asset_id, email, first_name, last_name, profile_id } = this.props
    const full_name = `${first_name} ${last_name}`
    this.props.onCreateAgreement(asset_id, profile_id, full_name, email)
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'parent',
      targetName: 'child'
    })
    this.pasteur.on('complete', this._handleDone)
  }

  _getIframe() {
    const { agreement } = this.props
    return {
      src: agreement.url
    }
  }

  _getLoader() {
    return {
      label: 'Contacting Adobe Sign'
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapStateToProps = (state, props) => ({
  ...state.signaturefield[props.cid]
})

export default connect(mapStateToProps)(Sign)
