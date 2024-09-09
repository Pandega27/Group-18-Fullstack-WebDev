import io from 'socket.io-client'

const socket = io('http://localhost:3000')

// Join the room with user ID after login
socket.emit('join', userId)

// Listen for new notifications
socket.on('new_notification', (notification) => {
  console.log('New notification:', notification)
  // Update notification state in the UI
})
