import React, { useState } from "react";
import "../styles/AdminPage.css";
const AdminPage = () => {
    const [walletAddress, setWalletAddress] = useState("");

    const handleAddWallet = () => {
        if (walletAddress.trim() === "") {
            alert("Введите корректный адрес кошелька!");
            return;
        }
        alert(`Кошелек ${walletAddress} успешно добавлен!`);
        setWalletAddress("");
    };

    return (
        <div className="AdminPageContainer">
            <h1 className="AdminPageTitle">Добавить новый кошелек</h1>
            <div className="AdminPageForm">
                <input
                    type="text"
                    className="AdminPageInput"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Введите адрес кошелька"
                />
                <button className="AdminPageButton" onClick={handleAddWallet}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
