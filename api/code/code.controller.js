const codeService = require('./code.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getBlocks(req, res) {
  try {
    const blocks = await codeService.query()
    res.json(blocks)
  } catch (err) {
    logger.error('Failed to get blocks', err)
    res.status(500).send({ err: 'Failed to get blocks' })
  }
}

async function getBlockById(req, res) {
  try {
    const blockId = req.params.id
    const block = await codeService.getById(blockId)
    res.json(block)
  } catch (err) {
    logger.error('Failed to get block', err)
    res.status(500).send({ err: 'Failed to get block' })
  }
}

async function updateBlock(req, res) {
  try {
    const block = req.body
    console.log(block)
    const updatedBlock = await codeService.update(block.code)
    // socketService.customBroadcast({ type: 'load-block', data: block.block._id, socketId: block.socketId })
    res.json(updatedBlock)

  } catch (err) {
    logger.error('Failed to update block', err)
    res.status(500).send({ err: 'Failed to update block' })

  }
}

module.exports = {
  getBlocks,
  getBlockById,
  updateBlock,
}
