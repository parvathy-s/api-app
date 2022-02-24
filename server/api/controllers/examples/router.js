import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .post('/get_user',controller.getUser)
  .get('/', controller.all)
  .get('/:id', controller.byId);
