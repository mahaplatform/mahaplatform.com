import QualtricsSdk from 'qualtrics-sdk-node'

const listRoute = async (req, profile) => {

  const qualtrics = new QualtricsSdk({
    dataCenter: 'cornell.ca1',
    apiToken: '2lRfKlEUsNf5h7fn4FAy57BR2XXgEuGrch8v6Vyc'
  })

  const surveys = await qualtrics.surveys.listAllSurveys()

  return surveys

}

export default listRoute
