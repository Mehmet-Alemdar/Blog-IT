const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

let posts = []

app.get('/', function (req, res) {
  res.render('home', {
    posts: posts,
  })
  console.log(posts)
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.get('/contact', function (req, res) {
  res.render('contact')
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent

  const postDay = getDate()
  const post = {
    title: postTitle,
    content: postContent,
    date: postDay,
  }
  posts.push(post)
  res.redirect('/')
})

app.get('/posts/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName)
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title)
    if (storedTitle === requestedTitle) {
      res.render('post', {
        currentPostTitle: post.title,
        currentPostContent: post.content,
        currentPostDate: post.date,
      })
    } else {
      console.log('Not Matched Post')
    }
  })
})

function getDate() {
  const today = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }

  return today.toLocaleDateString('en-EN', options)
}
app.listen(3000, function () {
  console.log('Server port 3000 online...')
})
