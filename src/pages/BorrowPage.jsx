import React, { useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import "../styles/BorrowPage.css";

const BorrowPage = () => {
    const [collateralValue, setCollateralValue] = useState(0);
    const [borrowValue, setBorrowValue] = useState(0);
    const [selectedCollateralToken, setSelectedCollateralToken] = useState("WETH");

    const maxBorrowValue = collateralValue * 0.75; // Коэффициент доступной суммы займа
    const healthFactor =
        collateralValue > 0 ? ((collateralValue - borrowValue) / collateralValue) * 100 : 100; // Процент работоспособности

    return (
        <div className="BorrowPageContainer">
            {/* Ссылки на другие страницы */}
            <Link to="/" className="LinkBlockLeft">
                <div className="BlockText">
                    Н<br />А<br />Ч<br />А<br />Л<br />О
                </div>
            </Link>
            <Link to="/trade" className="LinkBlockRight">
                <div className="BlockText">
                    С<br />Д<br />Е<br />Л<br />К<br />И
                </div>
            </Link>

            {/* Основной контент страницы */}
            <div className="BorrowForm">
                <div className="CollateralBlock">
                    <span className="BlockLabel">Внести залог</span>
                    <div className="CollateralInput">
                        <input
                            type="number"
                            value={collateralValue}
                            onChange={(e) => setCollateralValue(Number(e.target.value))}
                            className="AmountInput"
                            placeholder="0"
                        />
                        <div className="TokenSelector">
                            <img src={`/images/${selectedCollateralToken}.png`} alt={selectedCollateralToken} />
                            <span>{selectedCollateralToken}</span>
                            <img src="/images/drop-down-white.png" alt="dropdown" className="DropdownArrow" />
                        </div>
                    </div>
                </div>

                <div className="BorrowInfo">
                    <div className="InfoItem">
                        <span>Коэффициент работоспособности:</span>
                        <span className={`HealthFactor ${healthFactor > 50 ? "Healthy" : "Unhealthy"}`}>
                            {healthFactor.toFixed(2)}%
                        </span>
                    </div>
                    <div className="InfoItem">
                        <span>Максимальная сумма займа:</span>
                        <span>${maxBorrowValue.toFixed(2)}</span>
                    </div>
                </div>

                <div className="BorrowBlock">
                    <span className="BlockLabel">Сумма займа</span>
                    <input
                        type="number"
                        value={borrowValue}
                        onChange={(e) => setBorrowValue(Number(e.target.value))}
                        className="AmountInput"
                        placeholder="0"
                        max={maxBorrowValue}
                    />
                </div>

                <div className="ActionButtons">
                    <button
                        className="ActionButton Borrow"
                        onClick={() => alert("Займ выполнен!")}
                        disabled={borrowValue > maxBorrowValue || borrowValue === 0}
                    >
                        Занять
                    </button>
                    <button
                        className="ActionButton Repay"
                        onClick={() => alert("Займ погашен!")}
                        disabled={borrowValue === 0}
                    >
                        Погасить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BorrowPage;
