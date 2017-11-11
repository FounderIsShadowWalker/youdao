const Router = require('koa-router')
const login = require('./controller/login');
const light = require('./controller/light');
const getPost = require('./controller/getPost');
const addFriend = require('./controller/addFirend');
const saveRemark = require('./controller/saveRemark');
const router = new Router();


router.post('/login', login.login);
router.post('/register', login.resiter);
router.post('/light', light.upload);
router.post('/getPost', getPost.getPost);
router.post('/getLatestPosts', getPost.getLatestPost);
router.post('/getUsers', login.getUsers);
router.post('/addFriend', addFriend.addFriend);
router.post('/saveRemark', saveRemark.saveRemark);

router.get('/', (ctx) => {
    ctx.body = 'hello';
});

module.exports = router
