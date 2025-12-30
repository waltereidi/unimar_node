require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const HomeRoutes = require('./routes/HomeRoutes')
const LoginRoutes = require('./routes/LoginRoutes')
const PlaylistRoutes = require('./routes/PlaylistRoutes')
const RegisterRoutes = require('./routes/RegisterRoutes')
const SearchRoutes = require('./routes/SearchRoutes')
//middleware - Respostas JSON
app.use(express.json());

//Rotas
app.use('/home', HomeRoutes)
app.use('/login', LoginRoutes)
app.use('/playlist', PlaylistRoutes)
app.use('/register', RegisterRoutes)
app.use('/search', SearchRoutes)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
