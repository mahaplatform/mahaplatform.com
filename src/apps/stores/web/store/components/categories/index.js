import PropTypes from 'prop-types'
import React from 'react'

class Categories extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object,
    onChange: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const categories = this._getCategories()
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

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(selected !== prevState.selected) {
      this._handleChange()
    }
  }

  _getCategories() {
    const { store } = this.props
    return [
      { id: 0, title: 'All' },
      ...store.categories
    ]
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['store-categories-category']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getRoute(category) {
    const { selected } = this.state
    const { store } = this.props
    if(selected === 0) return `/stores/stores/${store.code}`
    return `/stores/stores/${store.code}/categories/${category.slug}`
  }

  _handleChange() {
    const { selected } = this.state
    const categories = this._getCategories()
    this.props.onChange(categories[selected].id)
  }

  _handleClick(selected) {
    this.setState({ selected })
  }

}

export default Categories
