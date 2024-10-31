"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./slider.module.scss";

interface SliderProps {
    initialValue: number;
    maxThumbValue: number;
}

export function Slider({ initialValue, maxThumbValue }: SliderProps) {
    const [value, setValue] = useState(initialValue);

    const min = 0.0;
    const max = 1.0;

    const rangeRef = useRef<HTMLInputElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState("0px");

    const getConditionText = (value: number) => {
        if (value <= 0.06) return "FN";
        if (value <= 0.14) return "MW";
        if (value <= 0.37) return "FT";
        if (value <= 0.44) return "WW";
        return "BS";
    };

    const [conditionText, setConditionText] = useState(
        getConditionText(initialValue),
    );

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(
            Math.max(parseFloat(e.target.value), initialValue),
            maxThumbValue,
        );
        setValue(newValue);
        updateTooltipPosition(newValue);
        setConditionText(getConditionText(newValue));
    };

    const updateTooltipPosition = (value: number) => {
        if (rangeRef.current) {
            const rangeWidth = rangeRef.current.offsetWidth;
            const thumbWidth = 15;
            const percentage = (value - min) / (max - min);
            const newPosition =
                percentage * (rangeWidth - thumbWidth) + thumbWidth / 2;
            setTooltipPosition(`${newPosition}px`);
        }
    };

    useEffect(() => {
        updateTooltipPosition(value);
    }, [value]);

    const getColorStyle = () => {
        const colorRanges = [
            { color: "bg-green-500", end: 0.07 },
            { color: "bg-lime-500", end: 0.15 },
            { color: "bg-yellow-500", end: 0.38 },
            { color: "bg-orange-500", end: 0.45 },
            { color: "bg-red-500", end: 1.0 },
        ];

        let accumulatedWidth = 0;
        const colorStyles: React.ReactNode[] = [];

        colorRanges.forEach(({ color, end }) => {
            const start = Math.max(accumulatedWidth, initialValue);
            const width = Math.min(end, maxThumbValue) - start;
            accumulatedWidth = end;

            if (width > 0) {
                // Verifica se `initialValue` está neste intervalo para `rounded-l`
                const isStart =
                    initialValue >= accumulatedWidth - width &&
                    initialValue <= end;

                // Verifica se `maxThumbValue` está neste intervalo para `rounded-r`
                const isEnd = maxThumbValue > start && maxThumbValue <= end;

                colorStyles.push(
                    <div
                        key={color}
                        className={`absolute top-0 bottom-0 ${color} ${
                            isStart ? "rounded-l" : ""
                        } ${isEnd ? "rounded-r" : ""}`}
                        style={{
                            width: `${(width / max) * 100}%`,
                            left: `${(start / max) * 100}%`,
                        }}
                    />,
                );
            }
        });

        return colorStyles;
    };

    return (
        <div
            id="inspect-float-range-wrapper"
            className="relative left-0 bottom-0 right-0 px-8 py-3"
        >
            <div className="flex items-center relative h-5">
                <div className="absolute inset-0 z-10">
                    <div
                        id="inspect-float-range-tooltip"
                        className={styles["custom-range-tooltip"]}
                        style={{
                            left: tooltipPosition,
                            transform: "translateX(-50%)",
                        }}
                    >
                        <span>
                            {conditionText} ({value.toFixed(2)})
                        </span>
                    </div>
                    <input
                        ref={rangeRef}
                        id="inspect-float-range"
                        className={styles["custom-range"]}
                        style={{ width: "100%", marginLeft: "0%" }}
                        type="range"
                        min={min.toString()}
                        max={max.toString()}
                        value={value}
                        step="0.01"
                        autoComplete="off"
                        aria-label="Wear Value"
                        onInput={handleInput}
                    />
                </div>
                <div className="w-full relative h-2 z-0">
                    <div
                        className="absolute top-0 bottom-0 bg-black-200 rounded"
                        style={{ width: "100%", zIndex: 0 }}
                    ></div>
                    <div
                        className="absolute top-0 bottom-0 bg-black-200 rounded"
                        style={{ width: `${(value / max) * 100}%`, left: "0" }}
                    ></div>
                    {getColorStyle()}
                </div>
            </div>
        </div>
    );
}
