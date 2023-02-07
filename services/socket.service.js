const logger = require('./logger.service')

var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('set-topic', async topic => {
            if (socket.myTopic === topic) return
            if (socket.myTopic) {
                // (beacuse it is connected to the previous topic)
                socket.leave(socket.myTopic)
                logger.info(`Socket is leaving topic ${socket.myTopic} [id: ${socket.id}]`)
            }
            socket.join(topic)
            socket.myTopic = topic
            logger.info(`Socket is joining topic ${socket.myTopic} [id: ${socket.id}]`)
            const sockets = await gIo.in(topic).fetchSockets()
            socket.emit('joined-topic', sockets.length !== 2)
            socket.broadcast.to(topic).emit('fellow-joined')

        })

        socket.on('code-update', (answer) => {
            logger.info(
                `answer updated from socket [id: ${socket.id}]`
            )
            // emits to other sockets in the same room
            socket.broadcast.to(socket.myTopic).emit('code-updated', answer)
        })
    })
}

module.exports = {
    setupSocketAPI
}
