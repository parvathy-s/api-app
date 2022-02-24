class ExamplesDatabase {
  constructor() {
    this._data = [];
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

  byId(id) {
    return Promise.resolve(this._data[id]);
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
