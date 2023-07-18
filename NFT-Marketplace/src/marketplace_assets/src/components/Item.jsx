import React, {useEffect, useState} from "react";
import {Actor, HttpAgent} from "@dfinity/agent";
import {idlFactory} from "../../../declarations/nft";
import Button from "./Button";
import { marketplace } from "../../../declarations/marketplace";
import PriceLabel from "./PriceLabel";
import StatusLabel from "./StatusLabel"
import CURRENT_USER_ID from "../index";
import { KeyboardArrowDown, KeyboardArrowUp, DragHandle } from '@mui/icons-material';

// Functional component which represents a single NFT object on the marketplace
function Item(props) {

    // Creating an HTTP agent for the local server
    const localServer = "http://localhost:8080/"
    const agent = new HttpAgent({
        host: localServer
    });

    if (process.env.NODE_ENV === "development") {
        agent.fetchRootKey();
    }

    let NFTActor;

    // Dynamically keeping track of the NFTs metadata
    const [NFT, setNFT] = useState({
        name: "",
        owner: "",
        content: "",
        lastSale: {
            amount: 0,
            currency: "",
            time: "",
            initial: true
        }
    });

    // Auxiliary hook to aid in the styling of the price change since last sale
    const [listingStatus, setListingStatus] = useState({
        priceChange: "",
        colour: "",
        icon: null
    });

    // Using hooks to keep track of various states
    const [button, setButton] = useState();
    const [priceInput, setPriceInput] = useState();
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [sellStatus, setSellStatus] = useState("");
    const [priceLabel, setPriceLabel] = useState();
    const [isVisible, setVisibility] = useState(true);
    const [blur, setBlur] = useState();

    // Initiating a NFT purchase request to the blockchain
    async function handleBuy() {

        setLoaderHidden(false);
        const purchaseResult = await marketplace.purchaseNFT(props.id, CURRENT_USER_ID);

        // If the transaction was approved, transfer the NFT from the marketplace to the buyer's private collection
        if (purchaseResult === "Purchase successful!") {
            setVisibility(false);
            setLoaderHidden(true);
        }

    }

    let sellPrice;

    // Displaying the price input, and keeping track of the entered sell price
    function handleSell() {
        setPriceInput(
            <input
                placeholder="Listing price (PETR)"
                value={sellPrice}
                type="number"
                className="price-input"
                onChange={(e) => sellPrice = e.target.value}
            />
        );
        setButton(<Button handleClick={sellItem} text="Confirm" />);
    }

    // Initiating a request to the blockchain to create a public NFT listing
    async function sellItem() {

        // Blurring the sold item
        setLoaderHidden(false);
        setBlur({
            filter: "blur(4px)"
        });

        const SUCCESS_MESSAGE = {
            listing: "Successfully created NFT listing on the marketplace!",
            transfer: "Successfully transferred ownership!"
        }

        const listingResult = await marketplace.createListing(props.id, Number(sellPrice));
        const newOwner = await marketplace.getMarketplaceCanisterID();

        // Proceed only if the listing was successfully created
        if (listingResult === SUCCESS_MESSAGE.listing) {

            // Attempt to transfer ownership from buyer to seller
            const transferResult = await NFTActor.transferOwnership(newOwner, true);

            // Proceed only if the transfer was successful
            if (transferResult === SUCCESS_MESSAGE.transfer) {

                // Reset and update components accordingly to reflect the transaction
                setLoaderHidden(true);
                setButton();
                setPriceInput();
                setSellStatus("Listed");
                setNFT((prev) => {
                    return {
                        ...prev,
                        owner: "Marketplace"
                    };
                });

            }

        }

        // Revert the blur effect to visually indicate the listing was unsuccessful
        else {
            setLoaderHidden(true);
            setBlur();
        }

    }

    // Loading the NFTs onto the frontend
    async function loadNFT() {

        // Instantiating an NFT actor
        NFTActor = await Actor.createActor(
            idlFactory,
            {
                agent: agent,
                canisterId: props.id
            }
        );

        // Retrieving the NFTs metadata from the IC backend
        const itemName = await NFTActor.getName();
        const itemOwner = await NFTActor.getOwner();
        const rawImageData = await NFTActor.getAsset();

        // Creating a PNG object URL with the raw image byte stream
        const imageContent = new Uint8Array(rawImageData);
        const image = URL.createObjectURL(new Blob([imageContent.buffer], {type: "image/png"}));

        // Reflecting the retrieved metadata on the React frontend
        setNFT((prev) => {
            return {
                ...prev,
                name: itemName,
                owner: itemOwner.toText(),
                content: image
            };
        });

        const isListed = await marketplace.isListed(props.id);

        // Styling a user's private NFT collection gallery
        if (props.role === "collection") {

            // Providing visual indications that the NFT is currently listed on the marketplace
            if (isListed) {
                setSellStatus("Listed");
                setBlur({
                    filter: "blur(4px)"
                });
                setNFT((prev) => {
                    return {
                        ...prev,
                        owner: "Marketplace"
                    };
                });
            }

            // Displaying a sell button if the NFT is not listed (still in the owner's possession)
            else {
                setButton(<Button handleClick={handleSell} text="Sell" />);
            }

        }

        // Styling the public NFT marketplace listing gallery
        else if (props.role === "discover") {

            // Retrieve listing metadata from the backend canister
            const listingPrice = await marketplace.getListingPrice(props.id);
            const listingData = await marketplace.getLastSale(props.id);
            const tokenSymbol = await marketplace.getSymbol();

            // Helper method which converts the last sale's timestamp into a suitable unit of time
            function convertSaleTime(saleTime) {
                const nsToS = 1/1000000000;
                const secondsPer = {
                    minute: 60,
                    hour: 3600,
                    day: 86400
                };
                const saleTimeS = Number(saleTime) * nsToS;
                if (saleTimeS < secondsPer.minute) {
                    return Math.round(saleTimeS).toString() + "s";            // Elapsed time in seconds
                }
                else if (saleTimeS < secondsPer.hour) {
                    return Math.round(saleTimeS / 60).toString() + "m";    // Elapsed time in minutes
                }
                else if (saleTimeS < secondsPer.day) {
                    return Math.round(saleTimeS / 3600).toString() + "h";  // Elapsed time in hours
                }
                else {
                    return Math.round(saleTimeS / 86400).toString() + "d"; // Elapsed time in days
                }
            }

            // Helper method which determines the status of the current listing (current listing price relative to the most recent sale)
            function computeStatus(lastSalePrice) {

                const currListingPrice = Number(listingPrice);
                const priceRatio = currListingPrice / Number(lastSalePrice);
                const priceStatus = {
                    INCREASE: "#e63946",
                    DECREASE: "#2a9d8f",
                    EQUAL: "#FFFFFF"
                };

                // Case 1: price of current listing has decreased relative to the last sale (optimal)
                if (priceRatio < 1) {
                    const priceChange = ((Number(lastSalePrice) - currListingPrice) / Number(lastSalePrice)) * 100;
                    setListingStatus({
                        priceChange: priceChange.toFixed(2) + "%",
                        colour: priceStatus.DECREASE,
                        icon: <KeyboardArrowDown style={{fontSize: "23px", color: priceStatus.DECREASE}} />
                    });
                }

                // Case 2: price of current listing has increased relative to the last sale (un-optimal)
                else if (priceRatio > 1) {
                    const priceChange = ((currListingPrice - Number(lastSalePrice)) / Number(lastSalePrice)) * 100;
                    setListingStatus({
                        priceChange: priceChange.toFixed(2) + "%",
                        colour: priceStatus.INCREASE,
                        icon: <KeyboardArrowUp style={{fontSize: "23px", color: priceStatus.INCREASE}} />
                    });
                }

                // Case 3: price of current listing remains unchanged relative to the last sale (unbiased)
                else {
                    setListingStatus({
                        priceChange: priceRatio.toFixed(2) + "%",
                        colour: priceStatus.EQUAL,
                        icon: <DragHandle style={{fontSize: "18px", color: priceStatus.EQUAL}} />
                    });
                }

            }

            // If the listing has been sold at least once previously on the marketplace, display the relevant statistics
            if (listingData.length !== 0) {
                const [time, amount] = listingData;
                computeStatus(amount);
                setNFT((prev) => {
                    return {
                        ...prev,
                        owner: "Marketplace",
                        lastSale: {
                            amount: amount,
                            currency: tokenSymbol,
                            time: convertSaleTime(time),
                            initial: false
                        }
                    };
                });
            }

            // Display price and buy button for each listed NFT
            setButton(<Button handleClick={handleBuy} text="Buy" />);
            setPriceLabel(<PriceLabel sellPrice={listingPrice.toString()} />);

        }

    }

    // Load all minted NFTs alongside initial loading of the page (mounting of the Item component)
    useEffect(() => {
        loadNFT();
    }, []);

    return (
        <div className="disGrid-item" style={{display: isVisible ? "inline" : "none"}}>
            <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
                <img
                    className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
                    src={NFT.content}
                    style={blur}
                />
                <div className="lds-ellipsis" hidden={loaderHidden}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="disCardContent-root">
                    {priceLabel}
                    <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
                        {NFT.name}
                        <span className="purple-text"> {sellStatus} </span>
                    </h2>
                    {props.role === "collection" &&
                        <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
                            Owner: {NFT.owner}
                        </p>
                    }
                    {!NFT.lastSale.initial &&
                        <div>
                            <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
                                Last Sale: {NFT.lastSale.amount.toString()} {NFT.lastSale.currency} [{listingStatus.icon}<StatusLabel {...listingStatus} />]
                            </p>
                            <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
                                Time on Market: {NFT.lastSale.time.toString()}
                            </p>
                        </div>
                    }
                    {priceInput}
                    {button}
                </div>
            </div>
        </div>
    );
}

export default Item;
