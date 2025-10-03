
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaGlobe, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";

import legalService from "../../services/legalService"

import HeaderBreakdumb from "../components/hearder-breakdumb";
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import { useTranslation } from "react-i18next";

export default function ReglementInterieurPage() {
    const { t, i18n } = useTranslation();
    const isFr = i18n.language?.startsWith("fr");
    const locale = isFr ? "fr-FR" : "en-US";

    const [legalTerms, setLegalTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add("light");
        htmlTag.classList.remove("dark");
        fetchReglementInterieur();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchReglementInterieur = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await legalService.getAll();
            if (response?.success) {
                setLegalTerms(response.data || []);
            } else {
                setError(t("legal.internalRules.error"));
            }
        } catch {
            setError(t("legal.internalRules.error"));
        } finally {
            setLoading(false);
        }
    };

    const formatContent = (content = "") => {
        return content.split("\n").map((paragraph, index) => {
            if (paragraph.trim() === "") return null;

            if (paragraph.includes("**")) {
                // Rend le texte entre ** ** en tant que sous-titre
                const parts = paragraph.split("**");
                return (
                    <div key={index} className="mb-4">
                        {parts.map((part, partIndex) =>
                            partIndex % 2 === 1 ? (
                                <h5 key={partIndex} className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    {part}
                                </h5>
                            ) : (
                                <span key={partIndex}>{part}</span>
                            )
                        )}
                    </div>
                );
            }

            return (
                <p key={index} className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {paragraph.trim()}
                </p>
            );
        });
    };

    if (loading) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <HeaderBreakdumb
                    title={t("legal.internalRules.header.title")}
                    description={t("legal.internalRules.header.description")}
                    background={riafcoAbout}
                />
                <div className="min-h-[40vh] flex items-center justify-center">
                    <div className="text-center text-slate-600">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--riafco-orange)] mx-auto mb-4"></div>
                        <p>{t("legal.internalRules.loading")}</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <HeaderBreakdumb
                    title={t("legal.internalRules.header.title")}
                    description={t("legal.internalRules.header.description")}
                    background={riafcoAbout}
                />
                <div className="min-h-[40vh] flex items-center justify-center">
                    <div className="text-center">
                        <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchReglementInterieur}
                            className="mt-4 px-6 py-2 bg-[var(--riafco-blue)] text-white rounded-md hover:opacity-90"
                        >
                            {t("legal.internalRules.retry")}
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("legal.internalRules.header.title")}
                description={t("legal.internalRules.header.description")}
                background={riafcoAbout}
            />

            {/* Fil d’ariane sous le header */}
            <div className="container relative flex flex-col items-center justify-center text-center">
                <div className="mt-6 flex justify-center">
                    <ul className="tracking-[0.5px] mb-0 inline-flex items-center space-x-1 text-slate-500">
                        <li className="inline-block uppercase text-[12px] font-bold">
                            <Link to="/">RIAFCO</Link>
                        </li>
                        <li className="inline-block text-base mx-1">
                            <MdKeyboardArrowRight className="text-xl" />
                        </li>
                        <li className="inline-block uppercase text-[12px] font-bold" aria-current="page">
                            {t("legal.internalRules.breadcrumb.section")}
                        </li>
                    </ul>
                </div>
            </div>

            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">


                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            {legalTerms.map((term) => {
                                const title = isFr ? term.title_fr ?? term.title_en : term.title_en ?? term.title_fr;
                                const content = isFr ? term.content_fr ?? term.content_en : term.content_en ?? term.content_fr;

                                return (
                                    <div
                                        key={term.id}
                                        className="bg-white dark:bg-slate-900 shadow-lg dark:shadow-gray-800 rounded-xl p-8 mb-8"
                                    >
                                        {/* Header */}
                                        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                                            <div className="flex items-center mb-4">
                                                <FaShieldAlt className="text-2xl text-[var(--riafco-orange)] mr-3" />
                                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                                            </div>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                                                    {t("legal.internalRules.badges.version", { version: term.version })}
                                                </span>
                                                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                                                    {t("legal.internalRules.badges.active")}
                                                </span>
                                                <span>
                                                    {t("legal.internalRules.badges.effectiveFrom", {
                                                        date: new Date(term.effectiveDate).toLocaleDateString(locale),
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="prose prose-lg max-w-none">{formatContent(content)}</div>

                                        {/* Footer */}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {t("legal.internalRules.badges.lastUpdated", {
                                                    date: new Date(term.updatedAt).toLocaleDateString(locale),
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {legalTerms.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-lg font-semibold">{t("legal.internalRules.empty.title")}</p>
                                    <p className="text-slate-500">{t("legal.internalRules.empty.subtitle")}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
