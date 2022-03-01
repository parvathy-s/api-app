import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .post('/get_user',controller.getUser)
  .get('/', controller.all)
  .get('/try',controller.tryGet)
  .get('/try/:id',controller.getById)
  .post('/try',controller.tryPost)
  .post('/try/del/:id',controller.tryDel)
  .put('/try/:id',controller.tryPut)
  .get('/:id', controller.byId);
