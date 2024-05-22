import React from "react";

interface Props {
    handleClick: () => void
}

export const Cube: React.FC<Props> = ({handleClick}) => {
    return (
        <div className="cube" onClick={handleClick}>
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
        </div>
    );
};

