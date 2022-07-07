import {
  GithubOutlined,
  LinkedinFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="Footer">
      <div>
        <p>Created by Michael L. Sánchez</p>
        <a
          href="https://github.com/MrSetOne"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined />
        </a>
        <a
          href="https://www.linkedin.com/in/michael-lara-sanchez-376672154/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinFilled />
        </a>
        <a
          href="https://twitter.com/MrSetOne1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterCircleFilled />
        </a>
      </div>
      <p>Play Hard</p>
      <p>ver.1.0.0 released on 13/07/2022</p>
    </footer>
  );
};

export default Footer;
