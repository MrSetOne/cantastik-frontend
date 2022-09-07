import {
  GithubOutlined,
  LinkedinFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__me">
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
      <p className="Footer__slogan">Play Hard</p>
      <p className="Footer__version">ver.1.1.0 released on 08/09/2022</p>
    </footer>
  );
};

export default Footer;
