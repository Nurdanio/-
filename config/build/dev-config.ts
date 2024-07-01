import { build } from "esbuild";
import { resolve } from "path";
import { config } from "./esbuild-config";
import express from "express"
import { EventEmitter } from "events"

const app = express()
const emitter = new EventEmitter()

const PORT = Number(process.env.PORT) || 3000

app.use(express.static(resolve(__dirname, "..", "..", "build")))

app.get('/subscribe', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers)
    res.write("")

    emitter.on("refresh", () => {
        res.write("data: message \n\n")
    })
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`)
})

const sendMessage = () => {
    emitter.emit('refresh', "test")
}

build({
    ...config,
    watch: {
        onRebuild(err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log("build...")
                sendMessage()
            }
        }
    }
}).then(() => {
    console.log("Server build...")
}).catch(() => console.error("ERROR"))
