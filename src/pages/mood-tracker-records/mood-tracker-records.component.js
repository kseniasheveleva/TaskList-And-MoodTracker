import { Component } from "../../core/Component";
import template from "./mood-tracker-records.template.hbs";
import { ROUTES } from "../../constants/routes";
import { deleteMoodRecordApi, getMoodRecordsApi } from "../../api/mood";
import { mapResponseApiData } from "../../utils/api";
import { useUserStore } from "../../hooks/useUserStore";
import { useToastNotification } from "../../hooks/useToastNavigation";
import { TOAST_TYPE } from "../../constants/toast";
import Chart from 'chart.js/auto';
import { MOOD_IMG, MOOD_TYPE } from "../../constants/mood-emotes";

export class MoodTrackerRecords extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES })
    this.state = {
      emotes: Object.keys(MOOD_TYPE).map((key) => {
        const type = MOOD_TYPE[key]
        return {
            img: MOOD_IMG[type],
            type
        }
      }),
      user: null,
      data: [],
      statistics: [],
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


  countPercentage() {
    const typesArr= this.state.data.map(card => card = card.chosenEmoji)
    const countObj = {
      exited: 0, happy: 0, fine: 0, sad: 0, angry: 0
    }
    for (const type of typesArr) {
      countObj[type] = countObj[type] ? countObj[type] + 1 : 1;
    }
    const sum = Object.values(countObj).reduce((num, sum) => {return num+sum}, 0 )

    for (const type in countObj) {
      countObj[type] = ((countObj[type] * 100)/sum).toFixed(1)
    }
    
    // const array = []
    // for (const type in countObj) {
    //   array.push({[type]: countObj[type]})
    // }

    this.setState({
      ...this.state,
      emotes: this.state.emotes.map(obj => {
        return {
          ...obj,
          percentage: countObj[obj.type]
        }
      })
    })
  }


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
          this.countPercentage();
        } else {
          this.setState({ ...this.state,
            data: [],
            emotes: this.state.emotes.map(obj => {
              return {
                ...obj,
                percentage: 0
              }
            }) })
        }
      })
      .catch(({ message }) => {
        useToastNotification({ message })
      })
      .finally(() => {
        this.toggleIsLoading()
        this.setChart()

      })


    }
  }

  deleteRecord({ uid, recordId }) {
    this.toggleIsLoading()
    deleteMoodRecordApi(uid, recordId)
    .then(() => {
      this.getAllRecords();
      useToastNotification({ message: 'Record was deleted.', type: TOAST_TYPE.success })
    })
    .catch(({ message }) => useToastNotification({ message }))
    .finally(() => {
      this.toggleIsLoading()
    })
  }
  
  //__________________________________________________

  setChart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: this.state.emotes.map(obj => {
              return obj.percentage
            }),
            // borderColor: '##0c0a09',
            backgroundColor: ['#F5DA95', '#E29583', '#959796', '#3C5A64', '#BA4531' ],
          },
        ] 
      },
      
    });
   
  }


  //__________________________________________________
 
  onClick = ({ target }) => {
    const deleteBtn = target.closest('.delete-btn')
    const recordCard = target.closest('ui-mood-record-card')


    if (deleteBtn) {
      return this.deleteRecord({
        uid: this.state.user.uid,
        recordId: recordCard.dataset.id
      })
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
    this.addEventListener('click', this.onClick)
  }
  
  componentWillUnmount() {
    this.removeEventListener('click', this.onClick)
  }

}

customElements.define("mood-tracker-records-page", MoodTrackerRecords)