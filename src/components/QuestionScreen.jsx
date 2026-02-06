import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import happyCat from '../assets/happy_cat.gif';
import funnyCat from '../assets/funny_cat.jpg';
import cuteReveal from '../assets/cute_reveal.gif';

// Import cat pics manually
import cat1 from '../catpics/200.gif';
import cat2 from '../catpics/300px-Crying_Cat_screaming.jpg';
import cat3 from '../catpics/7ca9b6b96c89bb682002b3e33cb47224.jpg';
import cat4 from '../catpics/c4cd5be4867dd85f4019d425e0f0f05b.jpg';
import cat5 from '../catpics/download (1).jpeg';
import cat6 from '../catpics/download.jpeg';
import cat7 from '../catpics/images.jpeg';

const catImages = [cat1, cat2, cat3, cat4, cat5, cat6, cat7];

const QuestionScreen = ({ onYes }) => {
    const [yesScale, setYesScale] = useState(1);
    const [yesTextScale, setYesTextScale] = useState(1);
    const [visibleCats, setVisibleCats] = useState([]);
    const [showHappyCat, setShowHappyCat] = useState(false);
    const [showFunnyCatHover, setShowFunnyCatHover] = useState(false);

    const contentRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const hoverActiveRef = useRef(false);

    const noPhrases = [
        "No",
        "Are you sure?",
        "Really?",
        "Think again!",
        "Last chance!",
        "Pookie please...",
        "Don't do this to me!",
        "I'm gonna cry...",
        "You're breaking my heart ;(",
        "Have a heart!",
        "Pretty please?",
        "Don't be cold...",
        "Change of heart?",
        "Wouldn't you reconsider?",
        "Is that your final answer?",
        "You're making a mistake!",
        "Pookie...",
        "Don't be like that!",
        "Give it a chance!"
    ];

    // Use Ref for sequential index to avoid state lag
    const nextCatIndexRef = useRef(0);

    // Bounds detection logic
    const handleNoClick = () => {
        setYesScale(prev => prev + 0.5);
        setYesTextScale(prev => prev + 0.1);

        // Sequential cat selection
        const catIndex = nextCatIndexRef.current % catImages.length;
        nextCatIndexRef.current += 1;
        const newCat = catImages[catIndex];

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Fixed Scale and Radius for simplified logic
        const scale = 0.5 + Math.random() * 0.4; // 0.5 to 0.9
        const baseSizeHalf = 96;
        const catRadius = baseSizeHalf * scale; // Radius of the cat image

        // 1. SAFE ZONE: Strict padding from screen edges
        // 50px visual whitespace + cat radius ensures it's fully on screen
        const edgePadding = 50 + catRadius;

        // 2. EXCLUSION ZONE: Fixed box in center (Static)
        // Enlarged to 500x500 to cover Panda + Text + Buttons fully
        const exclusionW = 500;
        const exclusionH = 500;
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;

        const excludeLeft = centerX - exclusionW / 2;
        const excludeRight = centerX + exclusionW / 2;
        const excludeTop = centerY - exclusionH / 2;
        const excludeBottom = centerY + exclusionH / 2;

        let bestX = null;
        let bestY = null;
        let foundSpot = false;

        for (let i = 0; i < 50; i++) {
            // Pick random point in Safe Zone
            const randX = Math.random() * (viewportWidth - 2 * edgePadding) + edgePadding;
            const randY = Math.random() * (viewportHeight - 2 * edgePadding) + edgePadding;

            // Check if inside Exclusion Zone
            // We use the point itself (center of cat)
            // If the center of the cat forces it into the exclusion zone, we reject?
            // Let's just say if the center is inside the box, Reject.
            // Also add a little padding to exclusion box so they don't touch text
            const textPadding = 40;

            const insideExclusion = (
                randX > excludeLeft - textPadding &&
                randX < excludeRight + textPadding &&
                randY > excludeTop - textPadding &&
                randY < excludeBottom + textPadding
            );

            if (!insideExclusion) {
                // Valid spot!
                bestX = (randX / viewportWidth) * 100;
                bestY = (randY / viewportHeight) * 100;
                foundSpot = true;
                break;
            }
        }

        // Fallback: Use Top-Left corner (safe area) if loop somehow fails
        if (!foundSpot) {
            bestX = 15; // Percent
            bestY = 15; // Percent
        }

        const randomRot = (Math.random() - 0.5) * 45;

        setVisibleCats(prev => [
            ...prev,
            {
                id: Date.now(),
                src: newCat,
                x: bestX,
                y: bestY,
                rotation: randomRot,
                scale: scale
            }
        ]);
    };

    const handleNeinHover = () => {
        // If currently showing or timer running, don't restart? 
        if (hoverActiveRef.current) return;

        hoverActiveRef.current = true;
        setShowFunnyCatHover(true);

        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

        // Strict 1s timer
        hoverTimeoutRef.current = setTimeout(() => {
            setShowFunnyCatHover(false);
        }, 1000);
    };

    const handleNeinLeave = () => {
        // On leave, we just reset the 'active' guard so it can be re-triggered.
        // We do NOT clear the timer or hide the popup.
        hoverActiveRef.current = false;
    };

    const getNoText = () => {
        return noPhrases[Math.min(visibleCats.length, noPhrases.length - 1)];
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-miffy-white overflow-hidden relative w-full h-full">
            {/* Funny Cat Hover Overlay - z-100 to be top layer */}
            <AnimatePresence>
                {showFunnyCatHover && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/60 backdrop-blur-sm"
                    >
                        <img
                            src={funnyCat}
                            alt="Funny Cat"
                            className="max-w-[90%] max-h-[80vh] object-contain rounded-xl shadow-2xl rotate-3"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chaos Layer (Cats) - Background z-0 */}
            {visibleCats.map(cat => (
                <motion.img
                    key={cat.id}
                    src={cat.src}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: cat.scale || 1 }}
                    className="absolute w-32 md:w-48 max-w-[200px] max-h-[200px] object-contain rounded-lg shadow-lg z-[60] pointer-events-none transition-all duration-500"
                    style={{
                        left: `${cat.x}%`,
                        top: `${cat.y}%`,
                        transform: `translate(-50%, -50%) rotate(${cat.rotation}deg) scale(${cat.scale || 1})`
                    }}
                />
            ))}

            {/* Main Content container - z-50 to be above cats but below popup */}
            <motion.div
                ref={contentRef}
                className="z-50 p-8 relative"
                layout
            >
                {/* Persistent Cute GIF */}
                <div className="relative inline-block mb-4">
                    <img
                        src={cuteReveal}
                        alt="Please say yes"
                        className="w-48 h-auto mx-auto relative z-10 rounded-lg shadow-sm"
                    />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-[#ff69b4] mb-8 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm inline-block">
                    Do you wanna be my Valentine?
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-8 relative">
                    <div className="relative flex flex-col items-center">
                        <AnimatePresence>
                            {showHappyCat && (
                                <motion.img
                                    key="happy-cat"
                                    src={happyCat}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute bottom-full mb-4 w-48 h-auto z-[60] pointer-events-none drop-shadow-lg"
                                    alt="Happy Cat"
                                />
                            )}
                        </AnimatePresence>
                        <motion.button
                            onClick={onYes}
                            onMouseEnter={() => setShowHappyCat(true)}
                            onMouseLeave={() => setShowHappyCat(false)}
                            className="font-bold text-white bg-[#ff69b4] rounded-full shadow-xl z-20 transition-all duration-300 transform-gpu"
                            style={{
                                width: `${150 * yesScale}px`,
                                height: `${60 * yesScale}px`,
                                fontSize: `${1.5 * yesTextScale}rem`
                            }}
                            whileHover={{ backgroundColor: '#ff1493', scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            YES!
                        </motion.button>
                    </div>

                    <motion.button
                        onClick={handleNoClick}
                        onMouseEnter={handleNeinHover}
                        onMouseLeave={handleNeinLeave}
                        className="px-8 py-3 text-xl font-bold text-white border-2 border-white/50 rounded-full bg-gray-400 z-20 hover:bg-gray-500 transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {getNoText()}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default QuestionScreen;
