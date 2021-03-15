import { Loader, Message, Searchbox } from '@admin'
import PropTypes from 'prop-types'
import Result from './result'
import React from 'react'
import _ from 'lodash'

const tlds = ['ac', 'academy', 'accountants', 'adult', 'agency', 'apartments', 'associates', 'auction', 'band', 'bargains', 'be', 'berlin', 'bike', 'bingo', 'biz', 'black', 'blue', 'boutique', 'builders', 'business', 'buzz', 'ca', 'cab', 'cafe', 'camera', 'camp', 'capital', 'cards', 'care', 'careers', 'cash', 'casino', 'catering', 'cc', 'center', 'ceo', 'ch', 'chat', 'cheap', 'church', 'city', 'cloud', 'claims', 'cleaning', 'click', 'clinic', 'clothing', 'club', 'co', 'co.nz', 'co.uk', 'co.za', 'coach', 'codes', 'coffee', 'college', 'com', 'com.au', 'com.mx', 'community', 'company', 'computer', 'condos', 'construction', 'consulting', 'contractors', 'cool', 'coupons', 'credit', 'creditcard', 'cruises', 'dance', 'dating', 'de', 'deals', 'delivery', 'democrat', 'dental', 'diamonds', 'digital', 'direct', 'directory', 'discount', 'dog', 'domains', 'education', 'email', 'energy', 'engineering', 'enterprises', 'equipment', 'es', 'estate', 'eu', 'events', 'exchange', 'expert', 'exposed', 'express', 'fail', 'farm', 'fi', 'finance', 'financial', 'fish', 'fitness', 'flights', 'florist', 'flowers', 'fm', 'football', 'forsale', 'foundation', 'fr', 'fund', 'furniture', 'futbol', 'fyi', 'gallery', 'gg', 'gift', 'gifts', 'glass', 'global', 'gold', 'golf', 'graphics', 'gratis', 'green', 'gripe', 'guide', 'guru', 'haus', 'healthcare', 'help', 'hiv', 'hockey', 'holdings', 'holiday', 'host', 'house', 'im', 'immo', 'immobilien', 'in', 'industries', 'info', 'ink', 'institute', 'insure', 'international', 'investments', 'io', 'irish', 'it', 'jewelry', 'jp', 'kaufen', 'kim', 'kitchen', 'kiwi', 'land', 'lease', 'legal', 'lgbt', 'life', 'lighting', 'limited', 'limo', 'link', 'live', 'loan', 'loans', 'lol', 'maison', 'management', 'marketing', 'mba', 'me', 'me.uk', 'media', 'memorial', 'mobi', 'moda', 'money', 'mortgage', 'movie', 'mx', 'name', 'net', 'net.au', 'net.nz', 'network', 'news', 'ninja', 'nl', 'onl', 'online', 'org', 'org.nz', 'org.uk', 'partners', 'parts', 'photo', 'photography', 'photos', 'pics', 'pictures', 'pink', 'pizza', 'place', 'plumbing', 'plus', 'poker', 'porn', 'pro', 'productions', 'properties', 'pub', 'qpon', 'recipes', 'red', 'reise', 'reisen', 'rentals', 'repair', 'report', 'republican', 'restaurant', 'reviews', 'rip', 'rocks', 'ruhr', 'run', 'sale', 'sarl', 'school', 'schule', 'se', 'services', 'sex', 'sexy', 'sh', 'shiksha', 'shoes', 'show', 'singles', 'soccer', 'social', 'solar', 'solutions', 'studio', 'style', 'sucks', 'supplies', 'supply', 'support', 'surgery', 'systems', 'tattoo', 'tax', 'taxi', 'team', 'technology', 'tennis', 'theater', 'tienda', 'tips', 'tires', 'today', 'tools', 'tours', 'town', 'toys', 'trade', 'training', 'tv', 'uk', 'university', 'uno', 'us', 'vacations', 'vc', 'vegas', 'ventures', 'vg', 'viajes', 'video', 'villas', 'vision', 'voyage', 'watch', 'website', 'wien', 'wiki', 'works', 'world', 'wtf', 'xyz', 'zone']

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
              { result.suggestions.map((suggestion, index) => (
                <Result { ...this._getResult(suggestion) } key={`suggestion_${index}`} />
              )) }
            </div>
          }
          { status === 'loading' &&
            <Loader { ...this._getLoader() } />
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

  _getLoader() {
    return {
      label: 'Checking domain availability'
    }
  }

  _getMessage() {
    return {
      icon: 'search',
      title: 'Lookup Domain',
      text: 'Enter a domain name above to check its availability'
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
    const { status } = this.state
    const tld = name.split('.').slice(1).join('.')
    const valid =_.includes(tlds, tld)
    if(!valid) return
    this.setState({ name })
  }

}

export default Lookup
