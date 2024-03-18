import pino from 'pino'

export default pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l',
      ignore: 'pid,hostname',
    },
  },
})