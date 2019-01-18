const { Release, ReleaseImage } = require('src/domain/release')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.releases
const releaseImageModel = database.models.release_images
const styleModel = database.models.styles

const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getOptionsCallback = (searchParams) => {
  const imageInclude = { model: releaseImageModel, as: 'images' }
  const styleInclude = { model: styleModel, as: 'style', attributes: [ 'id', 'brand', 'category' ] }
  if (searchParams.filter && searchParams.filter.brandId) {
    Object.assign(styleInclude, { where: { brand: searchParams.filter.brandId } })
    delete searchParams.filter.brandId
  }
  return {
    include: [
      imageInclude, styleInclude],
    distinct: true
  }
}

const {
  create,
  update,
  getById,
  destroy,
  getAll
} = BaseRepository(model, Release, { getOptionsCallback })

const createImages = async (id, images) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const newImages = await releaseImageModel.bulkCreate(images)
  await release.addImages(newImages)
  return newImages
}

const getAllImages = async (id) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const images = release.getImages()
  if (!images) {
    return []
  }
  return images.map((data) => {
    const { dataValues } = data
    return ReleaseImage(dataValues)
  })
}

const getPastReleases = async (date) => {
  const releases = await model.findAll({
    where: { releaseDate: { [Op.lt]: date } }
  })
  return releases.map((data) => {
    return Release(data)
  })
}

const destroyImage = (id) => releaseImageModel.destroy({ where: { id } })

module.exports = {
  create,
  update,
  getById,
  destroy,
  getAll,
  createImages,
  destroyImage,
  getAllImages,
  getPastReleases
}
