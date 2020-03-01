export const conditional = async (req, params) => {

  const { contact, enrollment, response, step } = params

  return {
    condition: {
      parent: step.get('code'),
      answer: 'answer',
      delta: 0
    }
  }

}
