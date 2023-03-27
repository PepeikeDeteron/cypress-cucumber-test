import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { build } from "esbuild";
import * as path from "path";
import * as fs from "fs";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);

      const esbuildPlugin = createEsbuildPlugin(config);

      on("file:preprocessor", async (file) => {
        const { outputFiles } = await build({
          entryPoints: [file.filePath],
          bundle: true,
          write: false,
          plugins: [esbuildPlugin],
          platform: "browser",
          format: "cjs",
          target: "es6",
        });

        const outputFile = outputFiles[0];
        const outputPath = path.join(
          path.dirname(file.filePath),
          path.basename(file.filePath) + ".js"
        );

        fs.writeFileSync(outputPath, outputFile.text);

        return outputPath;
      });

      return config;
    },
  },
});
