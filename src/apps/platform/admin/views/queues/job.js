import { List, Page } from 'maha-admin'
import Highlight from 'react-highlight'
import PropTypes from 'prop-types'
import format from 'json-format'
import moment from 'moment'
import React from 'react'

const Details = ({ job }) => {

  const config = {
    sections: [
      {
        items: [
          { label: 'Timestamp', content: moment(job.timestamp).format('MM/DD/YY hh:mmA') },
          { label: 'Attempts', content: job.attemptsMade }
        ]
      }, {
        title: 'Job',
        items: [
          { component: (
            <div className="maha-code">
              <Highlight className="javascript">
                { format(job.data, { type: 'space', size: 2 }) }
              </Highlight>
            </div>
          ) }
        ]
      }, {
        title: 'Errors',
        items: [
          { component: (
            <div className="maha-code">
              { job.stacktrace.length > 0 && job.stacktrace.map((stacktrace, index) => (
                <Highlight className="javascript" key={`stacktrace_${index}`}>
                  { stacktrace }
                </Highlight>
              )) }
            </div>
          ) }
        ]
      }
    ]
  }

  return (
    <div className="platform-job">
      <List { ...config } />
    </div>
  )

}

Details.propTypes = {
  job: PropTypes.object
}

const getTabs = ({ job }) => ({
  items:  [
    { label: 'Details', component: <Details job={ job } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  job: `/api/admin/platform/queues/${props.params.name}/jobs/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Job',
  tabs: getTabs(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
