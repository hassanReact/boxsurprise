import useRouter from 'express'
import { easyPaisa } from '../controllers/withdraw.controller'

const router = useRouter()

router.post('/withdraw', easyPaisa)

export default router