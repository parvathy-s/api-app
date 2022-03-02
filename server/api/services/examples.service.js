import { user } from 'pg/lib/defaults';
import l from '../../common/logger';
import db from './examples.db.service';

class ExamplesService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  tryGet(){
    return db.tryGet();
  }

  getById(id){
    return db.getById(id);
  }

  tryPost(fname,lname,email,phone,extid){
    return db.tryPost(fname,lname,email,phone,extid);
  }

  tryDel(id){
    return db.tryDel(id);
  }

  tryPut(fname,lname,email,phone,extid){
    return db.tryPut(fname,lname,email,phone,extid);
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(name) {
    return db.insert(name);
  }

  getUser(username, password){
    console.log(username);
    console.log(password);
    return db.getUser(username,password);
  }

  
}

export default new ExamplesService();
