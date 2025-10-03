/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';


import { portfolioOneData } from '../data/portfolio';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

export default function PortfolioClassicFilter(props) {
    let [selectedCategory, setSelectedCategory] = useState(null);
   
    let matchCategory = (category) => {
        setSelectedCategory(category);
    };

    let filteredData = selectedCategory
        ? portfolioOneData.filter((item) => item.category === selectedCategory)
        : portfolioOneData;

    return (
        <section className="relative md:py-24 py-16">

           {props.containerfuild === true ?  <div className="container-fluid relative">
            <div className="grid grid-cols-1 items-center gap-[30px]">
                <div className="filters-group-wrap text-center">
                    <div className="filters-group">
                        <ul className="mb-0 list-none container-filter-box filter-options space-x-3">
                            <li className={`${selectedCategory === null ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="all" onClick={() => matchCategory(null)}>All</li>
                            <li className={`${selectedCategory === 'branding' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="branding" onClick={() => matchCategory('branding')} >Branding</li>
                            <li className={`${selectedCategory === 'designing' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="designing" onClick={() => matchCategory('designing')}>Designing</li>
                            <li className={`${selectedCategory === 'photography' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="photography" onClick={() => matchCategory('photography')}>Photography</li>
                            <li className={`${selectedCategory === 'development' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="development" onClick={() => matchCategory('development')}>Development</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={props.className}>
                        {
                            filteredData.map((data,index) => {
                                return (
                                    <div key={index} className="picture-item" data-groups='["branding"]'>
                                        <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
                                            <Link to="/portfolio-detail-one"><img src={data.image} className="rounded-md" alt="" /></Link>
                                            <div className="content pt-3">
                                                <h5 className="mb-1"><Link to="/portfolio-detail-one" className="hover:text-[var(--riafco-orange)]  transition-all duration-500 font-semibold">{data.name}</Link></h5>
                                                <h6 className="text-slate-400">{data.role}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
            </div>

            <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
             <div className="md:col-span-12 text-center">
                 <nav aria-label="Page navigation example">
                     <ul className="inline-flex items-center -space-x-px">
                         <li>
                                    <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">
                                <MdOutlineKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                             </Link>
                         </li>
                         <li>
                                    <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">1</Link>
                         </li>
                         <li>
                                    <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">2</Link>
                         </li>
                         <li>
                                    <Link to="/#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-[var(--riafco-blue)] border border-[var(--riafco-blue)]">3</Link>
                         </li>
                         <li>
                                    <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">4</Link>
                         </li>
                         <li>
                                    <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">5</Link>
                         </li>
                         <li>
                                    <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">
                                <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1"/>
                             </Link>
                         </li>
                     </ul>
                 </nav>
             </div>
         </div>
        </div> :
         <div className="container relative">
         <div className="grid grid-cols-1 items-center gap-[30px]">
             <div className="filters-group-wrap text-center">
                 <div className="filters-group">
                     <ul className="mb-0 list-none container-filter-box filter-options space-x-3">
                         <li className={`${selectedCategory ===  null ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="all" onClick={() => matchCategory(null)}>All</li>
                         <li className={`${selectedCategory === 'branding' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="branding" onClick={() => matchCategory('branding')} >Branding</li>
                         <li className={`${selectedCategory === 'designing' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="designing" onClick={() => matchCategory('designing')}>Designing</li>
                         <li className={`${selectedCategory === 'photography' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="photography" onClick={() => matchCategory('photography')}>Photography</li>
                         <li className={`${selectedCategory === 'development' ? 'active' : ''} inline-block font-medium text-base mx-1.5 mb-3 py-1 px-3 cursor-pointer relative text-slate-400 border border-gray-100 dark:border-gray-700 rounded-md transition duration-500`} data-group="development" onClick={() => matchCategory('development')}>Development</li>
                     </ul>
                 </div>
             </div>
         </div>
         <div className={props.className}>
            {
                filteredData.map((data,index) => {
                    return (
                        <div key={index} className="picture-item" data-groups='["branding"]'>
                            <div className="group relative block overflow-hidden rounded-md transition-all duration-500">
                                <Link to="/portfolio-detail-one"><img src={data.image} className="rounded-md" alt="" /></Link>
                                <div className="content pt-3">
                                    <h5 className="mb-1"><Link to="/portfolio-detail-one" className="hover:text-[var(--riafco-orange)]  transition-all duration-500 font-semibold">{data.name}</Link></h5>
                                    <h6 className="text-slate-400">{data.role}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
         </div>

         <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
             <div className="md:col-span-12 text-center">
                 <nav aria-label="Page navigation example">
                     <ul className="inline-flex items-center -space-x-px">
                         <li>
                                        <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">
                                <MdOutlineKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                             </Link>
                         </li>
                         <li>
                                        <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">1</Link>
                         </li>
                         <li>
                                        <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">2</Link>
                         </li>
                         <li>
                                        <Link to="/#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-[var(--riafco-blue)] border border-[var(--riafco-blue)]">3</Link>
                         </li>
                         <li>
                                        <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">4</Link>
                         </li>
                         <li>
                                        <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">5</Link>
                         </li>
                         <li>
                                        <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]">
                                <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1"/>
                             </Link>
                         </li>
                     </ul>
                 </nav>
             </div>
         </div>
     </div>
        } 
       

        <div className="container relative md:mt-24 mt-16">
            <div className="grid grid-cols-1 text-center">
                <span className="text-slate-400 mb-4">Available for freelance projects</span>
                <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Do you have designing project? <br /> Let&apos;s talk.</h3>

                <div className="mt-6">
                        <Link to="/contact-one" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-[var(--riafco-blue)] hover:bg-[var(--riafco-blue] border-[var(--riafco-blue)] hover:border-[var(--riafco-blue] text-white rounded-full"><FiPhone className="me-1 text-lg" /> Contact us</Link>
                </div>
            </div>
        </div>
    </section>

    )
}
