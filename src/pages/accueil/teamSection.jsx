import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import ab1 from '../../assets/images/law/ab1.jpg';
import ab2 from '../../assets/images/law/ab2.jpg';


import TinySlider from 'tiny-slider-react';

import { lowServices } from '../../data/dataFour';
import { LiaAwardSolid, LiaMoneyBillAltSolid, LiaUniversitySolid } from 'react-icons/lia';
import { BsCheckCircle } from 'react-icons/bs';
import { FaRegEnvelope } from 'react-icons/fa';


export default function TeamSection() {
    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark')
    });

    let settings2 = {
        container: '.tiny-six-item',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            1025: {
                items: 6
            },
    
            992: {
                items: 4
            },
    
            767: {
                items: 3
            },
    
            320: {
                items: 1
            },
        },
    }
    let [isOpen, setOpen] = useState(false)

    return (
        <>
          
            
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800 overflow-hidden">
                <div className="container relative">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        <div className="group relative p-6 hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)] transition-all duration-500 ease-in-out bg-white dark:bg-slate-900 overflow-hidden text-center">
                            <div className="size-20 bg-[var(--riafco-blue)] group-hover:bg-white text-white group-hover:text-[var(--riafco-orange)]  rounded-full text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 dark:group-hover:shadow-gray-700 mx-auto">
                                <LiaUniversitySolid className="size-7"/>
                            </div>

                            <div className="mt-6">
                                <Link to="#" className="text-lg font-medium group-hover:text-white transition-all duration-500 ease-in-out">Professional Court Service</Link>
                                <p className="text-slate-400 group-hover:text-white/75 transition-all duration-500 ease-in-out mt-3">Competently leverage existing enterprise wide niches through stand alone services. Quickly productize technically.</p>
                            </div>
                        </div>

                        <div className="group relative p-6 bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)] transition-all duration-500 ease-in-out overflow-hidden text-center">
                            <div className="size-20 bg-white text-[var(--riafco-orange)]  rounded-full text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-600 mx-auto">
                                <LiaMoneyBillAltSolid className="size-7"/>
                            </div>

                            <div className="mt-6">
                                <Link to="#" className="text-lg font-medium text-white transition-all duration-500 ease-in-out">Competitive Pricing</Link>
                                <p className="text-white/75 transition-all duration-500 ease-in-out mt-3">Competently leverage existing enterprise wide niches through stand alone services. Quickly productize technically.</p>
                            </div>
                        </div>

                        <div className="group relative p-6 hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)] transition-all duration-500 ease-in-out bg-white dark:bg-slate-900 overflow-hidden text-center">
                            <div className="size-20 bg-[var(--riafco-blue)] group-hover:bg-white text-white group-hover:text-[var(--riafco-orange)]  rounded-full text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 dark:group-hover:shadow-gray-700 mx-auto">
                                <LiaAwardSolid className="size-7"/>
                            </div>

                            <div className="mt-6">
                                <Link to="#" className="text-lg font-medium group-hover:text-white transition-all duration-500 ease-in-out">Top Expart Attorney</Link>
                                <p className="text-slate-400 group-hover:text-white/75 transition-all duration-500 ease-in-out mt-3">Competently leverage existing enterprise wide niches through stand alone services. Quickly productize technically.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container relative md:mt-24 mt-16">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-5 md:col-span-6">
                            <div className="relative">
                                <div className="relative">
                                    <img src={ab1} className="lg:w-[400px] w-[280px]" alt="" />
                                    <div className="absolute top-0 translate-y-2/4 end-0 text-center">
                                        <Link to="#" onClick={() => setOpen(true)} data-id="S_CGed6E610" className="lightbox size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-[var(--riafco-orange)]  dark:text-white">
                                            <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute -end-5 -bottom-16">
                                    <img src={ab2} className="lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900" alt="" />
                                </div>
                            </div>
                        </div>
                        {isOpen && 
                            <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-1 w-full max-w-2xl max-h-full">
                                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                        <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                            <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className="p-1 md:p-1 space-y-4">
                                            <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="lg:col-span-7 md:col-span-6 mt-8 md:mt-0">
                            <div className="lg:ms-5">
                                <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Welcome to Techwind <br /> Law Firm Company</h3>

                                <p className="text-slate-400 max-w-xl">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with &apos;real&apos; content.</p>

                                <ul className="list-none text-slate-400 mt-4">
                                    <li className="mb-1 flex items-center ms-0"><BsCheckCircle className="text-[var(--riafco-orange)]  text-base me-2" /> Digital Marketing Solutions for Tomorrow</li>
                                    <li className="mb-1 flex items-center ms-0"><BsCheckCircle className="text-[var(--riafco-orange)]  text-base me-2" /> Our Talented & Experienced Marketing Agency</li>
                                    <li className="mb-1 flex items-center ms-0"><BsCheckCircle className="text-[var(--riafco-orange)]  text-base me-2" /> Create your own skin to match your brand</li>
                                </ul>

                                <div className="mt-6">
                                    <Link to="/contact-one" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-[var(--riafco-blue)] hover:bg-[var(--riafco-blue] border-[var(--riafco-blue)] hover:border-[var(--riafco-blue] text-white me-2 mt-2"><FaRegEnvelope className="me-2 text-sm" /> Contact us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container relative md:mt-24 mt-16 pt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">We provide Different types of office</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.</p>
                    </div>
                </div>

                <div className="container-fluid relative">
                    <div className="flex justify-center relative mt-8">
                        <div className="relative w-full">
                            <div className="tiny-six-item">
                                <TinySlider settings={settings2}>
                                    {lowServices.map((item, index) =>{
                                        return (
                                            <div className="tiny-slide" key={index}>
                                                <div className="group relative shadow-sm dark:shadow-gray-800 overflow-hidden mx-2">
                                                    <div className="relative">
                                                        <img src={item.iamge} className="group-hover:rotate-3 group-hover:scale-110 duration-500 ease-in-out" alt="" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
                                                    </div>
    
                                                    <div className="absolute bottom-6 start-6 end-6">
                                                        <Link to="#" className="text-white/70 hover:text-white text-lg block font-semibold duration-500 ease-in-out">{item.name}</Link>
                                                        <span className="text-white/60 block">{item.role}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </TinySlider>

                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}
