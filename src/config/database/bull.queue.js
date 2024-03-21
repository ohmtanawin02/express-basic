import Queue from 'bull'

const reportQueue = new Queue('report', {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: ''
  },
  defaultJobOptions: {
    attempts: 5,
    removeOnComplete: true
  }
})

export default reportQueue
