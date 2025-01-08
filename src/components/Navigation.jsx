import React from "react";
import "../styles/Navigation.css";

const Navigation = ({ onIconClick, activeIcon }) => {
    const icons = [
        { name: "logo", src: "/images/logo.png" },
        { name: "review", src: "/images/review.png" },
        { name: "features", src: "/images/features.png" },
        { name: "wallet", src: "/images/wallet.png" },
        { name: "rent", src: "/images/rent.png" },
    ];

    return (
        <div className="NavigationContainer">
            {icons.map((icon, index) => (
                <div
                    key={icon.name}
                    className="IconContainer"
                    onClick={() => onIconClick(index)}
                >
                    <img src={icon.src} alt={icon.name} className="IconImage" />
                    <div
                        className="Underline"
                        style={{
                            transform: activeIcon === index ? "scaleX(1)" : "scaleX(0)",
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Navigation;
