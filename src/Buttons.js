import React from 'react';

function Buttons(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="mx-auto col-3">
                    <button className="btn btn-lg btn-outline-primary">
                        All
                </button>
                </div>
                <div className="mx-auto col-3">
                    <button className="btn btn-lg btn-outline-primary">
                        Todo
                </button>
                </div>
                <div className="mx-auto col-3">
                    <button className="btn btn-lg btn-outline-primary">
                        Completed
                </button>
                </div>
            </div>
            <div className="my-3 row">
                <div className="col-10 mx-auto">
                    <button className="btn btn-lg btn-outline-primary btn-block" onClick={props.clearList}>
                        Clear All
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Buttons