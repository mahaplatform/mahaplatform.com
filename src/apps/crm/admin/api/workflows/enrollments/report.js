import moment from 'moment'

const reportRoute = async (req, res) => {

  const data = {
    enrolled: [
      { x: moment().subtract(5, 'months'), y: 10 },
      { x: moment().subtract(4, 'months'), y: 50 },
      { x: moment().subtract(3, 'months'), y: 85 },
      { x: moment().subtract(2, 'months'), y: 62 },
      { x: moment().subtract(1, 'months'), y: 16 }
    ],
    active: [
      { x: moment().subtract(5, 'months'), y: 5 },
      { x: moment().subtract(4, 'months'), y: 3 },
      { x: moment().subtract(3, 'months'), y: 20 },
      { x: moment().subtract(2, 'months'), y: 22 },
      { x: moment().subtract(1, 'months'), y: 124 }
    ],
    lost: [
      { x: moment().subtract(5, 'months'), y: 15 },
      { x: moment().subtract(4, 'months'), y: 43 },
      { x: moment().subtract(3, 'months'), y: 60 },
      { x: moment().subtract(2, 'months'), y: 22 },
      { x: moment().subtract(1, 'months'), y: 13 }
    ],
    completed: [
      { x: moment().subtract(5, 'months'), y: 10 },
      { x: moment().subtract(4, 'months'), y: 50 },
      { x: moment().subtract(3, 'months'), y: 85 },
      { x: moment().subtract(2, 'months'), y: 62 },
      { x: moment().subtract(1, 'months'), y: 16 }
    ],
    conversions: [
      { x: moment().subtract(5, 'months'), y: 5 },
      { x: moment().subtract(4, 'months'), y: 32 },
      { x: moment().subtract(3, 'months'), y: 30 },
      { x: moment().subtract(2, 'months'), y: 25 },
      { x: moment().subtract(1, 'months'), y: 10 }
    ]
  }

  res.status(200).respond(data)

}

export default reportRoute
