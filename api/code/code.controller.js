const codeService = require('./code.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getCodes(req, res) {
  try {
    logger.debug('Getting Codes')
    const codes = await codeService.query()
    res.json(codes)
  } catch (err) {
    logger.error('Failed to get codes', err)
    res.status(500).send({ err: 'Failed to get codes' })
  }
}

async function getCodeById(req, res) {
  try {
    const codeId = req.params.id
    const code = await codeService.getById(codeId)
    res.json(code)
  } catch (err) {
    logger.error('Failed to get code', err)
    res.status(500).send({ err: 'Failed to get code' })
  }
}

async function updateCode(req, res) {
  try {
    const code = req.body
    console.log(code)
    const updatedCode = await codeService.update(code.code)
    // socketService.customBroadcast({ type: 'load-code', data: code.code._id, socketId: code.socketId })
    res.json(updatedCode)

  } catch (err) {
    logger.error('Failed to update code', err)
    res.status(500).send({ err: 'Failed to update code' })

  }
}

module.exports = {
  getCodes,
  getCodeById,
  updateCode,
}
