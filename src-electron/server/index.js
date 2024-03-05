/* eslint-disable prefer-promise-reject-errors */
import app from './server'
import http from 'http'

const port = 25565
var server = null
app.set('port', port)

export default {
  StatrServer () {
    return new Promise((resolve, reject) => {
      server = http.createServer(app)
      server.listen(port)
      server.on('error', (error) => {
        switch (error.code) {
          case 'EACCES':
            reject('Insufficient permissions. The built-in server failed to start. Please run it with administrator permissions.')
            break
          case 'EADDRINUSE':
            reject('The built-in server port is occupied, please check')
            break
          default:
            reject(error)
        }
      })
      server.on('listening', () => {
        resolve('Server is running')
      })
    })
  },
  StopServer () {
    return new Promise((resolve, reject) => {
      if (server) {
        server.close()
        server.on('close', () => {
          server = null
          resolve(1)
        })
      } else {
        reject('The server has not been started yet')
      }
    })
  }
}
