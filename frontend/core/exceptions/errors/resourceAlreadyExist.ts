import { MAPPEDENTTIES } from '../mapper/mappedEntities'

export default class ResourceAlreadyExist extends Error {
  constructor(errorOptions?: { resource: string; field?: string }) {
    const { resource, field } = errorOptions || {}

    var message = 'Recurso já existe.'

    if (resource) {
      const mappedResource = MAPPEDENTTIES[resource.toLowerCase()] || resource

      message = field
        ? `já existe ${mappedResource} com este ${field}.`
        : `${mappedResource} já existe.`
    }

    super(message)
    this.name = 'ResourceAlreadyExist'
  }
}
