/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

export default function DashboardIfcl({ stats }) {
    const { t } = useTranslation();
    
    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark')
    });


    return (
        <>
            <section className="relative py-16 bg-gradient-to-r from-[var(--riafco-blue)] to-[var(--riafco-orange)] overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--riafco-blue)]/20 to-transparent"></div>
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 text-center text-white">
                        <h1 className="mb-6 text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                            dangerouslySetInnerHTML={{ __html: t("members.hero.title") }} />
                        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
                            {t("members.hero.subtitle")}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stats.totalMembers}</div>
                                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.totalMembers")}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="text-2xl md:text-3xl font-bold text-green-400">{stats.activeMembers}</div>
                                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.activeMembers")}</div>
                            </div>
                            {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400">{stats.observers}</div>
                                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.observers")}</div>
                            </div> */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="text-2xl md:text-3xl font-bold text-purple-400">{stats.totalCriteria}</div>
                                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.totalCriteria")}</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <span>{t("members.hero.legend.active")}</span>
                            </div>
                            {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <span>{t("members.hero.legend.observer")}</span>
                            </div> */}
                            {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                <span>{t("members.hero.legend.others")}</span>
                            </div> */}
                           
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">


                        <Link
                            to="/membres"
                            className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-white hover:text-white after:bg-white duration-500 ease-in-out"
                        >
                            {t("buttons.enSavoirPlus")} <FaArrowRight className="ms-2 text-[10px]" />
                        </Link>

                    </div>
                </div>
            </section>
        </>
    )
}
