import React from "react";

// Functional component which represents the price label associated with publicly available listings
function PriceLabel(props) {
    return (
        <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
            <span className="disChip-label"> {props.sellPrice} PETR </span>
        </div>
    );
}

export default PriceLabel;