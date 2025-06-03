import React from 'react';
import '../Error/ErrorMessage.css';

const ErrorMessage = ({ message, visible = true }) => {
    if (!visible || !message) return null;

    return (
        <div style={styles.container}>
            <p style={styles.text}>{message}</p>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px 15px',
        borderRadius: '8px',
        border: '1px solid #f5c6cb',
        margin: '8px 0',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
};


export default ErrorMessage;
