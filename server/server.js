const express = require('express')
const cookieParser = require('cookie-parser');

const app = express()
app.use(cookieParser());
app.use(express.json()); // JSON 파싱을 위한 미들웨어
const PORT = 5050

const registerRouter = require('./src/auth/register.js');
const loginRouter = require('./src/auth/login.js')
const logoutRouter = require('./src/auth/logout.js')

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
    exposedHeaders: ['access_token']
}));

app.use('/auth',registerRouter);
app.use('/auth',loginRouter);
app.use('/auth',logoutRouter)

const modelPostsRouter = require('./src/posts/modelPosts.js')

app.use('/post',modelPostsRouter)

const refresh = require('./src/middleware/refresh.js')
app.use(refresh)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT)