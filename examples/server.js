import fs from 'fs'
import path from 'path'
import express from 'express'
import rewrite from 'express-urlrewrite'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import WebpackConfig from './webpack.config.babel'

const app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

fs.readdirSync(__dirname).forEach(file => {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

app.use(express.static(__dirname))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
