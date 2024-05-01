import { MOOD_IMG } from "../../constants/mood-emotes";
import { Component } from "../../core/Component";
import template from "./mood-record-card.template.hbs";

export class MoodRecordCard extends Component {
  constructor() {
    super();

    this.template = template()
    this.state = {
      title: this.getAttribute("emotion-description"),
      description: this.getAttribute("memo-description"),
      emoji: MOOD_IMG[this.getAttribute("emoji-type")],
      createdAt: this.getAttribute("created-at"),
    }
  }


}

customElements.define("ui-mood-record-card", MoodRecordCard)