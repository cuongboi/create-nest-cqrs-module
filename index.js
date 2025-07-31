#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import "./scripts/deno-polyfills.js";
import {
  exitOnError,
  fillPlaceholders,
  renameIgnoreFiles,
  readScaffoldingConfigOnce,
} from "./scripts/utils.js";
import { promptOptions } from "./scripts/prompt.js";
import pluralize from "pluralize";

const DEFAULT_TARGET_DIR = ".";
const __filename = fileURLToPath(import.meta.url);
const TEMPLATE_PATH = path.resolve(path.dirname(__filename), "template");

const main = async () => {
  try {
    const options = await promptOptions(DEFAULT_TARGET_DIR);
    const targetDir = options.targetDir.toLowerCase() || DEFAULT_TARGET_DIR;
    const targetDirPath = path.resolve(process.cwd(), targetDir);
    const name = targetDir;
    const nameUpper = targetDir
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Splits camelCase words into separate words
      .replace(/[-_]+|[^\p{L}\p{N}]/gu, " ") // Replaces dashes, underscores, and special characters with spaces
      .toLowerCase() // Converts the entire string to lowercase
      .replace(/(?:^|\s)(\p{L})/gu, (_, letter) => letter.toUpperCase()) // Capitalizes the first letter of each word
      .replace(/\s+/g, ""); // Removes all spaces
    const names = pluralize(targetDir);
    const namesUpper = pluralize(nameUpper);

    console.log(`\nScaffolding Cqrs Module in ${targetDirPath}...`);
    if (targetDir !== ".") {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }

    // Scan the template directory and copy files
    const templateFiles = fs.readdirSync(TEMPLATE_PATH, { recursive: true });
    for (const file of templateFiles) {
      const filePath = path.join(
        targetDirPath,
        file.toString().replace("name", targetDir)
      );

      if (!filePath.endsWith(".ts")) {
        fs.mkdirSync(filePath, { recursive: true });
        continue;
      }

      // get file contents
      let fileContent = fs.readFileSync(
        path.join(TEMPLATE_PATH, String(file)),
        "utf8"
      );
      // replace placeholders
      fileContent = fileContent
        .replace(/name/g, name)
        .replace(/Name/g, nameUpper)
        .replace(/names/g, names)
        .replace(/Names/g, namesUpper);

      // write the file to the target directory filePath
      fs.writeFileSync(filePath, fileContent);
    }

    const config = readScaffoldingConfigOnce(targetDirPath);
    const packageName = path.basename(targetDirPath);
    const packageTitle = packageName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    fillPlaceholders(
      targetDirPath,
      {
        $PACKAGE_NAME$: packageName,
        $PACKAGE_TITLE$: packageTitle,
      },
      config
    );

    renameIgnoreFiles(targetDirPath, config);

    console.log(`To start developing, run the following commands:

    cd ${targetDir}
    npm install
    npm run dev
`);
  } catch (err) {
    exitOnError(err);
  }
};

main();
