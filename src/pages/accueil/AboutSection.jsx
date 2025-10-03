

// AboutSection.jsx
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaArrowRight, FaInfoCircle, FaHandshake, FaNetworkWired, FaGlobeAfrica } from "react-icons/fa"
import { AiOutlineCheckCircle } from "react-icons/ai"
import experienceWall from "../../assets/images/riafco-about.jpg"

const ICONS = [FaNetworkWired, FaHandshake, FaGlobeAfrica]

export default function AboutSection() {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    // Tableaux depuis i18n
    const services = t("about.services", { returnObjects: true }) || []
    const missions = t("about.missions.items", { returnObjects: true }) || []

    return (
        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                    {/* Colonne 1 - Présentation */}
                    <div className="lg:col-span-4 md:col-span-6 lg:order-1 order-2 lg:text-center">
                        <Link
                            to="/a-propos"
                            className="size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center
                         bg-[var(--riafco-orange)] hover:bg-[var(--riafco-blue)] text-white duration-500 ease-in-out mx-auto"
                        >
                            <FaInfoCircle className="text-2xl" />
                        </Link>

                        <h6 className="text-[var(--riafco-blue)] text-sm font-bold uppercase mt-8 mb-2">
                            {t("about.badge")}
                        </h6>

                        <h3 className="mb-4 md:text-4xl md:leading-normal text-3xl leading-normal font-bold text-[var(--riafco-blue)]">
                            {t("about.title")}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                            {t("about.p1")}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mt-4">
                            {t("about.p2")}
                        </p>
                    </div>

                    {/* Colonne 2 - Image */}
                    <div className="lg:col-span-4 md:col-span-6 lg:order-2 order-1">
                        <img
                            src={experienceWall}
                            className="shadow-md dark:shadow-gray-800 rounded-lg w-full h-auto"
                            alt={t("about.imageAlt")}
                        />
                    </div>

                    {/* Colonne 3 - Missions */}
                    <div className="lg:col-span-4 md:col-span-12 lg:order-3 order-3">
                        <h4 className="text-[var(--riafco-blue)] text-lg font-semibold mb-4">
                            {t("about.missions.title")}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {t("about.missions.lead")}
                        </p>

                        <ul className="list-none text-slate-600 dark:text-slate-400 mt-4 space-y-3">
                            {missions.map((m, i) => (
                                <li key={i} className="flex items-start">
                                    <AiOutlineCheckCircle className="text-[var(--riafco-orange)] text-xl me-3 mt-1 flex-shrink-0" />
                                    <span>{m}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <Link
                                to="/a-propos"
                                className="inline-flex items-center font-semibold text-[var(--riafco-orange)] hover:text-[var(--riafco-orange-hover)] duration-300"
                            >
                                {t("about.cta")}
                                <FaArrowRight className="ms-2 text-xs" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Modal vidéo (désactivé par défaut) */}
                {false && isOpen && (
                    <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center">
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {t("about.video.title")}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">{t("about.video.close")}</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <iframe
                                        width="100%"
                                        height="400"
                                        src="https://www.youtube.com/embed/VIDEO_ID_RIAFCO?rel=0"
                                        title={t("about.video.title")}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Domaines d'intervention */}
                <div className="container relative md:mt-24 mt-16 pt-16">
                    <div className="relative grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            {t("about.domains.title")}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t("about.domains.lead")}
                        </p>
                    </div>

                    <div className="relative grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
                        {services.map((svc, index) => {
                            const Icon = ICONS[index % ICONS.length]
                            return (
                                <div
                                    key={index}
                                    className="group px-6 py-8 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg dark:hover:shadow-gray-800 duration-500 ease-in-out border-t-4 border-[var(--riafco-blue)] hover:border-[var(--riafco-orange)]"
                                >
                                    <div className="mb-4">
                                        <Icon className="size-7 text-[var(--riafco-orange)]" />
                                    </div>
                                    <div className="content mt-2">
                                        <h4 className="text-xl font-semibold group-hover:text-[var(--riafco-orange)] duration-500 ease-in-out mb-3">
                                            {svc.title}
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400">{svc.desc}</p>
                                        <div className="mt-5">
                                            <Link
                                                to="#"
                                                className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none
                                   after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto
                                   after:bottom-0 after:start-0 after:duration-500 text-[var(--riafco-orange)] hover:text-[var(--riafco-orange-hover)] after:bg-[var(--riafco-blue)] duration-500"
                                            >
                                                {t("about.domains.more")}
                                                <FaArrowRight className="ms-2 text-[10px]" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
