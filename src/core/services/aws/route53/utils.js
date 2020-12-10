const getARecord = ({ name, value }) => ({
  Name: name,
  ResourceRecords: [
    { Value: value }
  ],
  TTL: 60,
  Type: 'A'
})

const getALIASRecord = ({ name, value }) => ({
  AliasTarget: {
    DNSName: value,
    EvaluateTargetHealth: false,
    HostedZoneId: 'Z2FDTNDATAQYW2'
  },
  Name: name,
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
  if(record.type === 'ALIAS') return getALIASRecord(record)
  if(record.type === 'CNAME') return getCNAMERecord(record)
}
