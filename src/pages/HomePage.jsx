import React, { useState } from "react";
import Navigation from "../components/Navigation";
import MainContent from "../components/MainContent";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
    const [activeIcon, setActiveIcon] = useState(0);

    const handleIconClick = (index) => {
        setActiveIcon(index);
    };

    return (
        <div className="HomePageContainer">
            {/* Left Block */}
            <Link to="/trade" className="LinkBlockLeft">
                {/*<img src="/images/arrow-l.png" alt="Arrow Left" className="ArrowIcon ArrowLeft" />*/}
                <div className="BlockText">
                    С<br />Д<br />Е<br />Л<br />К<br />И
                </div>
            </Link>

            {/* Right Block */}
            <Link to="/borrow" className="LinkBlockRight">
                <div className="BlockText">
                    В<br />З<br />А<br />Й<br />М<br />Ы
                </div>
                {/*<img src="/images/arrow-r.png" alt="Arrow Right" className="ArrowIcon ArrowRight" />*/}
            </Link>

            {/* Navigation */}
            <Navigation onIconClick={handleIconClick} activeIcon={activeIcon} />

            {/* Main Content */}
            <MainContent activeIcon={activeIcon} />
        </div>
    );
};

export default HomePage;
