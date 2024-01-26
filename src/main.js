import * as fs from "fs";
import * as fse from "fs-extra";
import path, {dirname} from "path";
import {logSpreaded} from "./utils/consoleLogger.js";
import {config} from "../config.js";
import {getUnifiedSchemaFromGraphQl} from "./generators/gql/graphqlToJson.js";
import {getTransformedSchema} from "./generators/transformer.js";
import {cleanObjects} from "./utils/objectCleaner.js";

export const transformSchema = (shadowConfig = []) => {
  shadowConfig.map(thisConfig => {
    const {outputSchemaType = 'json', cleanUpObjects = [], inputFilePath='', outputFilePath='' } = thisConfig;

    const inputFileAbsPath = path.resolve(inputFilePath);
    const outputFileAbsPath = path.resolve(outputFilePath);

    const graphqlContent = fs.readFileSync(inputFileAbsPath, {encoding: 'utf8', flag: 'r'});

    // console.log(inputFileAbsPath);
    // console.log(outputFileAbsPath);
    // console.log(graphqlContent);

    const schemaValueMap = getUnifiedSchemaFromGraphQl(graphqlContent);
    let schema = getTransformedSchema({
      schemaMap: schemaValueMap,
      outputSchemaType
    });

    schema = cleanObjects({schema, cleanUpObjects});

    fse.default.writeJsonSync(outputFileAbsPath, schema, {spaces: 2});

    logSpreaded(schema);
  })
  /*const {outputSchemaType = 'json', cleanUpObjects = []} = config;
  const graphqlPath = "/src/files/input/unifiedSchema.graphql";
  const pwd = dirname("./");

  const filePath = path.resolve(pwd + graphqlPath);
  // console.log(filePath);

  const graphqlContent = fs.readFileSync(filePath, {encoding: 'utf8', flag: 'r'});

  const schemaValueMap = getUnifiedSchemaFromGraphQl(graphqlContent);
  let schema = getTransformedSchema({
    schemaMap: schemaValueMap,
    outputSchemaType
  });

  schema = cleanObjects({schema, cleanUpObjects});

  logSpreaded(schema);*/
};

transformSchema(config);