import { Component } from "./core/Component";
import template from "./app.template.hbs";
import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/sign-in/sign-in.component";
import "./pages/sign-up/sign-up.component";
import { ROUTES } from "./constants/routes";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("my-app", App);