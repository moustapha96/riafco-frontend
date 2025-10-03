import { useState } from 'react';

import {  seoServices } from '../../data/dataFour';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';




const ServiceSection = () => {
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
        <section className="relative md:pb-24 pb-16">
           

            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h6 className="text-[var(--riafco-orange)]  text-sm font-bold uppercase mb-2">Services</h6>
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold bg-gradient-to-r from-red-600 to-[var(--riafco-blue)] text-transparent bg-clip-text">We are SEO Professionals</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Your content is an integral part of your SEO efforts and online marketing strategy</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-[30px]">
                    {seoServices.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <div key={index} className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl mt-6">
                                <div className="size-20 bg-[var(--riafco-blue)]/5 text-[var(--riafco-orange)]  rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800">
                                    <Icon />
                                </div>

                                <div className="content mt-7">
                                    <Link to="/page-services" className="title h5 text-lg font-medium hover:text-[var(--riafco-orange)] ">{item.title}</Link>
                                    <p className="text-slate-400 mt-3">{item.desc}</p>

                                    <div className="mt-5">
                                        <Link to="/page-services" className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-[var(--riafco-orange)]  hover:text-[var(--riafco-orange)]  after:bg-[var(--riafco-blue)] duration-500">Read More <FaArrowRight className="ms-2 text-[10px]" /></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default ServiceSection;
