import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./home.template.hbs";
import "../../components/router-link/router-link.component";
import { useUserStore } from "../../hooks/useUserStore";

export class HomePage extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      links: [
        {
          label: "Sign In",
          href: ROUTES.signIn,
        },
        {
          label: "Sign Up",
          href: ROUTES.signUp,
        }
      ]
    }
  }

  setLinks() {
    const { getUser } = useUserStore();
    if (getUser()) {
      this.setState({
        ...this.state,
        links: [
          {
            label: "Lobby",
            href: ROUTES.userHome,
          }
        ]
      })
    }
  }

  componentDidMount() {
    this.setLinks()
  }
}

customElements.define("home-page", HomePage);