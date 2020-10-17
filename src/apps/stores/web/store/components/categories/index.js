import PropTypes from 'prop-types'
import React from 'react'

class Categories extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    Store: PropTypes.object
  }

  state = {
    selected: null
  }

  render() {
    // const { categories } = this.props
    const categories = [
      { id: 1, title: 'T-Shirts' },
      { id: 2, title: 'Hats' },
      { id: 3, title: 'Other' },
      { id: 4, title: 'T-Shirts' },
      { id: 5, title: 'Hats' },
      { id: 6, title: 'Other' },
      { id: 4, title: 'T-Shirts' },
      { id: 5, title: 'Hats' },
      { id: 6, title: 'Other' }
    ]
    return (
      <div className="store-categories">
        { categories.map((category, index) => (
          <div className={ this._getClass(index) } key={`category_${index}`} onClick={ this._handleClick.bind(this, index) }>
            { category.title }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      selected: 0
    })
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['store-categories-category']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleClick(selected) {
    this.setState({ selected })
  }

}

export default Categories
