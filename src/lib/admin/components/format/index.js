import { parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'
import React from 'react'

class Format extends React.Component {

  static propTypes = {
    format: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string
    ]),
    value: PropTypes.any
  }

  render() {
    const { format } = this.props
    if(_.isString(format)) {
      const [,style,details] = format.match(/([^|]*)\|?(.*)/)
      if(style === 'status') {
        return Status(this.props)
      } else if(style === 'currency') {
        return Currency(this.props)
      } else if(style === 'percent') {
        return Percent(this.props)
      } else if(style === 'rate') {
        return Rate(this.props)
      } else if(style === 'number') {
        const template = details || '0'
        return Number(this.props, template)
      } else if(style === 'duration') {
        return Duration(this.props)
      } else if(style === 'date') {
        const template = details || 'MM/DD/YY'
        return Date(this.props, template)
      } else if(style === 'datetime') {
        const template = details || 'MM/DD/YY @ hh:mm A'
        return Date(this.props, template)
      } else if(style === 'time') {
        const template = details || 'hh:mm A'
        return Date(this.props, template)
      } else if(style === 'check_times') {
        return Check(this.props, true)
      } else if(style === 'yes_no') {
        return YesNo(this.props, true)
      } else if(style === 'check') {
        return Check(this.props, false)
      } else if(style === 'capitalize') {
        return Capitalize(this.props)
      } else if(style === 'email') {
        return Email(this.props)
      } else if(style === 'phone') {
        return Phone(this.props)
      } else if(style === 'link') {
        return Link(this.props)
      } else if(style === 'raw') {
        return Raw(this.props)
      } else if(style === 'from') {
        return From(this.props)
      } else if(style === 'element') {
        return Element(this.props)
      } else if(this.props.value === '') {
        return Empty(this.props)
      } else {
        return Default(this.props)
      }
    } else if(_.isFunction(format)) {
      return format(this.props)
    } else {
      return Default(this.props)
    }
  }

}

const Default = (props) => {
  return <span>{ props.value }</span>
}

const From = (props) => {
  const diff = moment(props.value).diff(moment(), 'hour')
  const unit = Math.abs(diff) > 24 ? 'day' : 'hour'
  const adjusted = Math.abs(moment(props.value).diff(moment(), unit))
  if(diff > 0) return <span>in { pluralize(unit, adjusted, true) }</span>
  return <span>{ pluralize(unit, adjusted, true) } ago</span>
}

const Element = (props) => {
  return <props.value />
}

const Raw = (props) => {
  return <span dangerouslySetInnerHTML={{ __html: props.value }}></span>
}

const Empty = () => {
  return <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }}></span>
}

const Status = (props) => {
  return props.value ? <span className={ props.value.toLowerCase() }>{ props.value.toUpperCase() }</span> : <span />
}

const Check = (props, times) => (
  <span className="checktimes">
    { props.value === true &&
      <i className="fa fa-check" />
    }
    { times && props.value === false&&
      <i className="fa fa-times" />
    }
  </span>
)

const YesNo = (props) => {
  if(props.value === false) return <span className="no">NO</span>
  if(props.value === true) return <span className="yes">YES</span>
  return null
}

const Currency = (props) => {
  return <span>{ numeral(props.value).format('0,0.00') }</span>
}

const Percent = (props) => {
  return <span>{ numeral(props.value).format('0.00%') }</span>
}

const Rate = (props) => {
  return <span>{ numeral(props.value).format('0.0%') }</span>
}

const Number = (props, format) => {
  return <span>{ numeral(props.value).format(format) }</span>
}

const Duration = (props, format) => {
  const pad = (value) => _.padStart(value, 2, 0)
  const minutes = Math.floor(props.value / 60)
  const seconds = (props.value  - (minutes * 60)) % 60
  const parts = [ pad(minutes), pad(seconds) ]
  return parts.join(':')
}

const Date = (props, format) => {

  const _parseDate = (value) => {
    const dateStr = value.toString()
    if(dateStr.match(/^\d{4}-\d{2}-\d{2} \d{2}\:\d{2}\:\d{2}$/)) {
      return moment(value, 'YYYY-MM-DD hh:mm:ss')
    } else if(dateStr.toString().match(/^\d{2}\:\d{2}\:\d{2}$/)) {
      return moment(value, 'hh:mm:ss')
    } else {
      return moment(value)
    }
  }

  return <span>{ props.value ? _parseDate(props.value).format(format) : '' }</span>

}

const Capitalize = (props) => {
  return <span>{ props.value.toUpperCase() }</span>
}

const Email = (props) => {
  return <a href={ `mailto:${ props.value }` }>{ props.value }</a>
}

const Phone = (props) => {
  if(!props.value) return ''
  const phoneNumber = parsePhoneNumberFromString(props.value, 'US')
  return phoneNumber.formatNational()
}

const Link = (props) => {
  return <a href={ props.value } target="_blank">{ props.value }</a>
}

export default Format
