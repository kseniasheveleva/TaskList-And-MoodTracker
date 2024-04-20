import { Component } from "../../core/Component";
import template from "./create-task-form.template.hbs";

export class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.template = template();
  }

}

customElements.define("ui-create-task-form", CreateTaskForm);
