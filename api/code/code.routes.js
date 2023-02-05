const express = require('express')
const { getBlocks, getBlockById, updateBlock } = require('./code.controller')
const router = express.Router()

router.get('/', getBlocks)
router.get('/:id', getBlockById)
router.put('/:id', updateBlock)

module.exports = router