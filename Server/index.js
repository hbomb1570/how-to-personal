require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , axios = require('axios')

const app = express();

app.use(bodyParser.json())
app.use(cors())

massive(process.env.DB_CONNECTION).then(db => {
    app.set('db', db)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db')
    let userData = profile._json
    let auth_ID = userData.user_id.split('|')[1]

    db.find_user([auth_ID]).then(user => {
        if (user[0]) {
            return done(null, user[0].id)
        } else {
            db.create_user([userData.name, userData.email, auth_ID])
                .then(user => {
                    return done(null, user[0].id)
                })
        }
    })
}))

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/user',
    failureRedirect: 'http://localhost:3000/#'
}))

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser((id, done) => {
    const db = app.get('db')
    db.find_user_session([id]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth/me', (req, res, next) => {
    if (!req.user) {
        res.status(401).send('LOGIN REQUIRED')
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/auth/logout', (req, res, next) => {
    req.logout()
    res.redirect('http://localhost:3000/#')
})

app.get('/api/techniques', (req, res, next) => {
    const db = app.get('db')
    db.techniques().then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/videos', (req, res, next) => {
    const db = app.get('db')
    db.videos().then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/quotes', (req, res, next) => {
    const db = app.get('db')
    db.quotes().then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/search', (req, res, next) => {
    axios.get(`https://food2fork.com/api/search?key=${process.env.REACT_APP_F2F_APIKEY}&q=${req.body.search_input}`)
        .then(response => {
            res.status(200).send(response.data)
        })
})

app.post('/api/favorites',(req,res,next)=>{
    const db = app.get('db')
    const {user_id,recipe_id,recipe_name,recipe_image,recipe_source} = req.body
    db.favorites(user_id).then(response =>{
        if (response.filter( x => {
            return x.recipe_id === recipe_id
        })[0]){
            res.end()
            return
        }
        db.add_favorite(user_id,recipe_id,recipe_name,recipe_image,recipe_source).then(response => {
            res.status(200).send(response)
        })
    })

})

app.delete('/api/favorites/:user_id/:recipe_id',(req,res,next)=>{
    const db = app.get('db')
    const {user_id,recipe_id} = req.params
    db.delete_favorite([user_id,recipe_id]).then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/favorites',(req,res,next)=>{
    const db = app.get('db')
    db.favorites([req.user.id]).then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/spices',(req,res,next)=>{
    const db = app.get('db')
    db.spices().then(response => {
        res.status(200).send(response)
    })
})

app.listen(process.env.SERVER_PORT, () => { console.log(`Server listening on port ${process.env.SERVER_PORT}`) })