import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wrap every view in this to make view-transition animations work
 */
const ViewFadeWrapper = (props: { children: ReactNode | ReactNode[] }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: "100%" }}>
            {props.children}
        </motion.div>
    );
};
export default ViewFadeWrapper;
