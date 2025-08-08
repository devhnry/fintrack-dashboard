import React from "react";

const skeletonPulse = "animate-pulse bg-brand-500-light rounded";

const TransactionTableSkeleton = () => {
    const columnWidths = [
        "max-w-[555px] lg:max-w-full w-full min-w-[150px]", // Date
        "max-w-[122px] w-full min-w-[122px] 2xl:max-w-[150px]", // Remark
        "max-w-[73px] w-full min-w-[73px] 2xl:max-w-[100px]", // Amount
        "max-w-[80px] w-full min-w-[80px]", // Currency
        "max-w-[74px] w-full min-w-[74px]", // Type
    ];

    const skeletonRows = 5;

    return (
        <div className="w-full">
            {/* MOBILE dropdown + cards skeleton */}
            <div className="sm:hidden space-y-2">
                <div className={`${skeletonPulse} h-8 rounded w-full`} />

                <div className="space-y-4 mt-4">
                    {[...Array(skeletonRows)].map((_, idx) => (
                        <div
                            key={idx}
                            className={`border border-gray-300 dark:border-gray-700 rounded p-4 ${skeletonPulse}`}
                            style={{ height: "80px" }}
                        />
                    ))}
                </div>
            </div>

            {/* DESKTOP table skeleton */}
            <div className="overflow-x-scroll scrollbar-hide hidden sm:block mt-[28px]">
                {/* Header row */}
                <div className="w-full flex-shrink-0">
                    <div className="flex items-center gap-[18px] mb-4">
                        {columnWidths.map((width, idx) => (
                            <div
                                key={idx}
                                className={`${width} h-[28px] ${skeletonPulse} rounded`}
                            />
                        ))}
                    </div>
                </div>

                {/* Data rows */}
                <div>
                    {[...Array(skeletonRows)].map((_, rowIdx) => (
                        <div
                            key={rowIdx}
                            className="flex items-center flex-shrink-0 gap-[18px] mb-3"
                        >
                            {columnWidths.slice(0, 4).map((width, colIdx) => (
                                <div
                                    key={colIdx}
                                    className={`${width} h-[56px] ${skeletonPulse} rounded`}
                                />
                            ))}

                            <div
                                className={`${columnWidths[4]} h-[40px]  ${skeletonPulse} rounded-[16px]`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionTableSkeleton;
