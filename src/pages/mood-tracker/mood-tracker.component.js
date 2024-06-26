import { createMoodRecordApi } from "../../api/mood";
import { ROUTES } from "../../constants/routes";
import { TOAST_TYPE } from "../../constants/toast";
import { Component } from "../../core/Component";
import { useNavigate } from "../../hooks/useNavigate";
import { useToastNotification } from "../../hooks/useToastNavigation";
import { useUserStore } from "../../hooks/useUserStore";
import { extractFormData } from "../../utils/extractFormData";
import dayjs from 'dayjs'
import template from "./mood-tracker.template.hbs";


export class MoodTracker extends Component {
    constructor() {
        super();

        this.template = template({routes: ROUTES})
        this.state = {
            user: null,
            data: {},
            isLoading: false,
            templates: ['ui-choose-emoji-template', 'ui-emotion-description-template', 'ui-memo-description-template'],
            currentTemplate: 'ui-choose-emoji-template'
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
        const body = this.querySelector('.body')
        const previousTmp = this.querySelector('.tmp')

        body.removeChild(previousTmp)
        const tmp = document.createElement(template)
        tmp.classList.add('tmp')
        body.append(tmp)
        this.setStateN({...this.state, currentTemplate: template})  
    }


    createRecord() {
        this.toggleIsLoading()
        createMoodRecordApi({ uid: this.state.user.uid, 
            data: {...this.state.data, createdAt: dayjs().format('DD/MM/YY')} })
        .then(() => {
            useToastNotification({ message: 'Success!', type: TOAST_TYPE.success })
            useNavigate(ROUTES.moodTrackerRecords)
        })
        .catch(({ message }) => {
            useToastNotification({ message })
        })
        .finally(() => this.toggleIsLoading())
    }


    onClick = (evt) => {
        evt.preventDefault()
        const backBtn = evt.target.closest('.go-back-btn');
        const skipBtn = evt.target.closest('.skip-btn');
        const skipDoneBtn = evt.target.closest('.skip-done-btn');
        const emojiBtn = evt.target.closest('.emoji-btn');
        const submitFirstForm = evt.target.closest('.submit-first-form');
        const submitSecondForm = evt.target.closest('.submit-second-form');

        if (emojiBtn) {
            const chosenEmoji = emojiBtn.dataset.type;
            this.setStateN({
                ...this.state, data: {...this.state.data, chosenEmoji}
            })
            this.moveForward()
        }

        if (submitFirstForm) {
            const form = this.querySelector('.form-first');
            const formData = extractFormData(form);
            const value = Object.values(formData)[0]
            if (value) {
                this.setStateN({
                    ...this.state, data: {...this.state.data, ...formData}
                })
                this.moveForward()
            }
        }
        
        if (submitSecondForm) {
            const form = this.querySelector('.form-second');
            const formData = extractFormData(form);
            const value = Object.values(formData)[0]
            if (value) {
                this.setStateN({
                    ...this.state, data: {...this.state.data, ...formData}
                })
                console.log('MOVE FORWARD', this.state.data);
                this.createRecord()
            }
        }

        if (backBtn) {
            return this.goBack()
        }

        if (skipBtn) {
            return this.moveForward()
        }

        if (skipDoneBtn) {
            return this.createRecord()
        }
    }
    
    
    goBack = () => {
        if (this.state.currentTemplate !== 'ui-choose-emoji-template') {
            const indexOfCurrentTmp = this.state.templates.indexOf(this.state.currentTemplate)
            const previousTmp = this.state.templates[indexOfCurrentTmp-1];
            this.appendTemplate(previousTmp)
            console.log('GOBACK', this.state.currentTemplate);
        }
    }

    moveForward = () => {
        if (this.state.currentTemplate !== 'ui-memo-description-template') {
            const indexOfCurrentTmp = this.state.templates.indexOf(this.state.currentTemplate)
            const nextTmp = this.state.templates[indexOfCurrentTmp+1];
            this.appendTemplate(nextTmp)
            console.log('MOVE FORWARD', this.state.data);
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
        this.addEventListener("click", this.onClick)
    }
    
    componentWillUnmount() {
        this.removeEventListener("click", this.onClick);
    }
}

customElements.define("mood-tracker-page", MoodTracker)