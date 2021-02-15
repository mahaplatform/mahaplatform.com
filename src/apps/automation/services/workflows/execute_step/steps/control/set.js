const setStep = async (req, { step }) => {

  const { code, value } = step.config

  return {
    action: {
      data: {
        [code]: value
      }
    },
    data: {
      [code]: value
    }
  }

}

export default setStep
