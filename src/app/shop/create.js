const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const create = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Shop(body)
      await repository.createShop(domain, id)
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  create
}
