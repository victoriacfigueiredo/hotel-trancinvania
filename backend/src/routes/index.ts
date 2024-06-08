import { Express, Router } from 'express';
import PromotionController from '../controllers/promotion.controller';
// import { di } from '../di';
// import TestController from '../controllers/test.controller';
// import TestService from '../services/test.service';

// const router = Router();
// const prefix = '/api';

// export default (app: Express) => {
//   app.use(
//     prefix,
//     new TestController(router, di.getService(TestService)).router
//   );
// };

const router = Router();
const prefix = '/api';

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

PromotionController.setupRoutes(router);

export default router;
