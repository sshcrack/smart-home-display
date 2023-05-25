import express from "express"
const app = express()
import path from "path"
import querystring from "querystring"
import fetch from "node-fetch"
import config from "../src/config"

const required_scope = "user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played user-read-playback-position playlist-read-private playlist-read-collaborative"
const redirect_uri = "http://localhost:8100/callback"

const spotifyConf = config.spotify
const asyncRun = async () => {
    const chalk = (await eval('import("chalk-template")')).default
    app.get("/", (req, res) => {
        res.sendFile(path.resolve("./index.html"))
    })


    app.get("/login", (req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: spotifyConf.clientID,
                scope: required_scope,
                redirect_uri
            }));
    })

    app.get("/callback", (req, res) => {
        const code = req.query.code as string


        const params = new URLSearchParams();
        params.set("code", code)
        params.set("redirect_uri", redirect_uri)
        params.set("grant_type", "authorization_code")
        fetch('https://accounts.spotify.com/api/token', {
            method: "post",
            body: params,
            headers: {
                "Accept": "application/json",
                "Authorization": 'Basic ' + (Buffer.from(spotifyConf.clientID + ':' + spotifyConf.clientSecret).toString('base64'))
            }
        })
            .then(e => e.text())
            .then(e => {
                console.log(e)
                return JSON.parse(e)
            })
            .then(e => {
                const body = e as { access_token: string, refresh_token: string }
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;

                console.log(chalk`\n\n{green Success!}
                    {gray paste this in your config (in the spotify section):}
                    {cyan
                        accessToken: "${access_token}",
                        refreshToken: "${refresh_token}",
                    }
                `)
                res.send("Success!")
                setTimeout(() => process.exit(0), 100)
            })
    })
    app.listen(8100, () => console.log(chalk`{green Listening on port 8001.}\n{cyan OPEN: http://localhost:8100}`))
}


asyncRun()