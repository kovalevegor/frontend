import React from "react";
import "../styles/MainContent.css";

const MainContent = ({ activeIcon }) => {
    const content = [
        {
            type: "image",
            src: "/images/athene.png",
            alt: "Athene",
        },
        {
            type: "text",
            title: "ОБЗОР ПРОЕКТА \"AGORA\"",
            description:
                "Платформа поддерживает маржинальную торговлю с использованием заемного капитала. " +
                "Пользователи могут предоставлять свои активы как обеспечение, получать до 10-кратного " +
                "заемного капитала и использовать его для торговли. \n\n" +
                "Контракт автоматически контролирует уровень ликвидации: если соотношение долга к " +
                "стоимости активов падает ниже 105%, система ликвидирует позицию для защиты средств. \n\n" +
                "KERDOS® Абрамов Вадим, Вьюков Ярослав, Ковалев Егор",
        },
        {
            type: "text",
            title: "КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ",
            description:
                "Заемный капитал: возможность использовать заемные средства для увеличения торговой позиции.\n\n" +
                "Торговля через Uniswap: поддержка торговли ограниченным списком токенов (WETH, WBTC, USDC).\n\n" +
                "Риски ликвидации: автоматическая защита ликвидности через систему мониторинга обеспечения.",
        },
        {
            type: "text",
            title: "КОШЕЛЕК",
            description:
                " ",
        },
    ];

    // Функция для разделения текста на абзацы
    const renderDescription = (description) => {
        // Заменяем \n\n на <br /> для добавления новой строки
        return description.split("\n\n").map((text, index) => (
            <p key={index}>{text}</p> // возвращаем каждый фрагмент текста в теге <p>
        ));
    };

    const renderContent = () => {
        const activeContent = content[activeIcon];

        if (activeContent.type === "image") {
            return (
                <img
                    src={activeContent.src}
                    alt={activeContent.alt}
                    className="MainImage"
                />
            );
        }

        if (activeContent.type === "text") {
            return (
                <div className="MainTextContainer">
                    <h1 className="MainText bold">{activeContent.title}</h1>
                    <div className="MainText light">
                        {renderDescription(activeContent.description)}
                    </div>
                </div>
            );
        }
    };

    return <div className="MainContentContainer">{renderContent()}</div>;
};

export default MainContent;
