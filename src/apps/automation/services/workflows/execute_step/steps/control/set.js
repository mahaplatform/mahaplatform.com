const setStep = async (req, { step }) => {

  const { code, value } = step

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
