import { motion } from 'framer-motion';
import MiffyCharacter from './MiffyCharacter';

const IntroScreen = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-miffy-white">
            <MiffyCharacter variant="waving" />

            <motion.div
                className="mt-8 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h1 className="text-3xl md:text-5xl font-bold text-[#ff69b4]">
                    Hey du!
                </h1>
                <p className="text-xl md:text-2xl font-bold text-[#ff69b4]">
                    Ich habe eine Frage...
                </p>

                <motion.button
                    onClick={onNext}
                    className="px-8 py-3 mt-4 text-xl font-bold text-white bg-gray-400 rounded-full shadow-lg hover:bg-gray-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Was denn?
                </motion.button>
            </motion.div>
        </div>
    );
};

export default IntroScreen;
