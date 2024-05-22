import React, {CSSProperties, useState} from 'react';
import {Damage} from './Damage';
import {v4} from 'uuid';
import {Cube} from "./Cube.tsx";

interface DamageData {
    id: string;
    styles: CSSProperties;
    damage: number;
}

const DAMAGE_SIZE_INIT = 50;
const DAMAGE_SIZE_FINAL = 20;
const CIRCLE_RADIUS_SMALL = 100;
const CIRCLE_RADIUS_BIG = 200;

const getRandomDamage = (): number => Math.floor(Math.random() * 101);
const getRandomAngle = (): number => Math.floor(Math.random() * 361);

const generateInitPosition = () => {
    const angle = getRandomAngle();
    const radians = angle * (Math.PI / 180);
    const distance = CIRCLE_RADIUS_SMALL * Math.random() - DAMAGE_SIZE_INIT;
    const deltaY = Math.sin(radians);
    const deltaX = Math.cos(radians);
    return {
        angle,
        deltaY,
        deltaX,
        coordinates: {
            top: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_INIT / 2) + distance * deltaY,
            left: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_INIT / 2) + distance * deltaX,
        }
    };
};

const generateFinalPosition = (deltaX: number, deltaY: number) => {
    const distance = CIRCLE_RADIUS_SMALL + (Math.random() * ((CIRCLE_RADIUS_BIG - CIRCLE_RADIUS_SMALL) - DAMAGE_SIZE_FINAL))

    return {
        top: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_FINAL / 2) + distance * deltaY,
        left: CIRCLE_RADIUS_BIG - (DAMAGE_SIZE_FINAL / 2) + distance * deltaX,
    };
};
export const Aim: React.FC = () => {
    const [damages, setDamages] = useState<DamageData[]>([]);

    const handleClick = () => {
        const randomDamage = getRandomDamage();
        const initialPosition = generateInitPosition();
        const start = initialPosition.coordinates;
        const end = generateFinalPosition(initialPosition.deltaX, initialPosition.deltaY);

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
