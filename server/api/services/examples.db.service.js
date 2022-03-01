class ExamplesDatabase {
  constructor() {
    this._data = [];
    this._status = {
      status: "inserted"
    }
    const { Pool } = require('pg');
    this._db = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    this._counter = 0;

    this._users = [
      { username: "abin1", password: "abc", firstname: "Abin", lastname: "Tom", email: "abin@gmail.com", phone: 1234567890},
      { username: "parvathy4", password: "abc", firstname: "Parvathy", lastname: "Sajeev", email: "parvathy@gmail.com", phone: 7306204018}
    ];
    this.insert('example 0');
    this.insert('example 1');
  }

  all() {
    return Promise.resolve(this._users);
  }


  async tryGet(){
    const {rows}= await this._db.query('SELECT id, name, Description__c, extid__c FROM salesforce.example__c')
    return Promise.resolve(rows);
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  async getById(id){
    const { rows } = await this._db.query(`SELECT id, name, Description__c, extid__c FROM salesforce.example__c where id = ${id}`);
    return Promise.resolve(rows);
  }

  tryPost(name,desc,extid){
    this._db.query('INSERT INTO salesforce.example__c(name, description__c, extid__c) values ($1, $2, $3)',
      [name, desc, extid], (err, result) => {
        if (err) {
          return err.stack;
        } else {
          console.log(result);
        }
      })
      this._status.status="inserted";
      return Promise.resolve(this._status);
  }

  tryDel(id){
    this._db.query('DELETE from salesforce.example__c where extid__c= $1',
    [id], (err, result) => {
      if (err) {
        return err.stack;
      } else {
        console.log(result);
      }
    })
    this._status.status="deleted";
    return Promise.resolve(this._status);
  }

  tryPut(name,desc,id){
    console.log("enter");
    this._db.query('UPDATE salesforce.example__c set name= $1, description__c= $2 where extid__c= $3',
      [name, desc, id], (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
         console.log(result);
        }
      })
      this._status.status="updated";
    return Promise.resolve(this._status);
  }

  insert(name) {
    const record = {
      id: this._counter,
      name,
    };

    this._counter += 1;
    this._data.push(record);

    return Promise.resolve(record);
  }

  getUser(username, password){
    const user = this._users.find(c => c.username === username && c.password === password);
    //console.log(user);
    if(user)
    return Promise.resolve(user);
  }
}

export default new ExamplesDatabase();
