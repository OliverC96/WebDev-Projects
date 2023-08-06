import React from "react";
import Skeleton from "@mui/material/Skeleton";

// Represents a loading skeleton structure for a singular weather sector in the current weather section
export default function SectorSkeleton(props) {

    return (
        <div className="bg-secondary p-6 rounded-md flex flex-col gap-6">
            {/* First row skeleton structure */}
            <div className="flex justify-between">
                <div className="flex">
                    <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="circular" width={37} height={37} />
                    <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="text" width={150} height={37} className="ml-3"/>
                </div>
                {(props.type === "Visibility" || props.type === "Temperature") &&
                    <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="text" width={80} height={37} />
                }
                {props.type === "Wind" &&
                    <div className="flex">
                        <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="text" width={75} height={37} className="mr-2" />
                        <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="circular" width={37} height={37} />
                    </div>
                }
            </div>
            {/* Second row skeleton structure */}
            <div className="flex relative">
                <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="rounded" width={55} height={40} />
                <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="text" width={35} height={35} className="ml-2 absolute left-14 bottom-3" />
            </div>
            {/* Third row skeleton structure */}
            <Skeleton sx={{ bgcolor: '#edf6f9' }} variant="rounded" height={35} className="w-full" />
        </div>
    );

}