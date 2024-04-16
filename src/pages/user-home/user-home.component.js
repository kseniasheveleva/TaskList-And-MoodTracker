import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./user-home.template.hbs";

export class UserHome extends Component {
  constructor() {
    super();

    this.template = template({routes: ROUTES});
    this.state = {
      isLoading: false,
    }
  }
}

customElements.define("user-home-page", UserHome)