import path from 'path';
import Debug from 'debug';
import { build } from 'vite';
import chokidar from 'chokidar';

const debug = Debug("cypress-vite");
const watchers = {};
function vitePreprocessor(userConfigPath) {
  debug("User config path: %s", userConfigPath);
  return async (file) => {
    const { outputPath, filePath, shouldWatch } = file;
    debug("Preprocessing file %s", filePath);
    const fileName = path.basename(outputPath);
    const filenameWithoutExtension = path.basename(
      outputPath,
      path.extname(outputPath)
    );
    if (shouldWatch && !watchers[filePath]) {
      let initial = true;
      watchers[filePath] = chokidar.watch(filePath);
      debug("Watcher for file %s cached", filePath);
      file.on("close", async () => {
        await watchers[filePath].close();
        delete watchers[filePath];
        debug("File %s closed.", filePath);
      });
      watchers[filePath].on("all", () => {
        if (!initial) {
          file.emit("rerun");
        }
        initial = false;
      });
    }
    const defaultConfig = {
      logLevel: "warn",
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      },
      build: {
        emptyOutDir: false,
        minify: false,
        outDir: path.dirname(outputPath),
        sourcemap: true,
        write: true,
        watch: null,
        lib: {
          entry: filePath,
          fileName: () => fileName,
          formats: ["umd"],
          name: filenameWithoutExtension
        }
      }
    };
    await build({
      configFile: userConfigPath,
      ...defaultConfig
    });
    return outputPath;
  };
}

export { vitePreprocessor as default };
