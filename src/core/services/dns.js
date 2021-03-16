import dns from 'dns'

export const lookup = async ({ name, type }) => {
  const resolver = new dns.promises.Resolver()
  return await resolver.resolve(name, type)
}
