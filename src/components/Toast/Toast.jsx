import React, { useEffect } from "react";
import "./toast.css";

const Toast = ({ message, type = "error", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000); // 4 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            <span>{message}</span>
            <button className="close-btn" onClick={onClose}>
                ✖
            </button>
        </div>
    );
};

export default Toast;
