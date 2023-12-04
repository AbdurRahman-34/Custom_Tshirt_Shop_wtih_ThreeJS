import { motion, AnimatePresence } from "framer-motion";
import {useSnapshot } from 'valtio';
import state from '../store'
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from "../config/motion"
import { CustomButton } from "../components";


const Home = () => {
    const snap = useSnapshot(state)
    return (
        <div>
           <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...slideAnimation('left')}>
                    <motion.header {...slideAnimation("down")}>
                        <img src="./logo.png" alt="logo" className="w-28 h-28 object-contain"/>
                    </motion.header>

                <motion.div className="home-content" {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className="head-text text-7xl font-bold leading-tight">
                            MODERN <br className="xl:block hidden"/>T SHIRT SHOP.
                        </h1>
                    </motion.div>
                    <motion.div
                    {...headContentAnimation}
                    className = "flex flex-col gap-5"
                    >
                        <p className="max-w-md font-normal text-gray-600 text-base">
                        create your uniqe and exclusive shirt with our brand-new 3D
                        customization tool. <strong> Unleash your imagination</strong>{" "}
                        and define your own style.
                        </p>
                        <CustomButton
                          type="filled"
                          title = "Customize It"
                          handelClick = {() => state.intro = false}
                          customStyles ="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                </motion.div>

                </motion.section>
            )}
           </AnimatePresence>
        </div>
    );
};

export default Home;