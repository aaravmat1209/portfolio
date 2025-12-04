import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import './Stack.css';

interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    skills: string[];
}

interface CardRotateProps {
    children: React.ReactNode;
    onSendToBack: () => void;
    sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className="card-rotate"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

interface ExperienceStackProps {
    experiences: Experience[];
    randomRotation?: boolean;
    sensitivity?: number;
    cardDimensions?: { width: number; height: number };
    sendToBackOnClick?: boolean;
    animationConfig?: { stiffness: number; damping: number };
    onOrderChange?: (cards: Array<{ id: number } & Experience>) => void;
}

export default function ExperienceStack({
    experiences,
    randomRotation = false,
    sensitivity = 150,
    cardDimensions = { width: 600, height: 400 },
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = true,
    onOrderChange
}: ExperienceStackProps) {
    const [cards, setCards] = useState(() => {
        // Map experiences with their original indices as IDs
        const cardsWithIds = experiences.map((exp, index) => ({
            id: index,
            ...exp
        }));
        // Reverse so Cloud Dev (id: 0) is at the end (visually on top)
        return cardsWithIds.reverse();
    });

    const sendToBack = (id: number) => {
        setCards(prev => {
            const newCards = [...prev];
            const index = newCards.findIndex(card => card.id === id);
            const [card] = newCards.splice(index, 1);
            newCards.unshift(card); // Add to beginning (visually at bottom)
            return newCards;
        });
    };

    // Notify parent when order changes
    useEffect(() => {
        if (onOrderChange) {
            onOrderChange(cards);
        }
    }, [cards, onOrderChange]);

    return (
        <div
            className="stack-container"
            style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                perspective: 1000
            }}
        >
            {cards.map((card, index) => {
                const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

                return (
                    <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
                        <motion.div
                            className="experience-card-stack"
                            onClick={() => sendToBackOnClick && sendToBack(card.id)}
                            animate={{
                                rotateZ: (cards.length - index - 1) * 3 + randomRotate,
                                scale: 1 + index * 0.04 - cards.length * 0.04,
                                transformOrigin: '50% 100%'
                            }}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping
                            }}
                            style={{
                                width: cardDimensions.width,
                                height: cardDimensions.height,
                                background: 'linear-gradient(135deg, rgba(31, 40, 51, 0.95) 0%, rgba(11, 12, 16, 0.95) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid #1F2833',
                                borderRadius: '24px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 10px 40px rgba(102, 252, 241, 0.15)',
                                cursor: 'grab'
                            }}
                        >
                            <div>
                                <div className="flex flex-wrap justify-between items-start mb-3">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#66FCF1]">
                                        {card.role}
                                    </h3>
                                    <span className="text-sm text-[#66FCF1] bg-[#0B0C10] px-4 py-2 rounded-lg font-medium border border-[#66FCF1]/30">
                                        {card.period}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mb-4 text-[#C5C6C7]">
                                    <span className="font-semibold text-xl">{card.company}</span>
                                    <span>•</span>
                                    <span className="text-base opacity-70">{card.location}</span>
                                </div>
                                <p className="text-[#C5C6C7] mb-4 leading-relaxed text-base">
                                    {card.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {card.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-[#0B0C10] text-[#66FCF1] px-3 py-2 rounded-lg text-sm font-medium
                    border border-[#66FCF1]/30 hover:bg-[#66FCF1] hover:text-[#0B0C10] 
                    transition-all duration-300 cursor-default pointer-events-none"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </CardRotate>
                );
            })}
        </div>
    );
}
