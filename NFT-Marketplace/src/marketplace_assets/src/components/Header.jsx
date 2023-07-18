import React, { useState, useEffect } from "react";
import {Route, Link, Routes, BrowserRouter} from "react-router-dom";
import logo from "../../assets/logo.png";
import Minter from "./Minter";
import Gallery from "./Gallery";
import homeImage from "../../assets/home-img.png";
import { marketplace } from "../../../declarations/marketplace";
import CURRENT_USER_ID from "../index";

// Functional component to represent the dynamic header element (displayed at the top of each page)
function Header() {

    const USER_GALLERY_TITLE = "Your NFT Collection";
    const DISCOVER_GALLERY_TITLE = "Discover Trending NFTs on the fastest-growing marketplace";

    // Keeping track of the user's current NFT collection
    const [userGallery, setUserGallery] = useState();
    const [listingGallery, setListingGallery] = useState();

    // Retrieving the NFT collection associated to the current user
    // Note: for testing purposes (local development), the current user is always the default local principal identifier (2vxsx-fae)
    async function retrieveCollection() {
        const collection = await marketplace.getCollection(CURRENT_USER_ID);
        const activeListings = await marketplace.getActiveListings();
        setUserGallery(<Gallery ids={collection} title={USER_GALLERY_TITLE} role="collection" />); // Updating the user's private frontend gallery
        setListingGallery(<Gallery ids={activeListings} title={DISCOVER_GALLERY_TITLE} role="discover" />); // Updating the publicly available NFTs on the marketplace
    }

    // Initiate a retrieval when the Header component is first mounted to the page
    useEffect(() => {
        retrieveCollection();
    }, []);

    return (
        <BrowserRouter>
          {/* Styling and structure of the header component (including functional page links) */}
          <div className="app-root-1">
            <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
              <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
                <div className="header-left-4"></div>
                  <Link to="/" reloadDocument>
                      <img className="header-logo-11" src={logo}/>
                  </Link>
                <div className="header-vertical-9"></div>
                  <Link to="/" reloadDocument>
                      <h5 className="Typography-root header-logo-text">NFT Marketplace</h5>
                  </Link>
                <div className="header-empty-6"></div>
                <div className="header-space-8"></div>
                <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                    <Link to="/discover" reloadDocument>
                        Discover
                    </Link>
                </button>
                <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                    <Link to="/minter" reloadDocument>
                        Minter
                    </Link>
                </button>
                <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                    <Link to="/collection" reloadDocument>
                        Collection
                    </Link>
                </button>
              </div>
            </header>
          </div>

          {/* Defining relative browser routes (each route representing a distinct section, and containing a unique component) */}
          <Routes>
              {/* Homepage (welcome banner) */}
              <Route
                  exact path="/"
                  element={<img alt="Home page welcome banner displaying the title 'Crypto Dunks', and a sample of six different Crypto Dunk NFTs." className="bottom-space" src={homeImage} />}
              />
              {/* Discover new NFTs currently available on the marketplace platform */}
              <Route
                  exact path="/discover"
                  element={listingGallery}
              />
              {/* Contains the form to mint new NFTs on the Internet Computer blockchain */}
              <Route
                  exact path="/minter"
                  element={<Minter />}
              />
              {/* Contains the current user's NFT collection (all of their currently owned NFTs */}
              <Route
                  exact path="/collection"
                  element={userGallery}
              />
          </Routes>
        </BrowserRouter>
    );
}

export default Header;
