import './Footer.css';
const Footer = () => {
  return (
    <footer>
      <hr />
      <div className="social-media">
        <a href="https://www.linkedin.com/in/margarita-petrova-356aaa1b0/"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/Margi13"><i className="fab fa-github-square"></i></a>
      </div>
      <div className="container">
        <p className="info-text">Made by Margarita Petrova with ReactJS</p>
      </div>
    </footer>
  );
}

export default Footer;