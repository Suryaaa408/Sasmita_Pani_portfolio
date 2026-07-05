"use client";

import { motion } from "framer-motion";
import { artist } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const sectionStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Hero() {
  return (
    <section id="home" className="bg-[#F2EBE1] pt-16">
      <motion.div
        className="mx-auto max-w-[1200px] px-6 pb-24 pt-[88px] sm:px-10"
        initial="hidden"
        animate="visible"
        variants={sectionStagger}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[60px_minmax(0,1fr)] md:gap-10 lg:gap-[60px]">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease }}
            className="border-l-[0.5px] border-[rgba(40,20,15,0.15)] pl-4 md:pl-0"
          >
            <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-[#8A7A6E] md:pl-4">
              01
            </span>
          </motion.div>

          <div>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.45, delay: 0.2, ease }}
              className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8A0F0F]"
            >
              3D Artist / Portfolio 2025
            </motion.p>

            <h1 className="mt-6">
              <motion.span
                className="block text-[28px] font-normal leading-none tracking-normal text-[#8A7A6E] sm:text-[36px]"
                variants={fadeUp}
                transition={{ duration: 0.45, delay: 0, ease }}
              >
                SEE THE WORLD IN YOUR PERSPECTIVE
              </motion.span>
              <motion.span
                className="mt-4 block text-[76px] font-medium leading-[1.06] tracking-[-0.02em] text-maroon sm:text-[112px] lg:text-[132px]"
                variants={fadeUp}
                transition={{ duration: 0.48, delay: 0.1, ease }}
              >
                SASMITA PANI
              </motion.span>
            </h1>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45, delay: 0.24, ease }}
              className="mt-10 border-b-[0.5px] border-[rgba(40,20,15,0.15)]"
            />

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,40ch)_minmax(220px,1fr)] lg:gap-[60px]"
            >
              <p className="max-w-[40ch] text-[14px] font-normal leading-7 text-[#5C4C42]">{artist.intro}</p>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8A7A6E]">Status</p>
                <p className="mt-4 flex max-w-[32ch] items-start gap-3 text-[14px] font-medium leading-6 text-[#201310]">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#8A0F0F]" aria-hidden />
                  {artist.status}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
