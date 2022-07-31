export default function onConnection(socket) {
 console.log('user connected')
 socket.on('disconnect', function () {
	 console.log('user disconnected')
 })
}
