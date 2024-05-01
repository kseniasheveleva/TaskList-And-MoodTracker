import { Component } from "../../core/Component";
import template from "./mood-tracker-records.template.hbs";
import { ROUTES } from "../../constants/routes";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";

export class MoodTrackerRecords extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES })
    this.state = {
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



  

  componentDidMount() {
    console.log(this.state.data);
  }

  componentWillUnmount() {
  }

}

customElements.define("mood-tracker-records-page", MoodTrackerRecords)