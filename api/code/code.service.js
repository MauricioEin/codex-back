const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('block')
        var blocks = await collection.find().toArray()
        return blocks
    } catch (err) {
        logger.error('cannot find blocks', err)
        throw err
    }
}

async function getById(blockId) {
    try {
        const collection = await dbService.getCollection('block')
        const block = collection.findOne({ _id: ObjectId(blockId) })
        return block
    } catch (err) {
        logger.error(`while finding block ${blockId}`, err)
        throw err
    }
}

async function update(block) {
    try {
        const collection = await dbService.getCollection('block')
        const auxBlock = {...block}
        delete auxBlock._id
        await collection.updateOne({ _id: ObjectId(block._id) }, { $set: auxBlock })
        return block

    } catch (err) {
        logger.error(`cannot update block ${block._id}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    update,
}
