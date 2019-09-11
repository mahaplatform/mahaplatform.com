import { Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Numbers extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    areacode: PropTypes.object,
    address: PropTypes.object,
    numbers: PropTypes.array,
    status: PropTypes.string,
    onChoose: PropTypes.func,
    onLookup: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {},
    onReady: () => {}
  }

  render() {
    const { numbers, status } = this.props
    if(status !== 'success') return <Loader />
    return (
      <div className="numbers">
        { numbers.map((number, index) => (
          <div className="numbers-number" key={`number_${index}`}>
            <strong>{ number.friendlyName }</strong><br />
            { number.locality }, { number.region }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { address, areacode, onLookup, onReady } = this.props
    const { latitude, longitude } = address
    onLookup(areacode, latitude, longitude)
    onReady()
  }

  componentDidUpdate(prevProps) {}


}

export default Numbers
