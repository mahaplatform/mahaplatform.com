exports.handler = async (event, context) => {

  return {
    statusCode: 200,
    body: 'true',
    headers: {
      'Content-Type': 'application/xml'
    }
  }

}
