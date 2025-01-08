import React, { useState } from "react";
import { ethers } from "ethers";
import "../styles/MainContent.css";

const connectToMetaMask = async () => {
    if (window.ethereum) {
        try {
            const client = new ethers.BrowserProvider(window.ethereum);
            const signer = await client.getSigner();
            return { client, signer };
        } catch (error) {
            console.error("User denied account access or error occurred", error);
            throw error;
        }
    } else {
        console.log("metamask is not installed");
        throw new Error("metamask is not installed");
    }
};

const MainContent = ({ activeIcon }) => {
    const [account, setAccount] = useState(null);
    
    const handleConnectWallet = async () => {
        try {
            const { client, signer } = await connectToMetaMask();
            setAccount(await signer.getAddress());
        } catch (error) {
            console.error("Failed to connect to MetaMask", error);
        }
    };

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
                    {activeContent.title === "КОШЕЛЕК" && (
                        <div>
                            <button onClick={handleConnectWallet}>Connect to MetaMask</button>
                            {account && <p>Connected Account: {account}</p>}
                        </div>
                    )}
                </div>
            );
        }
    };

    return <div className="MainContentContainer">{renderContent()}</div>;
};

export default MainContent;
