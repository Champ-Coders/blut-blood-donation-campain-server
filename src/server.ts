import mongoose from 'mongoose'
import config from './config/index'
import { app } from './app'

// connect mongoose function
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      // Log a message to the terminal
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Failed to connect to MongoDB ${error}`)
  }
}

main()
