import moment from 'moment'

const timestampsEnrichment = async(req, event, raw) => {

  const format = 'YYYY-MM-DD HH:mm:ss.SSS Z'

  return {
    ...event,
    dvce_sent_tstamp: moment(event.dvce_sent_tstamp, 'x').format(format),
    dvce_created_tstamp: moment(event.dvce_created_tstamp, 'x').format(format),
    collector_tstamp: moment(raw.get('created_at')).format(format),
    etl_timetamp: moment().format(format)
  }

}

export default timestampsEnrichment
