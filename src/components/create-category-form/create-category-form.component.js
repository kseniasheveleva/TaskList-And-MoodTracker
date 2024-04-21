import { Component } from "../../core/Component";
import template from "./create-category-form.template.hbs";

export class CreateCategoryForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.template = template();
  }

}

customElements.define("ui-create-category-form", CreateCategoryForm);
