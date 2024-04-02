import React, { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="animate-spin border-t-[4px] border-white rounded-full w-[100px] h-[100px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    ></motion.div>
  );
};

export default Loader;
