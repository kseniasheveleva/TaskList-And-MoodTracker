import { Satellite } from "lucide-static";
import { createMoodTrackerApi } from "../../api/mood";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { MOOD_IMG, MOOD_TYPE } from "../../constants/mood-emotes";
import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import { useUserStore } from "../../hooks/useUserStore";
import { extractFormData } from "../../utils/extractFormData";
import template from "./mood-tracker.template.hbs";
import { log } from "handlebars";
import { set } from "firebase/database";


export class MoodTracker extends Component {
    constructor() {
        super();

        this.template = template({routes: ROUTES})
        this.state = {
            user: null,
            data: {},
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

    onClick = (evt) => {
        evt.preventDefault()
        const nextBtn = evt.target.closest('.next-btn');
        const backBtn = evt.target.closest('.go-back-btn');
        const templates = this.querySelectorAll('.template');
        const emojiBtn = evt.target.closest('.emoji-btn');
        const submitFirstForm = evt.target.closest('.submit-first-form');
        const submitSecondForm = evt.target.closest('.submit-second-form');

        const arrOfTemplates = [...templates];
        const currentTmp = arrOfTemplates.find(tmp => !tmp.classList.contains('hidden'));


        if (emojiBtn) {
            const chosenEmoji = emojiBtn.dataset.type;
            this.setStateN({
                ...this.state, data: {...this.state.data, chosenEmoji}
            })
            this.moveForward(currentTmp, arrOfTemplates)
            console.log(this.state.data);
        }

        if (submitFirstForm) {
            const form = this.querySelector('.form-first');
            const formData = extractFormData(form);
            console.log(chosenEmoji);
        }

        if (submitSecondForm) {
            const form = this.querySelector('.form-second');
            const formData = extractFormData(form);
        }

        if (backBtn) {
            return this.goBack(currentTmp, arrOfTemplates)
        }
    }
    
    goBack = (currentTmp, arrOfTemplates) => {
        if (!currentTmp.classList.contains('template-first')) {
            const previousTmp = arrOfTemplates[arrOfTemplates.indexOf(currentTmp)-1]
            currentTmp.classList.add('hidden')
            previousTmp.classList.remove('hidden')
        }
    }

    moveForward = (currentTmp, arrOfTemplates) => {
        if (!currentTmp.classList.contains('template-third')) {
            const nextTmp = arrOfTemplates[arrOfTemplates.indexOf(currentTmp)+1]
            currentTmp.classList.add('hidden')
            nextTmp.classList.remove('hidden')
            console.log(currentTmp, nextTmp);
        }
    }

    setUser() {
        const { getUser } = useUserStore();
        this.setState({
        ...this.state,
        user: getUser(),
        });
    }

    componentDidMount() {
        this.setUser()
        eventEmitter.on(EVENT_TYPES.moodTemplate, this.settingState)
        this.addEventListener("click", this.onClick)
        console.log('mount');
    }
    
    componentWillUnmount() {
        eventEmitter.off(EVENT_TYPES.moodTemplate, this.settingState);
        this.removeEventListener("click", this.onClick);
        console.log('Unmount');
    }
}

customElements.define("mood-tracker-page", MoodTracker)