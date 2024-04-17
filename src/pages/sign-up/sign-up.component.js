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
    const { setUser } = useUserStore();
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService.signUp(formData.email, formData.password)
    .then((data) => {
      setUser({ ...data.user });
      useToastNotification({
          message: "Success!!!",
          type: TOAST_TYPE.success,
      });
      useNavigate(ROUTES.userHome)
    })
    .catch((error) => {
        useToastNotification({ message: error.message });
      })
    .finally(() => {
      this.toggleIsLoading();
    })

  }

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
  }
  
  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }
}

customElements.define("sign-up-page", SignUp)