'use client'

import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { BorderBeam } from '../../components/ui/border-beam'
import TextShimmer from '../../components/ui/text-shimmer'
import { FlipWords } from '../ui/flip-words'

export default function HeroSection() {
   const ref = useRef(null)
   const inView = useInView(ref, { once: true, margin: '-100px' })
   return (
      <section
         id="hero"
         className="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8"
      >
         <div className="backdrop-filter-[12px] animate-fade-in group inline-flex h-7 -translate-y-4 items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black">
            <TextShimmer className="inline-flex items-center justify-center">
               <span>✨ Introducing Co-Founder AI</span>
               {' '}
               <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </TextShimmer>
         </div>
       
         <p className="text-sm font-normal tracking-widest uppercase mt-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                The only Marketing Tool your business needs.
              </span>
            </p>
            <h1 className="mt-8 text-3xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Your AI Powered Emails <br />
              <FlipWords
                words={[
                  "That Sells.",
                  "That works.",
                  "That Converts.",
                ]}
              />
            </h1>

            <div className="flex flex-col items-center justify-center px-8 mt-12 space-y-5 sm:space-y-0 sm:px-0 sm:space-x-5 sm:flex-row">
              <div className="relative inline-flex items-center justify-center w-full sm:w-auto group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <a
                  href="/dashboard/ai-mailer"
                  title=""
                  className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full sm:w-auto"
                  role="button"
                >
                  {" "}
                  Start 14 Days Free Trial{" "}
                </a>
              </div>

              <a
                href="mailto:aryan1372.be22@chitkara.edu.in"
                title=""
                className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white transition-all duration-200 bg-black border border-gray-600 rounded-full sm:w-auto hover:border-white"
                role="button"
              >
                {" "}
                Talk to our team{" "}
              </a>
            </div>
         <div
            ref={ref}
            className="animate-fade-up relative mt-32 opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
         >
            <div
               className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] ${inView ? 'before:animate-image-glow' : ''
                  }`}
            >
               <BorderBeam
                  size={200}
                  duration={12}
                  delay={11}
                  colorFrom="var(--color-one)"
                  colorTo="var(--color-two)"
               />

               <img
                  src="/hero-dark.png"
                  alt="Hero Image"
                  className="relative hidden size-full rounded-[inherit] border object-contain dark:block"
               />
               <img
                  src="/hero-light.png"
                  alt="Hero Image"
                  className="relative block size-full rounded-[inherit]  border object-contain dark:hidden"
               />
            </div>
         </div>
      </section>
   )
}
