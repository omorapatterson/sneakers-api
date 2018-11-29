const repository = require('src/infra/repositories/shop')

const updateMainImage = (id, mainImage) => {
  return new Promise(async (resolve, reject) => {
    try {
      await repository.update({ mainImage: mainImage }, id)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { updateMainImage }
