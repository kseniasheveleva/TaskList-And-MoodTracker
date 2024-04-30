import { Component } from "../../core/Component";
import template from "./mood-template-second.template.hbs"

export class EmotionDescriptionTemplate extends Component {
  constructor() {
    super();

    this.template = template()
    this.state = {}
  }
}

customElements.define("ui-emotion-description-template", EmotionDescriptionTemplate)