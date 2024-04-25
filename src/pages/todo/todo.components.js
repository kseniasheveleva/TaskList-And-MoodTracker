import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useModal } from "../../hooks/useModal";
import template from "./todo.template.hbs";
import { useToastNotification } from "../../hooks/useToastNavigation";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useUserStore";
import { mapResponseApiData } from "../../utils/api";
import { extractFormData } from "../../utils/extractFormData";
import { createTaskApi, deleteTaskApi, getTaskApi, getTaskByIdApi, updateTaskApi } from "../../api/tasks";
import { createCategoryApi, deleteCategoryApi, getCategoryApi } from "../../api/categories";
import { log } from "handlebars";
import { set } from "firebase/database";


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
    if (this.state.categories.length !== 0) {
      useModal({
        isOpen: true,
        title: 'Create Task',
        template: 'ui-create-task-form',
        onSuccess: (modal) => {
          const form = modal.querySelector(".create-task-form");
          const formData = {...extractFormData(form), isCompleted: false};
  
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
    } else {
      useToastNotification({ 
        message: 'To create a task create category first.',
        type: TOAST_TYPE.info,
      })
    }
  }

  loadAllTasks = () => {
    if (this.state.user?.uid) {
      this.toggleIsLoading();
      getTaskApi(this.state.user.uid)
      .then(({ data }) => {
        if (data) {
          console.log('LOAD ALL TASKS',data);
          this.setState({
            ...this.state,
            categories: this.state.categories.map((category) => {
              return { 
                ...category,
                tasks: mapResponseApiData(data).filter((task) => task.category == category.title)
              }
            })
          })
        } else {
          this.setState({
            ...this.state,
            categories: this.state.categories.map((category) => {
              return { 
                ...category,
                tasks: []
              }
            })
          })
        }
        console.log(this.state.categories);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
    }
  };

  deleteTask = ({ taskId }) => {
    this.toggleIsLoading();
    deleteTaskApi(this.state.user.uid, taskId)
    .then(() => {
      this.loadAllTasks();
      useToastNotification({
        message: `Task was deleted`,
        type: TOAST_TYPE.success,
      });
    })
    .catch(({ message }) => {
      useToastNotification({ message });
    })
    .finally(() => {
      this.toggleIsLoading();
    });
  }

  changeTaskStatus = ({ taskId }) => {
    const uid = this.state.user.uid;
    getTaskByIdApi(uid, taskId)
    .then(({ data }) => {
      console.log(data);
      updateTaskApi(uid, taskId, {isCompleted: !data.isCompleted})
      .then(() => this.loadAllTasks())
    })
    .catch(({ message }) => {
      useToastNotification({ message });
    })
    .finally(() => {
      this.toggleIsLoading();
    });

  }


  // __________________CATEGORY


  loadAllCategories = () => {
    if (this.state.user?.uid) {
      this.toggleIsLoading();
      getCategoryApi(this.state.user.uid)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            categories: data ? mapResponseApiData(data).map((item) => item = {...item, tasks: []}) : [],
          });
          console.log('loadAllCategories', this.state.categories);
          this.loadAllTasks();
        })
        .catch(({ message }) => {
          useToastNotification({ message });
        })
        .finally(() => {
          this.toggleIsLoading();
        });
    }
  };

  deleteCategory = ({id, title}) => {
    const uid = this.state.user.uid
    useModal({
      title: 'Delete category',
      isOpen: true,
      confirmation: `Do you really want to delete category "${title}"? All the task of it will be deleted.`,
      successCaption: "Delete",
      onSuccess: () => {
        this.toggleIsLoading();
        deleteCategoryApi(uid, id)
        .then(() => {
          this.loadAllCategories();
          useToastNotification({
            message: `Category "${title}" was deleted`,
            type: TOAST_TYPE.success,
          });

          getTaskApi(uid).then(({ data }) => {
            const mapped = mapResponseApiData(data)
            const ids = mapped.filter((task) => task.category === title).map((task) => task.id)
            ids.forEach((id) => {
              deleteTaskApi(uid, id)
            })
          })
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

  openCategoryModal = () => {
    useModal({
      isOpen: true,
      title: 'Create Category',
      template: 'ui-create-category-form',
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-category-form");
        const formData = extractFormData(form);
        this.toggleIsLoading();
        createCategoryApi(this.state.user.uid, formData)
          .then(() => {
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
    const deleteCategoryBtn = target.closest('.delete-btn');
    const deleteTaskBtn = target.closest('.delete-task-btn');
    const checkboxBtn = target.closest('.checkbox');

    const taskCard = target.closest('ui-task-card')

    if (createTaskBtn) {
      return this.openCreateTaskModel()
    }

    if (createCategoryBtn) {
      return this.openCategoryModal()
    }

    if (deleteCategoryBtn) {
      return this.deleteCategory({
        id: deleteCategoryBtn.dataset.id,
        title: deleteCategoryBtn.dataset.title,
      })
    }

    if (deleteTaskBtn) {
      return this.deleteTask({
        userId: this.state.user.uid,
        taskId: taskCard.dataset.id,
      })
    }

    if (checkboxBtn) {
      return this.changeTaskStatus({
        taskId: taskCard.dataset.id,
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
    this.setUser();
    this.loadAllCategories();
    this.addEventListener('click', this.onClick);
  }
  
  componentWillUnmount() {
    this.removeEventListener('click', this.onClick);
  }
}

customElements.define("todo-page", ToDo)