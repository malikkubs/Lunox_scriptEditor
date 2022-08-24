import AuthController from "app/Http/Controllers/AuthController";
import WelcomeController from "app/Http/Controllers/WelcomeController";
import { Route } from "lunox";

Route.get("/", [WelcomeController, "AddProject"]);
Route.get("/mobil/:slug", () => "ok");
Route.get("/demo/:slug", [WelcomeController, "home"]);
Route.get("/add_project/:qwert", [WelcomeController, "home"]);
Route.get("/login", [AuthController, "showLogin"]);
Route.post("/login", [AuthController, "postLogin"]);
Route.get("/logout", [AuthController, "logout"]);

Route.middleware("auth").group(() => {
  Route.get("/admin", () => view("admin", { version: app("version") }));
});
