import { MOOD_IMG, MOOD_TYPE } from "../../constants/mood-emotes";
import { Component } from "../../core/Component";
import template from "./mood-template-first.template.hbs"

export class ChooseEmojiTemplate extends Component {
  constructor() {
    super();

    this.template = template()
    this.state = {
      moods: Object.keys(MOOD_TYPE).map((key) => {
        const type = MOOD_TYPE[key]
        return {
            img: MOOD_IMG[type],
            type
        }
      }),
    }
  }
}

customElements.define("ui-choose-emoji-template", ChooseEmojiTemplate)