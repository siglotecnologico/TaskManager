import React from 'react';
import './TodosLoanding.css';

function TodosLoading() {
    return (
        <div className="loader-container">
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export { TodosLoading };
