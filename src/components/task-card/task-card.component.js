
import { Component } from "../../core/Component";
import template from "./task-card.template.hbs";

export class TaskCard extends Component {
  constructor() {
    super();

    this.state = {
      title: this.getAttribute("title"),
      description: this.getAttribute("description"),
      category: this.getAttribute("category"),
      id: this.getAttribute("data-id"),
    };
    this.template = template();
  }

}

customElements.define("ui-task-card", TaskCard);
