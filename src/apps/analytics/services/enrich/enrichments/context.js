const contextEnrichment = async(req, event) => {

  if(!event.contexts) return event

  const webpagecontext = event.contexts.data.find(context => {
    return context.schema === 'iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0'
  })

  return {
    ...event,
    context_id: webpagecontext ? webpagecontext.data.id : null
  }

}

export default contextEnrichment
