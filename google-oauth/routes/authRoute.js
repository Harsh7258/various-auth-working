const express = require("express")
const passport = require("passport")

const router = express.Router()

router.get('/', (req, res)=> {
    res.render('AuthPage.ejs')
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

router.get('/auth/logout', (req, res) => {
    try {
        res.clearCookie('connect.sid')
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router