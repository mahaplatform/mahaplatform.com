import moment from 'moment'

const performanceRoute = async (req, res) => {

  const data = {
    metrics: {
      responses: 155
    },
    totals: {
      responses: 155
    },
    data: {
      responses: [
        { x: moment().subtract(15, 'days'), y: 0 },
        { x: moment().subtract(14, 'days'), y: 0 },
        { x: moment().subtract(13, 'days'), y: 0 },
        { x: moment().subtract(12, 'days'), y: 0 },
        { x: moment().subtract(11, 'days'), y: 0 },
        { x: moment().subtract(10, 'days'), y: 0 },
        { x: moment().subtract(9, 'days'), y: 5 },
        { x: moment().subtract(8, 'days'), y: 15 },
        { x: moment().subtract(7, 'days'), y: 33 },
        { x: moment().subtract(6, 'days'), y: 40 },
        { x: moment().subtract(5, 'days'), y: 50 },
        { x: moment().subtract(4, 'days'), y: 5 },
        { x: moment().subtract(3, 'days'), y: 10 },
        { x: moment().subtract(2, 'days'), y: 0 },
        { x: moment().subtract(1, 'days'), y: 0 }
      ]
    }
  }

  res.status(200).respond(data)

}

export default performanceRoute
