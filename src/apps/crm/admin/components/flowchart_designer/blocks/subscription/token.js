import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Token = ({ action, list }) => {
  if(!action || !list) return null
  const description = _.find(actions, { value: action })
  return (
    <div>
      { _.capitalize(description.value) } { list &&
        <span>{ list.title }</span>
      }
    </div>
  )
}

Token.propTypes = {
  action: PropTypes.string,
  list: PropTypes.object
}

export default Token
