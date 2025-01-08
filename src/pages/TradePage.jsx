import React, { useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import "../styles/TradePage.css";

const TradePage = () => {
    const [isSwapped, setIsSwapped] = useState(false);
    const [sellValue, setSellValue] = useState(0);
    const [selectedSellToken, setSelectedSellToken] = useState("WETH");
    const [selectedBuyToken, setSelectedBuyToken] = useState("WBTC");
    const [isSellDropdownOpen, setIsSellDropdownOpen] = useState(false);
    const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);

    const handleSwap = () => {
        setIsSwapped(!isSwapped);
        const temp = selectedSellToken;
        setSelectedSellToken(selectedBuyToken);
        setSelectedBuyToken(temp);
    };

    const toggleSellDropdown = () => {
        setIsSellDropdownOpen(!isSellDropdownOpen);
        setIsBuyDropdownOpen(false);
    };

    const toggleBuyDropdown = () => {
        setIsBuyDropdownOpen(!isBuyDropdownOpen);
        setIsSellDropdownOpen(false);
    };

    const handleSellTokenSelect = (token) => {
        setSelectedSellToken(token);
        setIsSellDropdownOpen(false);
    };

    const handleBuyTokenSelect = (token) => {
        setSelectedBuyToken(token);
        setIsBuyDropdownOpen(false);
    };

    const availableTokens = ["WETH", "WBTC", "USDC"];

    return (
        <div className="TradePageContainer">
            {/* Ссылки на другие страницы */}
            <Link to="/" className="LinkBlockLeft">
                <div className="BlockText">
                    Н<br />А<br />Ч<br />А<br />Л<br />О
                </div>
            </Link>
            <Link to="/borrow" className="LinkBlockRight">
                <div className="BlockText">
                    В<br />З<br />А<br />Й<br />М<br />Ы
                </div>
            </Link>

            {/* Блок "Продать" */}
            <div className={`TradeBlock ${isSwapped ? "TradeBlock-Buy" : "TradeBlock-Sell"}`}>
                <span className="TradeLabel">Продать</span>
                <input
                    type="number"
                    value={sellValue}
                    onChange={(e) => setSellValue(e.target.value)}
                    className="TokenAmountInput"
                    placeholder="0"
                />
                <span className="DollarAmount">${(sellValue * 100).toFixed(2)}</span>
                <div className="TokenSelector">
                    <img src={`/images/${selectedSellToken}.png`} alt={selectedSellToken} />
                    <span>{selectedSellToken}</span>
                    <img
                        src="/images/drop-down-white.png"
                        alt="dropdown"
                        className="DropdownArrow"
                        onClick={toggleSellDropdown}
                    />
                    {isSellDropdownOpen && (
                        <ul className="DropdownMenu">
                            {availableTokens.map((token) => (
                                <li
                                    key={token}
                                    onClick={() => handleSellTokenSelect(token)}
                                    className="DropdownItem"
                                >
                                    <img src={`/images/${token}.png`} alt={token} />
                                    <span>{token}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Блок обмена */}
            <div className="SwapBlock" onClick={handleSwap}>
                <div className="SwapIcon">
                    <img src="/images/arrow-swap.png" alt="swap" />
                </div>
            </div>

            {/* Блок "Приобрести" */}
            <div className={`TradeBlock ${isSwapped ? "TradeBlock-Sell" : "TradeBlock-Buy"}`}>
                <span className="TradeLabel">Приобрести</span>
                <input
                    type="number"
                    value={(sellValue * 0.98).toFixed(2)}
                    readOnly
                    className="TokenAmountInput ReadOnly"
                />
                <span className="DollarAmount">${(sellValue * 98).toFixed(2)}</span>
                <div className="TokenSelector">
                    <img src={`/images/${selectedBuyToken}.png`} alt={selectedBuyToken} />
                    <span>{selectedBuyToken}</span>
                    <img
                        src="/images/drop-down-black.png"
                        alt="dropdown"
                        className="DropdownArrow"
                        onClick={toggleBuyDropdown}
                    />
                    {isBuyDropdownOpen && (
                        <ul className="DropdownMenu">
                            {availableTokens.map((token) => (
                                <li
                                    key={token}
                                    onClick={() => handleBuyTokenSelect(token)}
                                    className="DropdownItem"
                                >
                                    <img src={`/images/${token}.png`} alt={token} />
                                    <span>{token}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TradePage;
