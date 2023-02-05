const express = require('express')
const { getCodes, getCodeById, updateCode } = require('./code.controller')
const router = express.Router()

router.get('/', getCodes)
router.get('/:id', getCodeById)
router.put('/:id', updateCode)

module.exports = router