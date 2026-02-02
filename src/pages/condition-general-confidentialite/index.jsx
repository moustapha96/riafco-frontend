

"use client"

import { Link } from "react-router-dom"
import Navbar from "../../component/Navbar/navbar"
import Footer from "../../component/Footer/footer"
import { FaArrowRight } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import background from '../../assets/images/corporate/1.jpg';
import HeaderBreakdumb from "../components/hearder-breakdumb"
export default function ConditionGeneralConfidentialitePage() {
    const { t } = useTranslation()

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.classList.add("light")
        htmlTag.classList.remove("dark")
    }, [])

    const [activeIndex, setActiveIndex] = useState(0)
    const toggleAccordion = (index) => {
        setActiveIndex((prev) => (prev === index ? -1 : index))
    }

    // listes/faq récupérées depuis i18n (returnObjects)
    const typeItems = t("sections.types.items", { returnObjects: true }) || []
    const usageCards = t("sections.usage.cards", { returnObjects: true }) || []
    const rights = t("sections.rights.items", { returnObjects: true }) || []
    const faqs = t("faq", { returnObjects: true }) || []

    return (
        <>
            <Navbar navClass="nav-light" />


            <HeaderBreakdumb
                title={t("hero.title")}
                description={t("hero.subtitle")}
                pageSlug="confidentialite"
                background={background}
            />




            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-900">
                <div className="container relative">
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <div className="p-8 lg:p-12 bg-white dark:bg-slate-800 shadow-lg dark:shadow-gray-700 rounded-xl">
                                <div className="prose prose-lg max-w-none dark:prose-invert">
                                    {/* 1. Collecte */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                                        {t("sections.collection.title")}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {t("sections.collection.body")}
                                    </p>

                                    {/* 2. Types */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mt-10">
                                        {t("sections.types.title")}
                                    </h2>
                                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
                                        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                                            {t("sections.types.lead")}
                                        </h3>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                            {typeItems.map((li, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <FaArrowRight className="text-[var(--riafco-orange)] mt-1.5 mr-3 text-sm flex-shrink-0" />
                                                    {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 3. Usage */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mt-10">
                                        {t("sections.usage.title")}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                        {t("sections.usage.lead")}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        {usageCards.map((card) => (
                                            <div key={card.title} className={card.wrapperClass || "p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20"}>
                                                <h4 className="font-semibold mb-3">{card.title}</h4>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{card.body}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 4. Droits */}
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mt-10">
                                        {t("sections.rights.title")}
                                    </h2>
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6">
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">{t("sections.rights.lead")}</p>
                                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                            {rights.map((r, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <FaArrowRight className="text-yellow-600 mt-1.5 mr-3 text-sm flex-shrink-0" />
                                                    <span>
                                                        <strong>{r.title}:</strong> {r.body}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t("faqTitle")}</h3>
                                    {faqs.slice(0, 4).map((item, index) => (
                                        <div key={index} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleAccordion(index)}
                                                className={`flex justify-between items-center p-6 w-full font-medium text-left transition-all duration-200 ${activeIndex === index
                                                    ? "bg-green-50 dark:bg-green-900/20 text-[var(--riafco-orange)]"
                                                    : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
                                                    }`}
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <svg
                                                    className={`w-5 h-5 transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""}`}
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
                                                        {item.body.replace("{{email}}", t("dpoEmail"))}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg text-center">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t("cta.title")}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">{t("cta.body")}</p>
                                        <Link className="inline-block py-3 px-6 font-semibold tracking-wide border transition-all duration-300 text-base bg-[var(--riafco-blue)] hover:bg-blue-700 border-[var(--riafco-blue)] hover:border-blue-700 text-white rounded-lg shadow-md hover:shadow-lg">
                                            {t("cta.button")}
                                        </Link>
                                    </div>
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
