// myapp/src/routes/reviewRoutes.ts
import { Router } from 'express';
import { getReviews, addReview } from '../controllers/reviewController'; // Ensure the path is correct

const router = Router();

router.get('/all', getReviews);
router.post('/add', addReview);

export default router;
