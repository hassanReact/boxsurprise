import useRouter from 'express'
import { paymenyManually } from '../controllers/withdraw.controller'

const router = useRouter()

router.post('/withdraw/:id', paymenyManually)

export default router