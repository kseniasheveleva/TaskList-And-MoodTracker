import { CATEGORIES_COLORS } from "../../constants/colors";
import { Component } from "../../core/Component";
import template from "./create-category-form.template.hbs";

export class CreateCategoryForm extends Component {
  constructor() {
    super();
    this.state = {
      colors: []
    };
    this.template = template();
  }

  colorsIntoState = () => {
    const toArrOfObjects = Object.entries(CATEGORIES_COLORS).map(([key, value]) => ({
      name: key,
      color: value
    }));

    this.setState({
      colors: toArrOfObjects
    })

    console.log(this.state.colors);
  }

  componentDidMount() {
    this.colorsIntoState()
  }

}

customElements.define("ui-create-category-form", CreateCategoryForm);
