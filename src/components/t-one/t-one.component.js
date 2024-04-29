import { Component } from "../../core/Component";
import template from "./t-one.template.hbs";

export class TOne extends Component {
  constructor() {
    super();

    this.template = template()
  }
}

customElements.define("t-one", TOne)