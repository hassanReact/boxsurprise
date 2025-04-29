import {Router} from 'express'
import { commentOnPost, getAllComments, getPostWithComments, likeComment, postComment } from '../controllers/post.controller'

const router = Router()

router.post('/commenting', postComment)
router.post('/like-comment', likeComment)
router.post('/comment-on-post', commentOnPost)
router.get('/get-post/:postId', getPostWithComments)
router.get('/all-comments' , getAllComments);
export default router