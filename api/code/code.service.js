const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('code')
        var codes = await collection.find().toArray()
        return codes
    } catch (err) {
        logger.error('cannot find codes', err)
        throw err
    }
}

async function getById(codeId) {
    try {
        const collection = await dbService.getCollection('code')
        const code = collection.findOne({ _id: ObjectId(codeId) })
        return code
    } catch (err) {
        logger.error(`while finding code ${codeId}`, err)
        throw err
    }
}

async function update(code) {
    try {
       
        const collection = await dbService.getCollection('code')
        await collection.updateOne({ _id: ObjectId(code._id) }, { $set: { ...code } })
        return code

    } catch (err) {
        logger.error(`cannot update code ${code._id}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    update,
}
