const {googleLogin: googleLoginHandler} = require('../controllers/authController');
const router = require("express").Router();

router.get('/test', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('test passed')
});

router.post('/google', googleLoginHandler);

module.exports = router;