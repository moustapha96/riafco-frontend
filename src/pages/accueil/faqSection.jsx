

import * as Icon from 'react-feather';

import { accordionData } from '../../data/dataTwo';
import { useState } from 'react';


const FaqSection = () => {
     let [isOpen, setOpen] = useState(false)
        let [activeIndex, setActiveIndex] = useState(0);
    
        let toggleAccordion = (index) => {
            if (activeIndex === index) {
                setActiveIndex(0);
            } else {
                setActiveIndex(index);
            }
    }
    

    return (
        <section className="relative md:py-24 py-16 overflow-hidden">
             <div className="container relative md:mt-24 mt-16">
                               <div className="grid grid-cols-1 pb-8 text-center">
                                   <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Frequently Asked Questions</h3>
           
                                   <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.</p>
                               </div>
           
                               <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-8 gap-[30px]">
                                   <div className="md:col-span-6">
                                       <div className="relative">
                                           <div className="relative rounded-xl overflow-hidden shadow-md dark:shadow-gray-800">
                                               <div className="w-full py-72 bg-slate-400 bg-[url('../../assets/images/saas/cta.jpg')] bg-no-repeat bg-top bg-cover jarallax" data-jarallax data-speed="0.5"></div>
                                           </div>
                                       </div>
                                   </div>
           
                                   <div className="md:col-span-6">
                                       <div id="accordion-collapse">
                                           {accordionData.slice(0,5).map((item, index) => (
                                               <div key={index} className="relative shadow-sm dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                                   <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
                                                       <button type="button" onClick={() => toggleAccordion(index)} className={`flex justify-between items-center p-5 w-full font-medium text-start ${activeIndex === index ? 'bg-gray-50 dark:bg-slate-800 text-indigo-600' : ''}`} data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                                           <span>{item.title}</span>
                                                           <svg data-accordion-icon className={`${activeIndex === index ? "rotate-180" : "rotate-270" } size-4 shrink-01`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                           </svg>
                                                       </button>
                                                   </h2>
                                                   {activeIndex === index && (
                                                       <div>
                                                           <div className="p-5">
                                                               <p className="text-slate-400 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                                           </div>
                                                       </div>
                                                   )}
                                               </div>
           
                                           ))}
                                       </div>
                                   </div>
                               </div>
                           </div>
        </section>
    );
}

export default FaqSection;
