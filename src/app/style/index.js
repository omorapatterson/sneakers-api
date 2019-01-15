const repository = require('src/infra/repositories/style')
const { Style } = require('src/domain/style')

const attrs = ['id', 'name', 'category', 'description', 'parent', 'brand', 'isParent', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Style, attrs)
const linkShopsUseCase = require('./link_shops')
const getLinkedShopsUseCase = require('./get_link_shops')
const getPopularUseCase = require('./get_popular')

module.exports = {
  getLinkedShopsUseCase,
  linkShopsUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getPopularUseCase
}
