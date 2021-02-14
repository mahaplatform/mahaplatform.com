const getEnrollmentParent = async (req, { enrollment }) => {

  if(enrollment.get('workflow_id')) {
    await enrollment.load(['workflow.program'], {
      transacting: req.trx
    })
    return enrollment.related('workflow')
  }

  if(enrollment.get('sms_campaign_id')) {
    await enrollment.load(['sms_campaign.program'], {
      transacting: req.trx
    })
    return enrollment.related('voice_campaign')
  }

  if(enrollment.get('voice_campaign_id')) {
    await enrollment.load(['voice_campaign.program'], {
      transacting: req.trx
    })
    return enrollment.related('voice_campaign')
  }

}

export default getEnrollmentParent
