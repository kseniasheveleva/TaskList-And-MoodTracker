import { Component } from "../../core/Component";
import template from "./mood-tracker-records.template.hbs";
import { ROUTES } from "../../constants/routes";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { getMoodRecordsApi } from "../../api/mood";
import { mapResponseApiData } from "../../utils/api";
import { useUserStore } from "../../hooks/useUserStore";
import { useToastNotification } from "../../hooks/useToastNavigation";

export class MoodTrackerRecords extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES })
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


  getAllRecords() {
    if (this.state.user?.uid) {
      this.toggleIsLoading()
      getMoodRecordsApi(this.state.user.uid)
      .then(({ data }) => {
        if (data) {
          this.setState({
            ...this.state,
            data: mapResponseApiData(data)
          })
          console.log(this.state.data);
        }
      })
      .catch(({ message }) => {
        useToastNotification({ message })
      })
      .finally(() => this.toggleIsLoading())
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
    this.getAllRecords()
  }

  // componentWillUnmount() {
  // }

}

customElements.define("mood-tracker-records-page", MoodTrackerRecords)