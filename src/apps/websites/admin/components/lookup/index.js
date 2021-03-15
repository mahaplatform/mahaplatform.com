import { Loader, Message, Searchbox } from '@admin'
import PropTypes from 'prop-types'
import Result from './result'
import React from 'react'

class Lookup extends React.Component {

  static contextTypes = {
    form: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    onChoose: PropTypes.func
  }

  state = {
    name: '',
    result: null,
    status: 'pending'
  }

  _handleLookup = this._handleLookup.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { result, status } = this.state
    return (
      <div className="websites-domain-lookup">
        <div className="websites-domain-lookup-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="websites-domain-lookup-body">
          { status === 'success' &&
            <div className="websites-domain-lookup-results">
              <Result { ...this._getResult(result.domain) } />
              <div className="websites-domain-lookup-results-header">
                Suggestions
              </div>
              <div className="websites-domain-lookup-results-suggestions">
                { result.suggestions.map((suggestion, index) => (
                  <Result { ...this._getResult(suggestion) } key={`suggestion_${index}`} />
                )) }
              </div>
            </div>
          }
          { status === 'loading' &&
            <Loader />
          }
          { status === 'pending' &&
            <Message { ...this._getMessage() } />
          }
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.state
    if(name !== prevState.name) {
      this._handleLookup()
    }
  }

  _getMessage() {
    return {
      title: 'Lookup Domain'
    }
  }

  _getPanel() {
    return {
      title: 'Lookup Domain',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getResult(domain) {
    const { onChoose } = this.props
    return {
      domain,
      onChoose
    }
  }

  _getSearchbox() {
    return {
      autofocus: true,
      prompt: 'Find a domain',
      onChange: this._handleType
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleLookup() {
    const { name } = this.state
    this.setState({
      status: 'loading'
    })
    this.context.network.request({
      endpoint: '/api/admin/websites/domains/lookup',
      method: 'get',
      query: { name },
      onFailure: (result) => {
        this.setState({
          status: 'error'
        })
      },
      onSuccess: (result) => {
        this.setState({
          result: result.data,
          status: 'success'
        })
      }
    })
  }

  _handleType(name) {
    this.setState({ name })
  }

}

export default Lookup
