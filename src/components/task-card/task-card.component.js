
import { EVENT_TYPES } from "../../constants/eventTypes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import template from "./task-card.template.hbs";

export class TaskCard extends Component {
  constructor() {
    super();

    this.state = {
      title: this.getAttribute("title"),
      description: this.getAttribute("description"),
      category: this.getAttribute("category"),
      id: this.getAttribute("data-id"),
      // isCompleted: JSON.parse(this.getAttribute("is-completed")),
    };
    this.template = template();
  }

  changeStatus= ({ detail }) => {
    this.setState({
      ...this.state,
      isCompleted: detail.isCompleted,
    })
  }

  componentDidMount() {
    eventEmitter.on(EVENT_TYPES.task, this.changeStatus);
  }

  componentWillUnmount() {
    eventEmitter.off(EVENT_TYPES.task, this.changeStatus)
  }

}

customElements.define("ui-task-card", TaskCard);
