import { interpolateTemplate } from '@apps/maha/services/templates'

const getData = (req, { code, data, email_address }) => ({
  ...data || {},
  email: {
    ...data.email || {},
    ...code ? {
      code,
      facebook_link: `${process.env.ADMIN_HOST}/so/fb/${code}`,
      twitter_link: `${process.env.ADMIN_HOST}/so/tw/${code}`,
      forward_link: `${process.env.ADMIN_HOST}/fo/${code}`,
      linkedin_link: `${process.env.ADMIN_HOST}/so/li/${code}`,
      pinterest_link: `${process.env.ADMIN_HOST}/so/pi/${code}`,
      web_link: `${process.env.ADMIN_HOST}/wv/${code}`,
      ...email_address ? {
        preferences_link: `${process.env.ADMIN_HOST}/crm/p${code}${email_address.get('code')}`
      } : {}
    } : {}
  }
})

const personalizeEmail = (req, params) => {
  const data = getData(req, {
    code: params.code,
    data: params.data,
    email_address: params.email_address
  })
  return {
    subject: interpolateTemplate(req, {
      template: params.subject,
      data
    }),
    html: interpolateTemplate(req, {
      template: params.html,
      data
    })
  }
}

export default personalizeEmail
