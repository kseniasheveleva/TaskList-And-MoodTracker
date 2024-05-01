import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./mood-template-third.template.hbs"

export class MemoDescriptionTemplate extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES })
    this.state = {}
  }
}

customElements.define("ui-memo-description-template", MemoDescriptionTemplate)