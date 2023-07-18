import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Item from "./Item";
import { marketplace } from "../../../declarations/marketplace";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Functional component which encapsulates the NFT minting process
function Minter() {

    // Keeping track of various states using native and third-party React hooks
    const { register, handleSubmit } = useForm();
    const [ principalID, setPrincipalID ] = useState("");
    const [ loaderHidden, setLoaderHidden ] = useState(true);

    // Initiating the minting request to the backend
    async function onSubmit(formData) {

        setLoaderHidden(false);

        // Retrieving input from the form fields
        const itemName = formData.name;
        const itemImage = formData.image[0];
        const imageContent = [...new Uint8Array(await itemImage.arrayBuffer())];

        // Minting the NFT on the Internet Computer blockchain
        const newNFTID = await marketplace.mintNFT(imageContent, itemName);
        setPrincipalID(newNFTID);

        setLoaderHidden(true);

    }

    // Conditional rendering based upon the state of the create NFT form submission
    return (
        principalID === ""
            ?
                <div className="minter-container">
                    <div className="lds-ellipsis" hidden={loaderHidden}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
                        Mint an NFT
                    </h3>
                    <h4 style={{marginBottom: "30px", color: "#c8b6ff"}}> Conveniently create new NFTs at any time </h4>
                    <ArrowDownwardIcon fontSize="large" style={{marginBottom: "30px"}}/>
                    <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
                        Upload Image
                    </h6>
                    <form className="makeStyles-form-109" noValidate="" autoComplete="off">
                        <div className="upload-container">
                            <input
                                {...register("image", {required: true})}
                                className="upload"
                                type="file"
                                accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp,image/png"
                            />
                        </div>
                        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
                            Collection Name
                        </h6>
                        <div
                            className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
                            <div
                                className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
                                <input
                                    {...register("name", {required: true})}
                                    placeholder="e.g. CryptoDunks"
                                    type="text"
                                    className="form-InputBase-input form-OutlinedInput-input"
                                />
                                <fieldset
                                    className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
                            </div>
                        </div>
                        <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
                            <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">Mint</span>
                        </div>
                    </form>
                </div>
            :
                <div className="minter-container">
                    <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom" style={{color: "#3ECCBB"}}>
                        Minted!
                    </h3>
                    <div className="horizontal-center">
                        <Item id={principalID} />
                    </div>
                </div>
    );
}

export default Minter;
