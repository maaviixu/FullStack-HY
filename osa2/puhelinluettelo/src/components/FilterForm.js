import React from "react";

const Filter = ({text, action}) => {
    return (
        <form>
            <div>
                Filter shown with
                <input value={text} onChange={action} />
            </div>
        </form>
    )
}

export default Filter