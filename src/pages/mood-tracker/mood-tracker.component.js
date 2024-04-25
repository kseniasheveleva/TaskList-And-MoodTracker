import { Component } from "../../core/Component";
import template from "./mood-tracker.template.hbs"

export class MoodTracker extends Component {
    constructor() {
        super();

        this.template = template()
        this.state = {}
    }
}

customElements.define("mood-tracker-page", MoodTracker)