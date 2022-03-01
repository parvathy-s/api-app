import ExamplesService from '../../services/examples.service';

export class Controller {
  all(req, res) {
    ExamplesService.all().then((r) => res.json(r));
  }

  byId(req, res) {
    ExamplesService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  tryGet(req, res) {
    ExamplesService.tryGet().then((r) => res.json(r));
  }

  getById(req,res){
    ExamplesService.getById(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  tryPost(req,res){
    ExamplesService.tryPost(req.body.name.trim(), req.body.description__c.trim(), req.body.extid__c.trim()).then((r) =>
      res.status(201).send(r)
    );
  }

  tryDel(req,res){
    ExamplesService.tryDel(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  tryPut(req,res){
    ExamplesService.tryPut(req.body.name.trim(), req.body.description__c.trim(),req.body.extid__c.trim()).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
  create(req, res) {
    ExamplesService.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1/examples/${r.id}`).json(r)
    );
  }

  getUser(req, res) {
    ExamplesService.getUser(req.body.username, req.body.password).then((r) =>
      res.json(r))
      .catch(err => {
        console.log("error:--> ", err)
        res.json(
          {
            code: err.response.status,
            message: err.response.statusText,
            data: err.response.data
          }
        )
      })
  }
}
export default new Controller();
