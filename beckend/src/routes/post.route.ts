import useRouter from 'express'
import { getAllComments, likeComment, postComment } from '../controllers/post.controller'

const router = useRouter()

router.post('/commenting', postComment)
router.post('/like-comment', likeComment)
router.get('/all-comments' , getAllComments)
export default router