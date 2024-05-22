import React, {CSSProperties, useState} from 'react';
import {Damage} from './Damage';
import {v4} from 'uuid';
import {Cube} from "./Cube.tsx";

interface DamageData {
    id: string;
    styles: CSSProperties;
    damage: number;
}

const ANGLE_START = 185;
const ANGLE_END = 270;
const DAMAGE_SIZE_INIT = 50;
const DAMAGE_SIZE_FINAL = 20;
const CIRCLE_RADIUS_SMALL = 100;
const CIRCLE_RADIUS_BIG = 200;

const getRandomDamage = (): number => Math.floor(Math.random() * 101);
const getRandomAngle = (): number => Math.floor(Math.random() * 361);

const shouldApplyOffset = (angle: number, angleStart: number, angleEnd: number) => angle >= angleStart && angle < angleEnd

const generateInitPosition = (radius: number, offset: number = 0) => {
    const angle = getRandomAngle();
    const radians = angle * (Math.PI / 180);
    const distance = shouldApplyOffset(angle, ANGLE_START, ANGLE_END) ? radius * Math.random() : radius * Math.random() - offset;
    const deltaY = Math.sin(radians);
    const deltaX = Math.cos(radians);
    return {
        angle,
        deltaY,
        deltaX,
        coordinates: {
            top: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_INIT /2) + distance * deltaY,
            left: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_INIT /2) + distance * deltaX,
        }
    };
};

const generateFinalPosition = (smallCircleRadius: number, bigCircleRadius: number, deltaX: number, deltaY: number) => {
    const distance = smallCircleRadius + (Math.random() * ((bigCircleRadius - smallCircleRadius) - DAMAGE_SIZE_FINAL))

    return {
        top: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_FINAL / 2) + distance * deltaY,
        left: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_FINAL / 2) + distance * deltaX,
    };
};
export const Aim: React.FC = () => {
    const [damages, setDamages] = useState<DamageData[]>([]);

    const handleClick = () => {
        const randomDamage = getRandomDamage();
        const initialPosition = generateInitPosition(CIRCLE_RADIUS_SMALL, DAMAGE_SIZE_INIT);
        const start = initialPosition.coordinates;
        const end = generateFinalPosition(CIRCLE_RADIUS_SMALL, CIRCLE_RADIUS_BIG,  initialPosition.deltaX, initialPosition.deltaY);

        setDamages(prevState => [
            ...prevState,
            {
                id: v4(),
                styles: {
                    '--start-top': `${start.top}px`,
                    '--start-left': `${start.left}px`,
                    '--end-top': `${end.top}px`,
                    '--end-left': `${end.left}px`,
                } as CSSProperties,
                damage: randomDamage,
            }
        ]);
    };

    const handleAnimationEnd = (id: string) => {
        setDamages(prevState => prevState.filter(damage => damage.id !== id));
    };

    return (
        <div className="container">
            <div className="circle big-circle">
                <div className="circle small-circle"></div>
                {damages.map(({id, damage, styles}) => (
                    <Damage
                        key={id}
                        id={id}
                        damage={damage}
                        styles={styles}
                        onAnimationEnd={handleAnimationEnd}
                    />
                ))}
            </div>
            <Cube handleClick={handleClick}/>
        </div>
    );
};
