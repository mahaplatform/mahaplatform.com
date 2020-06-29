import { toFilter } from '../../../../../../../core/utils/criteria'
import moment from 'moment'
import _ from 'lodash'

const castValue = (value) => {
  if(_.isNil(value)) return null
  if(`${value}` === 'true') return true
  if(`${value}` === 'false') return false
  if(/^[\d]+\.?[\d]*$/.test(value)) return Number(value)
  return value.toLowerCase()
}

const testNull = (left, right) => {
  return test === null
}

const testNotNull = (left, right) => {
  return test !== null
}

const testEquals = (left, right) => {
  return castValue(left) === castValue(right)
}

const testNotEquals = (left, right) => {
  return castValue(left) !== castValue(right)
}

const testKnown = (left, right) => {
  return left !== null && left.length > 0
}

const testNotKnown = (left, right) => {
  return left === null || left.length === 0
}

const testLike = (left, right) => {
  return left !== null && left.search(right) >= 0
}

const testNotLike = (left, right) => {
  return left !== null && left.search(right) < 0
}

const testIn = (left, right) => {
  return _.includes(right, left)
}

const testNotIn = (left, right) => {
  return !_.includes(right, left)
}

const testAn = (left, right) => {
  return left === 'completed'
}

const testNotAn = (left, right) => {
  return left !== 'completed'
}

const testContains = (left, right) => {
  return _.includes(left, right)
}

const testNotContains = (left, right) => {
  return !_.includes(left, right)
}

const testLessThan = (left, right) => {
  return left < right
}

const testLessThanEqual = (left, right) => {
  return left <= right
}

const testGreaterThan = (left, right) => {
  return left > right
}

const testGreaterThanEqual = (left, right) => {
  return left >= right
}

const getEvaluator = (comparison) => {
  if(comparison === '$nl') return testNull
  if(comparison === '$nnl') return testNotNull
  if(comparison === '$eq') return testEquals
  if(comparison === '$neq') return testNotEquals
  if(comparison === '$ck') return testEquals
  if(comparison === '$nck') return testNotEquals
  if(comparison === '$kn') return testKnown
  if(comparison === '$nkn') return testNotKnown
  if(comparison === '$lk') return testLike
  if(comparison === '$nlk') return testNotLike
  if(comparison === '$in') return testIn
  if(comparison === '$nin') return testNotIn
  if(comparison === '$an') return testAn
  if(comparison === '$nan') return testNotAn
  if(comparison === '$ct') return testContains
  if(comparison === '$nct') return testNotContains
  if(comparison === '$lt') return testLessThan
  if(comparison === '$lte') return testLessThanEqual
  if(comparison === '$gt') return testGreaterThan
  if(comparison === '$gte') return testGreaterThanEqual
}

const evaluateAnd = async (filter, data) => {
  return await Promise.reduce(filter.$and, async (found, condition) => {
    return found === false ? found : await evaluate(condition, data)
  }, null)
}

const evaluateOr = async (filter, data) => {
  return await Promise.reduce(filter.$or, async (found, condition) => {
    return found === true ? found : await evaluate(condition, data)
  }, null)
}

const evaluateCondition = async (filter, data) => {
  const key = Object.keys(filter)[0]
  const left = _.get(data, key) || null
  const comparison = Object.keys(filter[key])[0]
  const right = Object.values(filter[key])[0]
  const evaluator = getEvaluator(comparison)
  return evaluator(left, right)
}

const evaluate = async (filter, data) => {
  if(filter.$and) return evaluateAnd(filter, data)
  if(filter.$or) return evaluateOr(filter, data)
  return await evaluateCondition(filter, data)
}

const getBranch = async (branches, data) => {
  return await Promise.reduce(branches, async (found, branch) => {
    if(found !== null) return found
    const filter = toFilter(branch.criteria)
    return await evaluate(filter, data) ? branch : null
  }, null) || { code: 'else', name: 'else' }
}

const getResponseData = async (req, { enrollment }) => {

  await enrollment.load(['response'], {
    transacting: req.trx
  })

  return {
    response: enrollment.related('response').get('data')
  }

}

const getRegistrationData = async (req, { enrollment }) => {

  await enrollment.load(['registration'], {
    transacting: req.trx
  })

  return {
    registration: enrollment.related('registration').get('data')
  }

}

const getWorkflowData = async (req, { enrollment, steps }) => ({
  workflow: enrollment.get('data')
})

const getEmailData = async (req, { enrollment }) => {

  await enrollment.load(['email'], {
    transacting: req.trx
  })

  const activities = ['was_opened','was_clicked','was_shared','was_webviewed','was_unsubscribed']

  return {
    email: {
      activities: activities.reduce((activities, activity) => [
        ...activities,
        ...enrollment.related('email').get(activity) ? [activity] : []
      ], [])
    }
  }

}

const getEnrollmentData = async (req, { enrollment, steps }) => {

  if(enrollment.get('response_id')) {
    return await getResponseData(req, { enrollment })
  }

  if(enrollment.get('registration_id')) {
    return await getRegistrationData(req, { enrollment })
  }

  if(enrollment.get('workflow_id') || enrollment.get('sms_campaign_id') || enrollment.get('voice_campaign_id')) {
    return await getWorkflowData(req, { enrollment, steps })
  }

  if(enrollment.get('email_id')) {
    return await getEmailData(req, { enrollment })
  }

  return {}

}

const getProgramData = async (req, { contact, program }) => ({
  program: program.related('fields').reduce((programvalues, field) => ({
    ...programvalues,
    [field.get('name').token]: _.get(contact.get('values'), `${field.get('code')}[0]`)
  }), {})
})

const extractValues = async (req, { values, fieldMap }) => {
  return Object.keys(values).reduce((extracted, code) => {
    const field = fieldMap[code]
    const type = field.get('type')
    const config = field.get('config')
    const value = values[code]
    return {
      ...extracted,
      [code]: type === 'checkboxgroup' || config.multiple === true ? value : value[0]
    }
  }, {})
}

const getContactData = async (req, { contact, fields }) => {

  await contact.load(['lists','organizations','tags','topics','responses','registrations','import_items'], {
    transacting: req.trx
  })

  const fieldMap = fields.reduce((map, field) => ({
    ...map,
    [field.get('code')]: field
  }))

  return {
    contact: {
      full_name: contact.get('full_name'),
      first_name: contact.get('first_name'),
      last_name: contact.get('last_name'),
      email: contact.get('email'),
      phone: contact.get('phone'),
      address: contact.get('address'),
      birthday: contact.get('birthday'),
      spouse: contact.get('spouse'),
      values: extractValues(contact.get('values'), fieldMap),
      list_ids: contact.related('lists').map(list => list.get('id')),
      organization_ids: contact.related('organizations').map(organization => organization.get('id')),
      tag_ids: contact.related('tags').map(tag => tag.get('id')),
      topic_ids: contact.related('topics').map(topic => topic.get('id')),
      event_ids: contact.related('registrations').map(registration => registration.get('event_id')),
      form_ids: contact.related('responses').map(response => response.get('form_id')),
      import_ids: contact.related('import_items').map(item => item.get('import_id'))
    }
  }

}

const getEnvironmentData = async () => ({
  environment: {
    day: moment().day()
  }
})

const ifThenStep = async (req, { config, contact, enrollment, fields, steps, step, workflow }) => {

  const contactData = await getContactData(req, {
    contact,
    fields
  })

  const programData = await getProgramData(req, {
    contact,
    program: workflow.related('program')
  })

  const enrollmentData = await getEnrollmentData(req, {
    enrollment,
    steps
  })

  const environmentData = await getEnvironmentData()

  const branch = await getBranch(config.branches, {
    ...contactData,
    ...programData,
    ...environmentData,
    ...enrollmentData
  })

  return {
    action: {
      data: {
        branch: branch.name
      }
    },
    condition: {
      parent: step.get('code'),
      answer: branch.code,
      delta: -1
    }
  }

}

export default ifThenStep