import l from '../../common/logger';
import db from './examples.db.service';

const cors = require('cors');
const { Pool } = require('pg');


class ExamplesService {
  all() {
    const db = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    const { rows } = db.query(`SELECT id, name, Description__c, extid__c FROM salesforce.example__c`);
    return rows;
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(name) {
    return db.insert(name);
  }
}

export default new ExamplesService();
