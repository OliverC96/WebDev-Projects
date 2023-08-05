import react from "react";
import { InfinitySpin } from "react-loader-spinner";

// A simple loader component
export default function Loader(props) {
    return (
        <div className="flex flex-col justify-center items-center bg-wrapper h-screen">
            <InfinitySpin width="200" color="#edf6f9" />
            <h1 className="text-2xl text-primary"> {props.message} </h1>
        </div>
    )
}