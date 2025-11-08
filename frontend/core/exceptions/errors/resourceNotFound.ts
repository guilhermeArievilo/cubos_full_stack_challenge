import { MAPPEDENTTIES } from '../mapper/mappedEntities'

export default class ResourceNotFound extends Error {
  constructor(resource?: string) {
    var message = 'Recurso não encontrado.'

    if (resource) {
      const mappedResource = MAPPEDENTTIES[resource.toLowerCase()] || resource
      message = `${mappedResource} não encontrado.`
    }

    super(message)
    this.name = 'ResourceNotFound'
  }
}
