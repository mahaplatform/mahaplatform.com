const getARecord = ({ name, value }) => ({
  Name: name,
  ResourceRecords: [
    { Value: value }
  ],
  TTL: 60,
  Type: 'A'
})

const getCNAMERecord = ({ name, value }) => ({
  Name: name,
  ResourceRecords: [
    { Value: value }
  ],
  TTL: 60,
  Type: 'CNAME'
})

export const getRecordType = (record) => {
  if(record.type === 'A') return getARecord(record)
  if(record.type === 'CNAME') return getCNAMERecord(record)
}
