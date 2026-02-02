/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FaHome } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'

import riafcoAbout from "../../assets/images/riafco-about.jpg";
import { buildImageUrl } from "../../utils/imageUtils";
import pageSettingsService from "../../services/pageSettingsService";

export default function HeaderBreakdumb({ title, description = '', background = '', pageSlug = '' }) {
    const [pageImage, setPageImage] = useState('')

    useEffect(() => {
        if (!pageSlug) {
            setPageImage(background || '')
            return
        }
        pageSettingsService
            .getBySlug(pageSlug)
            .then((res) => {
                const img = res?.data?.image || background || ''
                setPageImage(img)
            })
            .catch(() => setPageImage(background || ''))
    }, [pageSlug, background])

    const bgUrl = pageImage ? buildImageUrl(pageImage) : riafcoAbout
    return <>


        <section
            className="relative w-full py-32 lg:py-36  bg-center bg-no-repeat bg-cover"
            style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '450px', // ou une hauteur fixe selon vos besoins
            }}
        >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 pb-8 text-center mt-10">
                    <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                        {title}
                    </h3>

                    {description && <>
                        <p className="text-white dark:text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                            {description}
                        </p>
                    </>}
                </div>
            </div>

            <div className="absolute text-center z-10 bottom-5 left-0 right-0 mx-3">
                <ul className="tracking-[0.5px] mb-0 inline-flex items-center space-x-1">
                    <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/80 hover:text-white">
                        <Link to="/">RIAFCO</Link>
                    </li>
                    <li className="inline-block text-base text-white/50 mx-0.5">
                        <MdKeyboardArrowRight className="text-xl" />
                    </li>
                    {/* <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
                        {title}
                    </li> */}
                </ul>
            </div>
        </section>

        <div className="relative">
            <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                <svg
                    className="w-full h-auto scale-[2.0] origin-top"
                    viewBox="0 0 2880 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        </div>




    </>
}


