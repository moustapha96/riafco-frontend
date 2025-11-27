

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import image1 from '@/assets/image1.jpg';
import image2 from '@/assets/image2.jpg';

import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import CookieModal from '../../component/cookieModal';
import { FaArrowRight } from 'react-icons/fa';
import ContactSection from './contactSection';
import NewsSection from './newsSection';
import ActiviteSection from './activiteSection';
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import AboutSection from "./AboutSection";


import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import * as Icon from 'react-feather';
import DashboardIfcl from '../membre/dashboad';
import ifclService from '../../services/ifclService';
import { useTranslation } from 'react-i18next';


export default function Accueil() {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        observers: 0,
        totalCriteria: 0,
    });

    const fetchCountries = async () => {
        try {
            const response = await ifclService.getAll();
            if (response.datas) {
                const africanMembers = response.datas;
                const activeMembers = africanMembers.filter((c) => c.status === "ACTIVE").length;
                const totalCriteria = africanMembers.reduce((sum, c) => sum + (c._count?.criteria || 0), 0);
                setStats({
                    totalMembers: africanMembers.length,
                    activeMembers: activeMembers,
                    observers: africanMembers.length - activeMembers,
                    totalCriteria: totalCriteria,
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des pays :", error);
        }
    };

    useEffect(() => {
        fetchCountries();
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');
    }, []);

    return (
        <div>
            <Navbar navClass="nav-light" />

            <section className="swiper-slider-hero relative block h-screen" id="home">
                <Swiper
                    className="swiper-container h-full"
                    slidesPerView={1}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    navigation={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    loop={true}
                >
                    <SwiperSlide>
                        <div
                            className="relative table w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${riafcoAbout})` }}
                        >
                            {/* Overlay noir pour améliorer la lisibilité */}
                            <div className="absolute inset-0 bg-black/70"></div>

                            {/* Conteneur centré */}
                            <div className="container relative h-full flex items-center justify-center">
                                <div className="text-center max-w-4xl px-4">
                                    <h1
                                        className="font-bold text-white lg:leading-normal text-4xl lg:text-5xl mb-5"
                                        dangerouslySetInnerHTML={{ __html: t("home.hero2.title") }}
                                    />
                                    <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                                        {t("home.hero2.description")}
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            to="/contact"
                                            className="py-3 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                bg-[--riafco-blue] hover:bg-[--riafco-blue-hover] border-[--riafco-blue] hover:border-[--riafco-blue-hover]
                text-white rounded-md"
                                        >
                                            {t("home.hero2.button")} <FaArrowRight className="ms-2 text-[10px]" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            className="relative table w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image1})` }}
                        >
                            {/* Overlay noir pour améliorer la lisibilité */}
                            <div className="absolute inset-0 bg-black/70"></div>

                            {/* Conteneur centré */}
                            <div className="container relative h-full flex items-center justify-center">
                                <div className="text-center max-w-4xl px-4">
                                    <span className="text-white/80 font-bold text-sm mb-3 uppercase tracking-wider block">
                                        {t("home.hero.subtitle")}
                                    </span>
                                    <h2
                                        className="font-bold lg:leading-normal text-4xl lg:text-5xl mb-5 text-white"
                                        dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
                                    />
                                    <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                                        {t("home.hero.description")}
                                    </p>
                                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                                        <Link
                                            to="/a-propos"
                                            className="py-3 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                bg-[--riafco-orange] hover:bg-[--riafco-orange-hover] border-[--riafco-orange] hover:border-[--riafco-orange-hover]
                text-white rounded-md"
                                        >
                                            {t("home.hero.button1")} <FaArrowRight className="ms-2 text-[10px]" />
                                        </Link>
                                        <Link
                                            to="/evenements"
                                            className="py-3 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                bg-transparent hover:bg-[--riafco-blue] border-white hover:border-[--riafco-blue]
                text-white hover:text-white rounded-md"
                                        >
                                            {t("home.hero.button2")} <FaArrowRight className="ms-2 text-[10px]" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>


                </Swiper>
            </section>




            {/* <section
                className="relative table w-full py-36 lg:py-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${riafcoAbout})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <span className="text-white/80 font-bold text-sm mb-3 uppercase tracking-wider">
                            {t("home.about.subtitle")}
                        </span>
                        <h2
                            className="font-bold lg:leading-normal text-4xl lg:text-5xl mb-5 text-white"
                            dangerouslySetInnerHTML={{ __html: t("home.about.title") }}
                        />
                        <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
                            {t("home.about.description")}
                        </p>
                        <div className="mt-8 flex justify-center gap-4 flex-wrap">
                            <Link
                                to="/a-propos"
                                className="py-3 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                                bg-[--riafco-orange] hover:bg-[--riafco-orange-hover] border-[--riafco-orange] hover:border-[--riafco-orange-hover]
                                text-white rounded-md"
                            >
                                {t("buttons.enSavoirPlus")} <FaArrowRight className="ms-2 text-[10px]" />
                            </Link>
                            <Link
                                to="/évènements"
                                className="py-3 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                                bg-transparent hover:bg-[--riafco-blue] border-white hover:border-[--riafco-blue]
                                text-white hover:text-white rounded-md"
                            >
                                {t("home.hero.button2")} <FaArrowRight className="ms-2 text-[10px]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}

            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-[var(--riafco-orange)]">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="relative bg-[var(--riafco-orange)] py-10">
                <div className="container relative">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                        {/* Gouvernance */}
                        <div className="group px-6 py-8 hover:bg-[var(--riafco-blue)] duration-500 ease-in-out">
                            <Icon.BookOpen className="size-10 stroke-1 text-white" />
                            <div className="content mt-6">
                                <Link to="/rapport-gouvernance" className="text-lg font-semibold text-white/80 hover:text-white">
                                    {t("home.services.gouvernance.title")}
                                </Link>
                                <p className="text-white/50 mt-4">
                                    {t("home.services.gouvernance.description")}
                                </p>
                                <div className="mt-5">
                                    <Link
                                        to="/rapport-gouvernance"
                                        className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-white hover:text-white after:bg-white duration-500 ease-in-out"
                                    >
                                        {t("buttons.enSavoirPlus")} <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Équipe */}
                        <div className="group px-6 py-8 hover:bg-[var(--riafco-blue)] duration-500 ease-in-out">
                            <Icon.Users className="size-10 stroke-1 text-white" />
                            <div className="content mt-6">
                                <Link to="/notre-équipe" className="text-lg font-semibold text-white/80 hover:text-white">
                                    {t("home.services.equipe.title")}
                                </Link>
                                <p className="text-white/50 mt-4">
                                    {t("home.services.equipe.description")}
                                </p>
                                <div className="mt-5">
                                    <Link
                                        to="/notre-équipe"
                                        className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-white hover:text-white after:bg-white duration-500 ease-in-out"
                                    >
                                        {t("buttons.enSavoirPlus")} <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Événements */}
                        <div className="group px-6 py-8 hover:bg-[var(--riafco-blue)] duration-500 ease-in-out">
                            <Icon.Calendar className="size-10 stroke-1 text-white" />
                            <div className="content mt-6">
                                <Link to="/évènements" className="text-lg font-semibold text-white/80 hover:text-white">
                                    {t("home.services.evenements.title")}
                                </Link>
                                <p className="text-white/50 mt-4">
                                    {t("home.services.evenements.description")}
                                </p>
                                <div className="mt-5">
                                    <Link
                                        to="/évènements"
                                        className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-white hover:text-white after:bg-white duration-500 ease-in-out"
                                    >
                                        {t("buttons.enSavoirPlus")} <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Ressources */}
                        <div className="group px-6 py-8 hover:bg-[var(--riafco-blue)] duration-500 ease-in-out">
                            <Icon.FileText className="size-10 stroke-1 text-white" />
                            <div className="content mt-6">
                                <Link to="/ressources" className="text-lg font-semibold text-white/80 hover:text-white">
                                    {t("home.services.ressources.title")}
                                </Link>
                                <p className="text-white/50 mt-4">
                                    {t("home.services.ressources.description")}
                                </p>
                                <div className="mt-5">
                                    <Link
                                        to="/ressources"
                                        className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-white hover:text-white after:bg-white duration-500 ease-in-out"
                                    >
                                        {t("buttons.enSavoirPlus")} <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AboutSection />

            <DashboardIfcl stats={stats} />

            <section className="relative md:py-24 py-16">
                <ActiviteSection className="container relative md:mt-24 mt-16" id={"activities"} />
                <NewsSection className="container relative md:mt-24 mt-16" id={"news"} />
            </section>

            <ContactSection id={"contact"} />
            <Footer />
            <CookieModal />
        </div>
    );
}
