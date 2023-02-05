const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

// cors
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5174', 'http://localhost:5174'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// routes
const codeRoutes = require('./api/code/code.routes')
app.use('/api/code', codeRoutes)

// setup sockets
const { setupSocketAPI } = require('./services/socket.service')
setupSocketAPI(http)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3333
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})