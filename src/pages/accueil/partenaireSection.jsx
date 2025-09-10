import { Link } from 'react-router-dom';

import ab03 from '../../assets/images/about/ab03.jpg';
import ab02 from '../../assets/images/about/ab02.jpg';
import ab01 from '../../assets/images/about/ab01.jpg';

import Navbar from '../../component/Navbar/navbar'
import Footer from '../../component/Footer/footer';
import CookieModal from '../../component/cookieModal';
import ManagementTeam from '../../component/managementTeam';
import CompanyLogo from '../../component/companyLogo';


import TinySlider from 'tiny-slider-react';
import CountUp from 'react-countup';
import { feedback } from '../../data/data';
import { consultingAbout, consultingProduct, consultingServices } from '../../data/dataTwo';
import { FaArrowRight } from 'react-icons/fa';
import { FiAirplay } from 'react-icons/fi';
import { useEffect } from 'react';

const settings = {
    container: '.tiny-single-item',
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 16,
}
export default function PartenaireSection() {
    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark')
    });
    return (
        <>
           

            <section className="py-6 border-t border-b border-gray-100 dark:border-gray-700">
                <div className="container relative">
                    <CompanyLogo />
                </div>
            </section>

         

           
        </>
    )
}
