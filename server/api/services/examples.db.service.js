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
    const {rows}= await this._db.query('select id,firstname, lastname, email, phone, extid__c from salesforce.contact')
    return Promise.resolve(rows);
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  async getById(id){
    const { rows } = await this._db.query(`select id,firstname, lastname, email, phone, extid__c from salesforce.contact where extid__c = '${id}'`);
    return Promise.resolve(rows);
  }

  tryPost(fname,lname,email,phone,extid){
    this._db.query('INSERT INTO salesforce.contact(firstname, lastname, email, phone, extid__c) values ($1, $2, $3, $4, $5)',
      [fname,lname,email,phone,extid], (err, result) => {
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
    this._db.query('DELETE from salesforce.contact where extid__c= $1',
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

  tryPut(fname,lname,email,phone,extid){
    this._db.query('UPDATE salesforce.contact set firstname= $1, lastname= $2, email= $3, phone= $4 where extid__c= $5',
      [fname,lname,email,phone,extid], (err, result) => {
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
