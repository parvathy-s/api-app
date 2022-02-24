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

  create(req, res) {
    ExamplesService.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1/examples/${r.id}`).json(r)
    );
  }

  getUser(req, res) {
    ExamplesService.getUser(req.body.username, req.body.password).then((r) =>
      // {

      //   if (r) 
      //   {
      //     console.log(r);
      //     res.status(201).json(r);}
      //   else res.status(404).end();
      // });
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
