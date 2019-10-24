const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Shop(body)
      await repository.updateShop(domain, id)      
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  update
}
