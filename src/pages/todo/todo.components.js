import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useModal } from "../../hooks/useModal";
import template from "./todo.template.hbs";
import { useNavigate } from "../../hooks/useNavigate";
import { useToastNotification } from "../../hooks/useToastNavigation";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useUserStore";
import { mapResponseApiData } from "../../utils/api";
import { extractFormData } from "../../utils/extractFormData";


export class ToDo extends Component {
  constructor() {
    super();

    this.template = template({routes: ROUTES});
    this.state = {
      user: null,
      isLoading: false,
      categories: [],
    }
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  // __________________TASK

  openCreateTaskModel = () => {
    useModal({
      isOpen: true,
      title: 'Create Task',
      template: 'ui-create-task-form',
      
    })
  }

  // __________________CATEGORY


  showActiveTab = (currentCategory) => {
    const categories = Array.from(document.querySelectorAll('.category'));
    const content = Array.from(document.querySelectorAll('.category-content'));

    const categoryContentClass = currentCategory.getAttribute('data-type');
    const currentContent = document.querySelector(`.${categoryContentClass}`);

    categories.forEach(item => item.classList.remove('active'));
    content.forEach(item => item.classList.add('hidden'))
    currentCategory.classList.add('active');
    currentContent.classList.remove('hidden');
  }

  onClick = ({  target }) => {
    const createTaskBtn = target.closest('.create-task');
    const createCategoryBtn = target.closest('.create-category');
    const categoryBtn = target.closest('.category');

    if (createTaskBtn) {
      return this.openCreateTaskModel()
    }

    if (createCategoryBtn) {
      return this.createCategoryModel()
    }

    if (categoryBtn) {
      this.showActiveTab(categoryBtn)
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
    this.setUser();
    this.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onClick);
  }
}

customElements.define("todo-page", ToDo)