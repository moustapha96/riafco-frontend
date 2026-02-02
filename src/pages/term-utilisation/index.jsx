
"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Navbar from "../../component/Navbar/navbar"
import Footer from "../../component/Footer/footer"
import { FaArrowRight } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import HeaderBreakdumb from "../components/hearder-breakdumb"
import riafcoAbout from "../../assets/images/riafco-about.jpg";

export default function TermeUtilisationPage() {
    const { t } = useTranslation()
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.classList.add("light")
        htmlTag.classList.remove("dark")
    }, [])

    const toggleAccordion = (index) => {
        setActiveIndex((prev) => (prev === index ? 0 : index))
    }

    // Listes depuis i18n (retourne des tableaux)
    const allowedList = t("terms.sections.allowed.items", { returnObjects: true }) || []
    const restrictedList = t("terms.sections.restrictions.items", { returnObjects: true }) || []
    const faqs = t("terms.faq", { returnObjects: true }) || []

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("terms.hero.title")}
                description={t("terms.hero.subtitle")}
                pageSlug="terme-et-condition"
            />



            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-900">
                <div className="container relative">
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <div className="p-8 lg:p-12 bg-white dark:bg-slate-800 shadow-lg dark:shadow-gray-700 rounded-xl">
                                <div className="prose prose-lg max-w-none dark:prose-invert">
                                    {/* 1 */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                                        {t("terms.sections.acceptance.title")}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {t("terms.sections.acceptance.body")}
                                    </p>

                                    {/* 2 */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mt-10">
                                        {t("terms.sections.use.title")}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                        {t("terms.sections.use.body")}
                                    </p>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                                            {t("terms.sections.allowed.title")}
                                        </h3>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                            {allowedList.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <FaArrowRight className="text-[var(--riafco-orange)] mt-1.5 mr-3 text-sm flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 3 */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mt-10">
                                        {t("terms.sections.restrictions.title")}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                        {t("terms.sections.restrictions.lead")}
                                    </p>
                                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
                                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                            {restrictedList.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <FaArrowRight className="text-red-500 mt-1.5 mr-3 text-sm flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* FAQ */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mt-10">
                                        {t("terms.faqTitle")}
                                    </h2>
                                </div>

                                <div className="mt-8">
                                    {faqs.slice(0, 4).map((item, index) => (
                                        <div
                                            key={index}
                                            className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleAccordion(index)}
                                                className={`flex justify-between items-center p-6 w-full font-medium text-left transition-all duration-200 ${activeIndex === index
                                                    ? "bg-blue-50 dark:bg-blue-900/20 text-[var(--riafco-orange)]"
                                                    : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
                                                    }`}
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <svg
                                                    className={`w-5 h-5 transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                            {activeIndex === index && (
                                                <div className="p-6 pt-0 bg-white dark:bg-slate-800">
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        {item.body}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
                                    <Link className="flex-1 py-3 px-6 text-center font-semibold tracking-wide border transition-all duration-300 text-base bg-[var(--riafco-blue)] hover:bg-blue-700 border-[var(--riafco-blue)] hover:border-blue-700 text-white rounded-lg shadow-md hover:shadow-lg">
                                        {t("terms.cta.accept")}
                                    </Link>
                                    <Link className="flex-1 py-3 px-6 text-center font-semibold tracking-wide border transition-all duration-300 text-base bg-transparent hover:bg-[var(--riafco-blue)] border-[var(--riafco-blue)] text-[var(--riafco-orange)] hover:text-white rounded-lg">
                                        {t("terms.cta.decline")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
