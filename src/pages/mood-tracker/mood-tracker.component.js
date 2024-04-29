import { EVENT_TYPES } from "../../constants/eventTypes";
import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import template from "./mood-tracker.template.hbs";


export class MoodTracker extends Component {
    constructor() {
        super();

        this.template = template({routes: ROUTES})
        this.state = {
            template: {
                first: "t-one",
                second: "t-two"
            },
            isLoading: false
        }
    }

    toggleIsLoading = () => {
        this.setState({
        ...this.state,
        isLoading: !this.state.isLoading,
        });
    };

    // _______________________________________________

    appendTemplate(template) {
        const tmp = createElement(template);
        this.querySelector('.body').append(tmp)
    }

    settingState = ({ detail }) => {
        this.setState({
            ...this.state,
            ...detail
        })

        this.appendTemplate(detail.template)
    }

    onClick = ({ target }) => {
        const nextBtn = target.closest('.next-btn')
        const backBtn = target.closest('.go-back-btn')
        const containerBody = this.querySelector('.body')

        if (nextBtn) {
            const currentTmp = containerBody.firstChild.nextSibling
            const nextTmp = 
            console.log(currentTmp);
            // containerBody.removeChild(currentTmp)
            // this.appendTemplate()
        }
    }

    componentDidMount() {
        eventEmitter.on(EVENT_TYPES.moodTemplate, this.settingState)
        this.addEventListener("click", this.onClick)
    }

    componentWillUnmount() {
        eventEmitter.off(EVENT_TYPES.moodTemplate, this.settingState)
    }
}

customElements.define("mood-tracker-page", MoodTracker)