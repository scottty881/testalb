import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql'
import { request } from 'graphql-request'
import * as fs from 'fs'
import * as path from 'path'
async function introspect() {
  const query = getIntrospectionQuery()

  return request('http://localhost:3000/api/graphql', query)
}

introspect()
  .then((data) => {
    const filePath = path.join(__dirname, '/../schema.graphql')
    const schema = buildClientSchema(data)
    fs.writeFileSync(
      filePath,
      printSchema(schema, { commentDescriptions: true })
    )
    // eslint-disable-next-line no-console
    console.info('Generated schema saved to ', filePath)
  })
  .catch((e) => {
    console.error('Error generating graphql schema', e)
    if (e.code === 'ECONNREFUSED') {
      console.error(
        '\x1b[31m%s\x1b[0m',
        'OOPS! Did you forget to start the server?'
      )
    }
    process.exit(1)
  })
