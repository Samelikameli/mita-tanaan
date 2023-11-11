import { motion } from "framer-motion";
import { ReactNode } from "react";

export const PAGE_CHANGE_ANIM = 0.4;

/**
 * Wrap every view in this to make view-transition animations work
 */
const ViewFadeWrapper = (props: { children: ReactNode | ReactNode[]; styleAbsolutely?: boolean; useSliding?: boolean }) => {
    return (
        <motion.div
            initial={props.useSliding ?? true ? { opacity: 0.5, x: "100%" } : { opacity: 0 }}
            animate={props.useSliding ?? true ? { opacity: 1, x: 0 } : { opacity: 1 }}
            exit={props.useSliding ?? true ? { opacity: 0, x: 0 } : { opacity: 0 }}
            transition={{ bounce: 0, duration: PAGE_CHANGE_ANIM }}
            style={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
                ...(props.styleAbsolutely ?? true ? { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } : {}),
            }}>
            {props.children}
        </motion.div>
    );
};
export default ViewFadeWrapper;
