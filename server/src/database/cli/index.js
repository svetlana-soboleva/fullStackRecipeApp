const { exec } = require('child_process')

const [command, migrationName] = process.argv.slice(2)

const script = `npm run typeorm -- ${command.replace('$0', migrationName)}`

const child = exec(script, (error) => {
  if (error) {
    process.stderr.write(error.message)
  }
})

const pipeTo = (stream) => (message) => {
  stream.write(message)
}

child.stdout.on('data', pipeTo(process.stdout))
child.stderr.on('data', pipeTo(process.stderr))
child.on('exit', process.exit)
