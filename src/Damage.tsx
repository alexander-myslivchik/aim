import React, { CSSProperties } from 'react';

interface DamageProps {
    id: string;
    damage: number;
    styles: CSSProperties;
    onAnimationEnd: (id: string) => void;
}

export const Damage: React.FC<DamageProps> = ({ id, damage, styles, onAnimationEnd }) => {
    return (
        <div
            className="damage move"
            style={styles}
            onAnimationEnd={() => onAnimationEnd(id)}
        >
            {damage}
        </div>
    );
};


