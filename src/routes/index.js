import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './note.route';
import labelRoute from './label.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/notes', noteRoute);
  router.use('/labels', labelRoute);

  return router;
};

export default routes;
