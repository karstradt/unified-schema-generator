export const config = [
  {
    outputSchemaType: 'mongoose',
    cleanUpObjects: ['Address', 'Tags'],
    outputFilePath: 'D:/work/projects/unified-schema-generator/unified-schema-generator-public/unified-schema-generator/src/files/output/mongooseSchema.json',
    inputFilePath: './src/files/input/unifiedSchema.graphql',
  },
  {
    outputSchemaType: 'json',
    cleanUpObjects: ['Address', 'Tags'],
    outputFilePath: 'D:/work/projects/unified-schema-generator/unified-schema-generator-public/unified-schema-generator/src/files/output/jsonSchema.json',
    inputFilePath: './src/files/input/unifiedSchema.graphql',
  }
];

// export const config = {
//   outputSchemaType: 'json',
//   cleanUpObjects: ['Address', 'Tags']
// }