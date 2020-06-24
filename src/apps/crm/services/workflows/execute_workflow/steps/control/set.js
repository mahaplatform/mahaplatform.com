const setStep = async (req, { config }) => {

  const value = config.value

  return {
    action: {
      data: {
        [config.code]: value
      }
    }
  }

}

export default setStep
