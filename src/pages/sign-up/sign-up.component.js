import { ROUTES } from "../../constants/routes";
import { TOAST_TYPE } from "../../constants/toast";
import { Component } from "../../core/Component";
import { useNavigate } from "../../hooks/useNavigate";
import { useToastNotification } from "../../hooks/useToastNavigation";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import { extractFormData } from "../../utils/extractFormData";
import template from "./sign-up.template.hbs";

export class SignUp extends Component {
  constructor() {
    super();

    this.template = template({ routes: ROUTES });
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

  registerUser = (evt) => {
    evt.preventDefault();
    const { email, password, confirmPassword, ...rest } = extractFormData(evt.target);
    if (password !== confirmPassword) {
      useToastNotification({ message: 'Passwords do not match' })
    } else {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .signUp(email, password)
      .then(() => {
        authService.updateUserProfile(rest).then(() => {
          setUser({ ...authService.getCurrentUser() });
          useToastNotification({
            message: "Success!!!",
            type: TOAST_TYPE.success,
          });
          useNavigate(ROUTES.userHome);
        });
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }};

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
  }
  
  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }
}

customElements.define("sign-up-page", SignUp)