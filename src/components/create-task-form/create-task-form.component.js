import { getCategoryApi } from "../../api/categories";
import { Component } from "../../core/Component";
import { useUserStore } from "../../hooks/useUserStore";
import { mapResponseApiData } from "../../utils/api";
import template from "./create-task-form.template.hbs";

export class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      categories: []
    };
    this.template = template();
  }

  getCategories() {
    getCategoryApi(this.state.user.uid)
    .then(({ data }) => {
      this.setState({
        ...this.state,
        categories: data ? mapResponseApiData(data) : [],
      });
  })
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
    this.getCategories()
  }

}

customElements.define("ui-create-task-form", CreateTaskForm);
