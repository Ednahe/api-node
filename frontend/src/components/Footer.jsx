import React from "react";
import '../styles/footer.css';
import linkedin from '../images/linkedin.svg';
import github from '../images/github.svg';
import portfolio from '../images/portfolio.svg';

const Footer = () => {

    return <footer>
        <div className="container-footer">
            <p>Application faite avec ❤️</p>
            <div className="contain-icon-footer">
                <a href="https://www.linkedin.com/in/emmanuel-donahue/" target="_blank" rel="noreferrer" className="contain-icon">
                    <img src={linkedin} alt="logo linkedin" />
                </a>
                <a href="https://github.com/Ednahe" target="_blank" rel="noreferrer" className="contain-icon">
                    <img src={github} alt="logo github" />
                </a>
                <a href="https://portfolio-emmanuel.netlify.app/" target="_blank" rel="noreferrer" className="contain-icon">
                    <img src={portfolio} alt="logo portfolio" />
                </a>
            </div>
        </div>
    </footer>
}

export default Footer;