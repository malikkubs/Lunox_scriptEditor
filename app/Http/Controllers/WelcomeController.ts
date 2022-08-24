import type { Request } from "lunox/dist/Http/Request";
import { Controller } from "lunox";

class WelcomeController extends Controller {
  async home(req: Request, slug: string) {
    return view("home", {
      version: app("version"),
      data: req.all(),
      slug: slug,
      authenticated: await req.auth().check(),
    });
  }
  async NewProject(req: Request, slug: string) {
    return view("newproject", {
      version: app("version"),
      data: req.all(),
      authenticated: await req.auth().check(),
    });
  }
  async AddProject(req: Request) {
    return view("add_project", {
      data: req.all(),
      authenticated: await req.auth().check(),
    });
  }
}

export default WelcomeController;
