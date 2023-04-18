const http = require("http")
const Koa = require("koa")
const koaBody = require("koa-body")
const cors = require("@koa/cors")
const Router = require("koa-router")
const koaStatic = require("koa-static")
const path = require("path")
const fs = require("fs")
const slow = require("koa-slow")
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

app.use(
	slow({
		delay: 1500
	})
)

const router = new Router()

router.get("/news", async ctx => {
	const random = Math.random()

	if (random > 0.5) {
		ctx.response.body = JSON.stringify(newsDb.news)
		return
	}

	ctx.response.body = new Error("нет плодклюения")
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
