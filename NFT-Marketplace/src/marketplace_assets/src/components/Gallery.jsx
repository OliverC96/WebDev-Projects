import React, {useState, useEffect} from "react";
import Item from "./Item";
import {marketplace} from "../../../declarations/marketplace";
import CollectionsIcon from '@mui/icons-material/Collections';
import CURRENT_USER_ID from "../index";

// Functional component to represent a user's gallery (current collection of NFTs)
function Gallery(props) {

    // Keeping track of the items (NFTs) currently present in the user's collection
    const [items, setItems] = useState();

    // Keeping track of the user's current available balance
    const [balance, setBalance] = useState({
        amount: "",
        symbol: ""
    });

    // Setting the NFTs - mapping NFT principal id's to complete, styled Item components
    function fetchNFTs() {
        if (props.ids !== undefined) {
            setItems(
                props.ids.map((id) => (
                    <Item id={id} key={id.toText()} role={props.role} />
                ))
            )
        }
    }

    // Retrieve the user's current balance, and display it on the frontend
    async function fetchUserBalance() {
        const tokenSymbol = await marketplace.getSymbol();
        const userBalance = await marketplace.checkBalance(CURRENT_USER_ID);
        setBalance({
            amount: userBalance.toString(),
            symbol: tokenSymbol
        });
    }

    // Fetch the user's collection and current balance whenever the Gallery component is initially mounted to the page
    useEffect(() => {
        fetchNFTs();
        fetchUserBalance();
    }, []);

    return (
        <div className="gallery-view">
            <h3 className="makeStyles-title-99 Typography-h3">
                {props.title}
                {props.role === "collection" && <CollectionsIcon style={{fontSize: "46px", marginLeft: "16px", marginBottom: "12px"}}/>}
            </h3>
            {props.role === "collection" && <h4 style={{color: "#3ECCBB"}}> Current balance: {balance.amount} {balance.symbol} </h4>}
            <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
                <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                    <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
                        {items}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
