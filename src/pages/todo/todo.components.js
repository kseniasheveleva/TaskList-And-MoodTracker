import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useModal } from "../../hooks/useModal";
import template from "./todo.template.hbs";
import { useToastNotification } from "../../hooks/useToastNavigation";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useUserStore";
import { mapResponseApiData } from "../../utils/api";
import { extractFormData } from "../../utils/extractFormData";
import { createTaskApi, getTaskApi } from "../../api/tasks";
import { createCategoryApi, getCategoryApi } from "../../api/categories";


export class ToDo extends Component {
  constructor() {
    super();

    this.template = template({routes: ROUTES});
    this.state = {
      user: null,
      isLoading: false,
      categories: [],
      tasks: [],
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
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-task-form");
        const formData = extractFormData(form);
        this.toggleIsLoading();
        createTaskApi(this.state.user.uid, formData)
          .then(({ data }) => {
            this.loadAllTasks()
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
    })
  }

  loadAllTasks = () => {
    if (this.state.user?.uid) {
      this.toggleIsLoading();
      getTaskApi(this.state.user.uid)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            tasks: data ? mapResponseApiData(data) : [],
          });
        })
        .catch(({ message }) => {
          useToastNotification({ message });
        })
        .finally(() => {
          this.toggleIsLoading();
        });
    }
  };


  // __________________CATEGORY


  // showActiveTab = (currentCategory) => {
  //   const categories = Array.from(document.querySelectorAll('.category'));
  //   const content = Array.from(document.querySelectorAll('.category-content'));

  //   const categoryContentClass = currentCategory.getAttribute('data-type');
  //   const currentContent = document.querySelector(`.${categoryContentClass}`);

  //   categories.forEach(item => item.classList.remove('active'));
  //   content.forEach(item => item.classList.add('hidden'))
  //   currentCategory.classList.add('active');
  //   currentContent.classList.remove('hidden');
  // }

  loadAllCategories = () => {
    if (this.state.user?.uid) {
      this.toggleIsLoading();
      getCategoryApi(this.state.user.uid)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            categories: data ? mapResponseApiData(data) : [],
          });
          
          const c = this.state.categories.map(item => item.id.toString())
          console.log("массив из айди", c);
        })
        .catch(({ message }) => {
          useToastNotification({ message });
        })
        .finally(() => {
          this.toggleIsLoading();
        });
    }
  };

  openCategoryModal = () => {
    useModal({
      isOpen: true,
      title: 'Create Category',
      template: 'ui-create-category-form',
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-category-form");
        const formData = extractFormData(form);
        const taskContainer = document.querySelector('.todo__tasks')
        const div = document.createElement('div');
        this.toggleIsLoading();
        createCategoryApi(this.state.user.uid, formData)
          .then(({ data }) => {
            
            taskContainer.append(div);
            div.classList.add(`${this.state.categories.title}`)

            this.loadAllCategories()

            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
    })
  }

  onClick = ({  target }) => {
    const createTaskBtn = target.closest('.create-task');
    const createCategoryBtn = target.closest('.create-category');
    const categoryBtn = target.closest('.category');

    if (createTaskBtn) {
      return this.openCreateTaskModel()
    }

    if (createCategoryBtn) {
      return this.openCategoryModal()
    }

    // if (categoryBtn) {
    //   this.showActiveTab(categoryBtn)
    // }
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
    this.loadAllCategories();
    this.loadAllTasks();
    this.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onClick);
  }
}

customElements.define("todo-page", ToDo)