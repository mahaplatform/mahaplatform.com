const route = async (req, res) => {
  console.log('data', req.body)
  var data=''
  req.setEncoding('utf8')
  req.on('data', function(chunk) {
    console.log('chunk', chunk)
    data += chunk
  })
  req.on('end', function() {
    console.log('end', data)
    res.status(200).send()
  })


}

export default route
