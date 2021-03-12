export default async function fetchData(endpoint) {
  const res = await fetch(`${process.env.WEB_HOST}${endpoint}`)
  const errorCode = res.ok ? false : res.status
  const json = await res.json()
  return {
    errorCode,
    data: json.data
  }
}
