import { motion } from 'framer-motion';
import miffyWaving from '../assets/miffy_waving.png';
import miffyTravel from '../assets/miffy_travel.png';

const variants = {
    waving: miffyWaving,
    travel: miffyTravel,
};

const MiffyCharacter = ({ variant = 'waving', className = '' }) => {
    return (
        <motion.img
            src={variants[variant]}
            alt={`Miffy ${variant}`}
            className={`max-w-[200px] md:max-w-[300px] h-auto object-contain ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
        />
    );
};

export default MiffyCharacter;
