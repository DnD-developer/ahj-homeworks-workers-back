const http = require("http")
const Koa = require("koa")
const koaBody = require("koa-body")
const cors = require("@koa/cors")
const mailDb = require("./db")
const Router = require("koa-router")
const koaStatic = require("koa-static")
const uuid = require("uuid")
const path = require("path")
const fs = require("fs")
const newsDb = require("./db")

const app = new Koa()

const public = path.join(__dirname, "db/public")

app.use(cors())

app.use(koaStatic(public))

app.use(
	koaBody({
		urlencoded: true,
		json: true
	})
)

const router = new Router()

router.get("/news", async ctx => {
	ctx.response.body = JSON.stringify(newsDb.news)
})

router.get("/", async ctx => {
	ctx.response.body = "server D&D.projects start"
})

app.use(router.routes()).use(router.allowedMethods())

const server = http.createServer(app.callback())

const port = process.env.PORT || 3000

server.listen(port, err => {
	if (err) {
		console.log(err)

		return
	}

	console.log("Server is listening to " + port)
})

module.exports = public
