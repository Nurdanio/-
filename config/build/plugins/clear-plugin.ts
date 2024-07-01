import {Plugin} from 'esbuild'
import {rm} from 'fs/promises'

export const CleanPlugin: Plugin = {
    name: 'CleanPlugin',
    setup(build) {
        build.onStart(async () => {
           try {
               const outDir = build.initialOptions.outdir
                if (outDir) {
                    await rm(outDir, {recursive: true})
                }
           } catch (e) {
               console.log(e)
           }
        })
    },
}
