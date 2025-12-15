// "use client"

// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"

// import Navbar from "../../component/Navbar/navbar"
// import Footer from "../../component/Footer/footer"
// import CookieModal from "../../component/cookieModal"

// import { FaDownload, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa"
// import organizationService from "../../services/organizationService"
// import TransparentFooter from "../../component/Footer/transparentFooter"
// import riafcoAbout from "../../assets/images/riafco-about.jpg";
// import HeaderBreakdumb from "../components/hearder-breakdumb"

// export default function RapportGouvernance() {
//     const [reports, setReports] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const [currentPage, setCurrentPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(1)
//     const itemsPerPage = 10

//     useEffect(() => {
//         fetchRapport()
//         document.documentElement.setAttribute("dir", "ltr")
//         document.documentElement.classList.add("light")
//         document.documentElement.classList.remove("dark")
//     }, [currentPage])

//     const fetchRapport = async () => {
//         try {
//             setLoading(true)
//             const response = await organizationService.getReports({
//                 page: currentPage,
//                 limit: itemsPerPage,
//             })

//             if (response && response.reports) {
//                 setReports(response.reports)
//                 setTotalPages(response.pagination?.pages || 1)
//             }
//         } catch (error) {
//             console.error("Error fetching reports:", error)
//             setError("Erreur lors du chargement des rapports")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page)
//         }
//     }

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString("fr-FR", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         })
//     }

//     return (
//         <>
//             <Navbar navClass="nav-light" />

//             <HeaderBreakdumb
//                 title="Rapports de Gouvernance"
//                 description=" Découvrez les documents officiels et rapports de gouvernance du RIAFCO, incluant les statuts, règlements
//                             et informations sur la structure organisationnelle."
//                 background={riafcoAbout}
//             />




           


//             <section className="relative md:py-24 py-16 bg-gray-50">
//                 <div className="container relative">
//                     {loading ? (
//                         <div className="flex justify-center items-center py-20">
//                             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--riafco-blue)]"></div>
//                         </div>
//                     ) : error ? (
//                         <div className="text-center py-20">
//                             <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
//                                 <p className="text-red-600 font-semibold">{error}</p>
//                                 <button
//                                     onClick={fetchRapport}
//                                     className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                                 >
//                                     Réessayer
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <>
//                             {/* Reports Grid */}
//                             <div className="grid lg:grid-cols-2 gap-8 mb-12">
//                                 {reports.map((report, index) => (
//                                     <div
//                                         key={report.id}
//                                         className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
//                                     >
//                                         <div className="p-8">
//                                             <div className="flex items-start justify-between mb-4">
//                                                 <div className="flex-1">
//                                                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--riafco-blue)] transition-colors">
//                                                         {language === "fr" ? report.title_fr : report.title_en}
//                                                     </h3>
//                                                     <div className="flex items-center text-gray-500 text-sm mb-4">
//                                                         <FaCalendarAlt className="mr-2" />
//                                                         <span>Publié le {formatDate(report.publishedAt)}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="ml-4">
//                                                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--riafco-blue)]/10 text-[var(--riafco-blue)]">
//                                                         #{String(index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0")}
//                                                     </span>
//                                                 </div>
//                                             </div>

//                                             <p className="text-gray-600 leading-relaxed mb-6">
//                                                 {language === "fr" ? report.paragraphe_fr : report.paragraphe_en}
//                                             </p>

//                                             {report.fileUrl && (
//                                                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                                                     <span className="text-sm text-gray-500">Document PDF disponible</span>
//                                                     <Link
//                                                         to={report.fileUrl}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="inline-flex items-center px-4 py-2 bg-[var(--riafco-blue)] hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
//                                                     >
//                                                         <FaDownload className="mr-2 text-sm" />
//                                                         Télécharger
//                                                     </Link>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {totalPages > 1 && (
//                                 <div className="flex justify-center items-center space-x-2">
//                                     <button
//                                         onClick={() => handlePageChange(currentPage - 1)}
//                                         disabled={currentPage === 1}
//                                         className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         <FaChevronLeft className="text-sm" />
//                                     </button>

//                                     {[...Array(totalPages)].map((_, index) => {
//                                         const page = index + 1
//                                         return (
//                                             <button
//                                                 key={page}
//                                                 onClick={() => handlePageChange(page)}
//                                                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
//                                                     ? "bg-[var(--riafco-blue)] text-white"
//                                                     : "border border-gray-300 hover:bg-gray-50"
//                                                     }`}
//                                             >
//                                                 {page}
//                                             </button>
//                                         )
//                                     })}

//                                     <button
//                                         onClick={() => handlePageChange(currentPage + 1)}
//                                         disabled={currentPage === totalPages}
//                                         className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     >
//                                         <FaChevronRight className="text-sm" />
//                                     </button>
//                                 </div>
//                             )}

//                             {/* Summary Stats */}
//                             <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
//                                 <div className="text-center">
//                                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Statistiques des Documents</h3>
//                                     <div className="grid md:grid-cols-3 gap-8">
//                                         <div className="text-center">
//                                             <div className="text-3xl font-bold text-[var(--riafco-blue)] mb-2">{reports.length}</div>
//                                             <p className="text-gray-600">Documents sur cette page</p>
//                                         </div>
//                                         <div className="text-center">
//                                             <div className="text-3xl font-bold text-[var(--riafco-orange)] mb-2">{totalPages}</div>
//                                             <p className="text-gray-600">Pages au total</p>
//                                         </div>
//                                         <div className="text-center">
//                                             <div className="text-3xl font-bold text-green-600 mb-2">
//                                                 {reports.filter((r) => r.fileUrl).length}
//                                             </div>
//                                             <p className="text-gray-600">Fichiers téléchargeables</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </section>

//             <Footer />
//             <CookieModal />
//         </>
//     )
// }


/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import CookieModal from "../../component/cookieModal";

import { FaDownload, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import organizationService from "../../services/organizationService";
import TransparentFooter from "../../component/Footer/transparentFooter";
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import HeaderBreakdumb from "../components/hearder-breakdumb";
import { useTranslation } from "react-i18next";
import { buildImageUrl } from "../../utils/imageUtils";

export default function RapportGouvernance() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === "fr" ? "fr-FR" : "en-US";

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchRapport();
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchRapport = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await organizationService.getReports({
                page: currentPage,
                limit: itemsPerPage,
            });

            if (response && response.reports) {
                setReports(response.reports);
                setTotalPages(response.pagination?.pages || 1);
            } else {
                setReports([]);
                setTotalPages(1);
            }
        } catch (e) {
            console.error("Error fetching reports:", e);
            setError(t("governanceReports.error"));
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });

    const localizeText = (fr, en, fallback = "") =>
        i18n.language === "fr" ? fr ?? en ?? fallback : en ?? fr ?? fallback;

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("governanceReports.header.title")}
                description={t("governanceReports.header.description")}
                // background={riafcoAbout}
            />

            <section className="relative md:py-24 py-16 bg-gray-50">
                <div className="container relative">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--riafco-blue)] mb-4"></div>
                            <span>{t("governanceReports.loading")}</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                                <p className="text-red-600 font-semibold">{error}</p>
                                <button
                                    onClick={fetchRapport}
                                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    {t("governanceReports.retry")}
                                </button>
                            </div>
                        </div>
                    ) : reports.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-semibold mb-2">{t("governanceReports.empty.title")}</h3>
                            <p className="text-slate-500">{t("governanceReports.empty.subtitle")}</p>
                        </div>
                    ) : (
                        <>
                            {/* Reports Grid */}
                            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                                {reports.map((report, index) => {
                                    const title = localizeText(report.title_fr, report.title_en, report.title);
                                    const paragraph = localizeText(report.paragraphe_fr, report.paragraphe_en, report.paragraph);
                                    return (
                                        <div
                                            key={report.id}
                                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                        >
                                            <div className="p-8">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--riafco-blue)] transition-colors">
                                                            {title}
                                                        </h3>
                                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                                            <FaCalendarAlt className="mr-2" />
                                                            <span>
                                                                {t("governanceReports.publishedOn", { date: formatDate(report.publishedAt) })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--riafco-blue)]/10 text-[var(--riafco-blue)]">
                                                            #{String(index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0")}
                                                        </span>
                                                    </div>
                                                </div>

                                                {paragraph && <p className="text-gray-600 leading-relaxed mb-6">{paragraph}</p>}

                                                {report.fileUrl && (
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                        <span className="text-sm text-gray-500">{t("governanceReports.pdfAvailable")}</span>
                                                        <Link
                                                            to={buildImageUrl(report.fileUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center px-4 py-2 bg-[var(--riafco-blue)] hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                                                        >
                                                            <FaDownload className="mr-2 text-sm" />
                                                            {t("governanceReports.download")}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label={t("governanceReports.pagination.prev")}
                                    >
                                        <FaChevronLeft className="text-sm" />
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => {
                                        const page = index + 1;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                                                        ? "bg-[var(--riafco-blue)] text-white"
                                                        : "border border-gray-300 hover:bg-gray-50"
                                                    }`}
                                                aria-current={currentPage === page ? "page" : undefined}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label={t("governanceReports.pagination.next")}
                                    >
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </div>
                            )}

                            {/* Summary Stats */}
                            <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("governanceReports.stats.title")}</h3>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[var(--riafco-blue)] mb-2">{reports.length}</div>
                                            <p className="text-gray-600">{t("governanceReports.stats.onPage")}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[var(--riafco-orange)] mb-2">{totalPages}</div>
                                            <p className="text-gray-600">{t("governanceReports.stats.totalPages")}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600 mb-2">
                                                {reports.filter((r) => r.fileUrl).length}
                                            </div>
                                            <p className="text-gray-600">{t("governanceReports.stats.downloadable")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
            <CookieModal />
        </>
    );
}
