const set = async (req, { config }) => {

  const { code, value } = config

  return {
    data: {
      [code]: value
    }
  }

}

export default set
