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
    const [selectedCurrency, setSelectedCurrency] = useState("WETH");
    const [assetValue, setAssetValue] = useState(0);
    const [investValue, setInvestValue] = useState(0);

    const currencies = ["WETH", "USDC", "WBTC"];

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
                "стоимости активов падает ниже 105%, система ликвидирует позицию для защиты средств.",
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
            description: " ",
        },
        {
            type: "rent",
            title: "RENT",
        },
    ];

    const renderCurrencyDropdown = () => (
        <select
            className="CurrencyDropdown"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
        >
            {currencies.map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );

    const renderRentContent = () => (
        <div className="RentContent">
            <h2 className="RentUSDC">USDC: $1234K</h2>
            <div className="AssetBlock">
                <input
                    type="number"
                    className="AssetInput"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                />
                <div className="AssetDetails">
                    <span>{selectedCurrency}</span>
                    {renderCurrencyDropdown()}
                </div>
            </div>
            <div className="ActionBlock">
                <button className="ActionButton">Снять</button>
                <input type="number" className="ActionInput" />
                <button className="ActionButton">Реинвестировать</button>
            </div>
            <div className="InvestBlock">
                <h3 className="InvestTitle">Вложиться</h3>
                <div className="InvestField">
                    <input
                        type="number"
                        className="InvestInput"
                        value={investValue}
                        onChange={(e) => setInvestValue(e.target.value)}
                    />
                    {renderCurrencyDropdown()}
                </div>
                <p className="IncomeInfo">
                    Доход: 2% <span className="Fixed">FIXED</span>
                </p>
            </div>
        </div>
    );

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
                        {activeContent.description &&
                            activeContent.description.split("\n\n").map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                    </div>
                    {activeContent.title === "КОШЕЛЕК" && (
                        <div>
                            <button className="ConnectWalletButton" onClick={handleConnectWallet}>
                                Connect to MetaMask
                            </button>
                            {account && <p className="WalletAddress">Connected Account: {account}</p>}
                        </div>
                    )}
                </div>
            );
        }

        if (activeContent.type === "rent") {
            return renderRentContent();
        }
    };

    return <div className="MainContentContainer">{renderContent()}</div>;
};

export default MainContent;