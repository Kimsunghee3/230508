import express from "express"
import nunjucks from "nunjucks"
import axios from "axios"

export default () => {
    const app = express()

    app.use(express.json())
    app.set("view engine", "html")
    nunjucks.configure("views", {
        express:app,
    })

    app.get("/", (req, res) => {
        res.render("index")
    })
    
    return app
}
