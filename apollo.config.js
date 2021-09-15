module.exports = {
  client: {
    service: {
      name: 'inclined-schema',
      localSchemaFile: './schema.graphql',
    },
    includes: ['./modules/**/*/api/*.ts', './gql-api/*.ts'],
  },
}
