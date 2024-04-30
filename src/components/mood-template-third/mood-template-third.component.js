import { Component } from "../../core/Component";
import template from "./mood-template-third.template.hbs"

export class MemoDescriptionTemplate extends Component {
  constructor() {
    super();

    this.template = template()
    this.state = {}
  }
}

customElements.define("memo-description-template", MemoDescriptionTemplate)