import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import MiffyCharacter from './MiffyCharacter';
import cuteReveal from '../assets/cute_reveal.gif';

const RevealScreen = () => {
    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        let skew = 1;

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const frame = () => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) return;

            // Gentle Heart Rain
            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 200, // Stay alive longer
                origin: {
                    x: Math.random(),
                    // multiple sources from top
                    y: Math.random() * 0.2 - 0.2
                },
                colors: ['#ff69b4', '#ff1493', '#e05252', '#ffffff'],
                shapes: ['heart'],
                gravity: randomInRange(0.4, 0.6),
                scalar: randomInRange(1.0, 2.0),
                drift: randomInRange(-0.4, 0.4)
            });

            requestAnimationFrame(frame);
        };

        frame();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", bounce: 0.5 }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-miffy-white overflow-hidden">
            <motion.div
                className="flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. Miffy Travel - Bouncing in */}
                <motion.div variants={itemVariants}>
                    <MiffyCharacter variant="travel" className="w-48 md:w-56 h-auto mb-6 drop-shadow-md" />
                </motion.div>

                {/* 2. Text - Pop in */}
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-bold text-[#ea3026] drop-shadow-sm mb-8"
                >
                    Knew you would say yes!
                </motion.h2>

                {/* 3. Cute Reveal GIF - Smaller & Cool Reveal */}
                <motion.img
                    variants={itemVariants}
                    src={cuteReveal}
                    alt="Cute Reveal"
                    className="w-64 md:w-80 rounded-3xl shadow-2xl object-cover border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500"
                    whileHover={{ scale: 1.1, rotate: -2 }}
                />
            </motion.div>
        </div>
    );
};

export default RevealScreen;
