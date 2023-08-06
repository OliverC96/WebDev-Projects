import React, { createContext, useState } from "react";

const LoadingContext = createContext(true);

function LoadingProvider(props) {

    const [loading, updateLoading] = useState(true);

    const setLoading = (val) => {
        updateLoading(val);
    }

    return (
        <div>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                {props.children}
            </LoadingContext.Provider>
        </div>
    );

}

export {
    LoadingContext,
    LoadingProvider
}
