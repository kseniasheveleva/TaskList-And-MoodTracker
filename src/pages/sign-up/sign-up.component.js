import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./sign-up.template.hbs";

export class SignUp extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES });
    this.state = {}
  }
}

customElements.define("sign-up-page", SignUp)