// import { Socket } from 'socket.io'
// import { io } from './app'

// function IO() {
//   io.on('connection', (socket: Socket) => {
//     console.log('socket user connected')

//     const userString = socket.handshake.query.user as string
//     const user = JSON.parse(userString)

//     // Now, you can use the 'user' object as needed
//     console.log('User:', user)

//     socket.on('send-message', data => {
//       console.log(data)
//       //   chatService.chat_message(data)
//     })

//     socket.on('disconnect', () => {
//       console.log('user disconnected')
//     })
//   })
// }

// IO()
