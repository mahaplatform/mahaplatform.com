import { getClient } from '@apps/maha/admin/api/profiles/services/adobesign'
import Agreement from '@apps/maha/models/agreement'
import moment from 'moment'
import URL from 'url'
import qs from 'qs'

const processDocument = async (req, { client, adobeagreement, profile }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const status = await client.request(req, {
        profile,
        method: 'GET',
        endpoint: `api/rest/v6/agreements/${adobeagreement.id}`
      })
      if(status.status !== 'DOCUMENTS_NOT_YET_PROCESSED') resolve(status.status)
      const nextstatus = await processDocument(req, { client, adobeagreement, profile })
      resolve(nextstatus)
    }, 500)
  })
}

const createAgreement = async (req, { profile, asset, email }) => {

  const client = await getClient(req, profile)

  const agreement = await Agreement.forge({
    team_id: req.team.get('id'),
    unsigned_id: asset.get('id'),
    email
  }).save(null, {
    transacting: req.trx
  })

  const adobeagreement = await await client.request(req, {
    method: 'POST',
    endpoint: 'api/rest/v6/agreements',
    body: {
      fileInfos: [
        {
          urlFileInfo: {
            mimeType: asset.get('content_type'),
            name: asset.get('original_file_name'),
            url: asset.get('signed_url')
          }
        }
      ],
      name: asset.get('original_file_name'),
      expirationTime: moment().add(1, 'day').format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
      participantSetsInfo: [
        {
          memberInfos: [
            { email }
          ],
          order: 1,
          role: 'SIGNER'
        }
      ],
      emailOption: {
        sendOptions: {
          initEmails: 'NONE',
          inFlightEmails: 'NONE',
          completionEmails: 'NONE'
        }
      },
      postSignOption: {
        redirectDelay: 0,
        redirectUrl: `${process.env.WEB_HOST}/adobesign/complete`
      },
      externalId: {
        id: agreement.get('id')
      },
      signatureType: 'ESIGN',
      state: 'IN_PROCESS'
    }
  })

  await processDocument(req, { client, adobeagreement, profile })

  const urls = await client.request(req, {
    profile,
    method: 'GET',
    endpoint: `api/rest/v6/agreements/${adobeagreement.id}/signingUrls`
  })

  const { esignUrl } = urls.signingUrlSetInfos[0].signingUrls[0]

  const url = URL.parse(esignUrl)

  const params = qs.parse(url.search.substr(1))

  await agreement.save({
    adobe_agreement_id: adobeagreement.id,
    adobe_signing_id: params.pid
  }, {
    transacting: req.trx
  })

  return agreement

}

export default createAgreement
