import {resolve} from "path"
import {BuildOptions} from "esbuild";

import { CleanPlugin} from "./plugins/clear-plugin"
import {HTMLPlugin} from "./plugins/html-plugin";

const mode = process.env.mode || "development" 

const isDev = mode === "development"
const isProd = mode === "production"

export const config: BuildOptions = {
    outdir: resolve(__dirname, "..", "..", "build"),
    entryPoints: [resolve(__dirname, "..", "..", "src", "index.tsx")],
    entryNames: "bundle-[hash]",
    loader: { '.js': 'jsx' },
    treeShaking: true,
    minify: isProd && true,
    bundle: true,
    metafile: true,
    tsconfig: resolve(__dirname, "..", "..", "tsconfig.json"),
    plugins: [CleanPlugin, HTMLPlugin({title: "Esbuild"})],

}