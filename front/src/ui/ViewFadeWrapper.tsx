import { motion } from "framer-motion";
import { ReactNode } from "react";

export const PAGE_CHANGE_ANIM = 0.4;

/**
 * Wrap every view in this to make view-transition animations work
 */
const ViewFadeWrapper = (props: { children: ReactNode | ReactNode[]; styleAbsolutely?: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0.5, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ bounce: 0, duration: PAGE_CHANGE_ANIM }}
            style={{
                height: "100%",
                ...(props.styleAbsolutely ?? true ? { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } : {}),
            }}>
            {props.children}
        </motion.div>
    );
};
export default ViewFadeWrapper;
