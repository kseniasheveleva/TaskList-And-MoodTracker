import { Component } from "../../core/Component";
import template from "./t-two.template.hbs";

export class TTwo extends Component {
  constructor() {
    super();

    this.template = template()
  }
}

customElements.define("t-two", TTwo)