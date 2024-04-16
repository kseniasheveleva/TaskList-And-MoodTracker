import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import { extractFormData } from "../../utils/extractFormData";
import template from "./sign-in.template.hbs";

export class SignIn extends Component {
  constructor() {
    super();

    this.template = template({routes: ROUTES});
    this.state = {
      isLoading: false,
    }
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  signInUser = (evt) => {
    evt.preventDefault();
    const { setUser } = useUserStore();
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService
      .signIn(formData.email, formData.password)
      .then((data) => {
        setUser({ ...data.user });
        useNavigate(ROUTES.userHome);
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.signInUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.signInUser);
  }
}

customElements.define("sign-in-page", SignIn)