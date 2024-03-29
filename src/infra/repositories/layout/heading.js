const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutHeading } = require('src/domain/layout')

const mapHeading = (headingDomain) => {
    let newHeadingDomain = LayoutHeading(headingDomain)
    newHeadingDomain.headingImgUrl = headingDomain.imgUrl
    return newHeadingDomain
}

const unmapHeading = (dbModel) => {
    let headingDomain = Object.create(dbModel)
    headingDomain.imgUrl = dbModel.headingImgUrl
    return LayoutHeading(headingDomain)
}

module.exports = (database) => {
    const model = database.models.layouts
    const updateHeading = async (page, heading) => {
        let layoutDb = await model.findOne({ where: { page: page } })
        if (!layoutDb) {
            throw new EntityNotFound()
        }
        await layoutDb.updateAttributes(mapHeading(heading))
        return heading
    }

    const getHeading = async (page) => {
        let layoutDB = await model.findOne({ where: { page } })
        if (!layoutDB) {
            throw new EntityNotFound()
        }
        return unmapHeading(layoutDB)
    }

    return {
        updateHeading,
        getHeading
    }
}