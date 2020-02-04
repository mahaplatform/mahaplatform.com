import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Token = ({ action, list }) => {
  const description = _.find(actions, { value: action })
  return (
    <div>
      { list &&
        <div>
          { description.text }
          { list.title }
        </div>
      }
    </div>
  )
}

Token.propTypes = {
  action: PropTypes.string,
  list: PropTypes.object
}

export default Token
