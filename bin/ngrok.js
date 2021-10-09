require('dotenv/config')
const ngrok = require('ngrok')

async function run() {
  const url = await ngrok.connect({
    proto: 'http',
    port: parseInt(process.env.PORT || '3000'),
    authtoken: process.env.NGROK_TOKEN,
  })
  console.log(`ngrok running at ${url}`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
