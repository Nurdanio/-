import {build} from "esbuild"
import {config} from "./esbuild-config"

build(config).catch(() => console.error("ERROR"))