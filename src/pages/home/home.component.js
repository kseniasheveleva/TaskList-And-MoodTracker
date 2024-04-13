import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./home.template.hbs";
import "../../components/router-link/router-link.component";

export class HomePage extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      links: [
        {
          label: "Sign In",
          href: ROUTES.signIn,
        },
        {
          label: "Sign Up",
          href: ROUTES.signUp,
        }
      ]
    }
  }
}

customElements.define("home-page", HomePage);