import { Component } from "./core/Component";
import template from "./app.template.hbs";
import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/sign-in/sign-in.component";
import "./pages/sign-up/sign-up.component";
import "./pages/user-home/user-home.component";
import "./pages/todo/todo.components";
import "./pages/mood-tracker/mood-tracker.component";
import "./pages/mood-tracker-records/mood-tracker-records.component";

import "./components/button/button.component";
import "./components/input/input.component";
import "./components/loader/loader.component";
import "./components/toast/toast.component";
import "./components/modal/modal.component";
import "./components/create-task-form/create-task-form.component";
import "./components/create-category-form/create-category-form.component";
import "./components/task-card/task-card.component";
import "./components/mood-template-first/mood-template-first.component";
import "./components/mood-template-second/mood-template-second.component";
import "./components/mood-template-third/mood-template-third.component";
import "./components/mood-record-card/mood-record-card.component";
import { ROUTES } from "./constants/routes";
import { useUserStore } from "./hooks/useUserStore";
import { authService } from "./services/Auth";
import { useToastNotification } from "./hooks/useToastNavigation";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  initializeApp() {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .authorizeUser()
      .then((user) => {
        if (user.uid) {
          setUser({ ...user });
        }
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }

  componentDidMount() {
    this.initializeApp();
  }
}

customElements.define("my-app", App);