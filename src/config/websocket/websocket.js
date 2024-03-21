const websockets = async (io) => {
  io.on('connection', async (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on('join_room', (event) => {
      const { id } = event
      socket.join(`agent-${id}`)
      console.log(`${socket.id} join agent-${id}`)
    })

    socket.on('leave_room', (event) => {
      const { id } = event
      socket.leave(`agent-${id}`)
      console.log(`${socket.id} leave agent-${id}`)
    })
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`)
    })
  })
}

export default websockets
