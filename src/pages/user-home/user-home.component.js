import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import template from "./user-home.template.hbs";

export class UserHome extends Component {
  constructor() {
    super();

    this.template = template({routes: ROUTES});
    this.state = {
      user: null,
      isLoading: false,
    }
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
    console.log(this.state.user);
  }

  logOut = () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
    .logOut()
    .then(() => {
      setUser(null);
      useNavigate(ROUTES.home)
    })
    .finally(() => {
      this.toggleIsLoading();
    })
  }

  onClick = ({ target }) => {
    const logOutBtn = target.closest('.logout-btn')

    if (logOutBtn) {
      this.logOut()
    }
  }

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.onClick)
  }
}

customElements.define("user-home-page", UserHome)