/* eslint-disable no-unused-vars */


/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import HeaderBreakdumb from "../components/hearder-breakdumb";
import activityService from '../../services/activityService';


import riafcoAbout from "../../assets/images/riafco-about.jpg";

export default function ActivitePage() {
    const { t, i18n } = useTranslation();

    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, pages: 1 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');
        fetchActivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.page, searchTerm, statusFilter]);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await activityService.getAll({
                page: pagination.page,
                limit: pagination.limit,
                search: searchTerm,
                status: statusFilter,
            });
            setActivities(response.activities);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération des activités :", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.pages) {
            setPagination({ ...pagination, page });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        fetchActivities();
    };



    const fmtDate = (d) =>
        new Date(d).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: i18n.language === 'fr' ? 'short' : 'short',
            year: 'numeric'
        });

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("activites.pageTitle")}
                description={t("activites.pageDescription")}
                background={riafcoAbout}
            />

            {/* Section de filtrage et de recherche */}
            <section className="relative md:py-12 py-8 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h3 className="md:text-2xl text-xl font-semibold mb-4 md:mb-0 text-slate-900 dark:text-white">
                            {t("activites.filterSection.title")}
                        </h3>

                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder={t("activites.filterSection.searchPlaceholder")}
                                className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {/* <select
                                className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                            >
                                <option value="">{t("activites.filterSection.statusFilter.all")}</option>
                                <option value="PUBLISHED">{t("activites.filterSection.statusFilter.published")}</option>
                                <option value="DRAFT">{t("activites.filterSection.statusFilter.draft")}</option>
                                <option value="ARCHIVED">{t("activites.filterSection.statusFilter.archived")}</option>
                            </select> */}
                            <button
                                type="submit"
                                className="py-2 px-6 ant-btn-primary text-white rounded-md  transition-colors duration-300 w-full md:w-auto"
                            >
                                {t("activites.filterSection.searchButton")}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Section des activités */}
            <section className="relative md:py-16 py-12">
                <div className="container relative">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-slate-500 dark:text-slate-400">{t("activites.listSection.loading")}</p>
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-64">
                            <h3 className="text-xl font-semibold text-slate-500 dark:text-slate-400 mb-2">
                                {t("activites.listSection.emptyTitle")}
                            </h3>
                            <p className="text-slate-400 text-center max-w-md">
                                {t("activites.listSection.emptyDescription")}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                {activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={activity.image || "/activities/default-activity.jpg"}
                                                alt={i18n.language === 'fr' ? activity.title_fr : (activity.title_en || activity.title_fr)}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center mb-3">
                                                <span className="text-[var(--riafco-orange)] text-lg mr-2">{activity.icon}</span>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {fmtDate(activity.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-center mb-3">
                                                <span className="text-[var(--riafco-orange)] text-lg mr-2">{t("actualitesDetails.dateActivity")}</span>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {fmtDate(activity.dateActivity)}
                                                </span>
                                            </div>

                                            <Link to={`/activités/${activity.id}/détails`} className="block mb-3">
                                                <h3 className="text-xl font-medium hover:text-[var(--riafco-orange)] transition-colors duration-300">
                                                    {i18n.language === 'fr' ? activity.title_fr : (activity.title_en || activity.title_fr)}
                                                </h3>
                                            </Link>

                                            <div
                                                className="text-slate-500 dark:text-slate-400 mt-3 prose max-w-none line-clamp-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: i18n.language === 'fr'
                                                        ? (activity.description_fr || '')
                                                        : (activity.description_en || activity.description_fr || '')
                                                }}
                                            />

                                            <div className="mt-5">
                                                <Link
                                                    to={`/activités/${activity.id}/détails`}
                                                    className="inline-flex items-center font-medium text-[var(--riafco-orange)] hover:text-indigo-800 transition-colors duration-300"
                                                >
                                                    {t("activites.listSection.readMore")}
                                                    <FaArrowRight className="ms-2 text-xs" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-12">
                                <div className="flex flex-col sm:flex-row justify-between items-center">
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
                                        {t("activites.listSection.paginationSummary", {
                                            page: pagination.page,
                                            pages: pagination.pages,
                                            total: pagination.total
                                        })}
                                    </div>

                                    <nav aria-label="Pagination des activités">
                                        <ul className="inline-flex items-center gap-1">
                                            <li>
                                                <button
                                                    onClick={() => handlePageChange(pagination.page - 1)}
                                                    disabled={pagination.page === 1}
                                                    className={`size-10 inline-flex justify-center items-center rounded-lg ${pagination.page === 1
                                                        ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                                        : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <MdOutlineKeyboardArrowLeft className="text-lg" />
                                                </button>
                                            </li>

                                            {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                                                let pageNumber;
                                                if (pagination.pages <= 5) {
                                                    pageNumber = i + 1;
                                                } else {
                                                    if (pagination.page <= 3) {
                                                        pageNumber = i + 1;
                                                    } else if (pagination.page >= pagination.pages - 2) {
                                                        pageNumber = pagination.pages - 4 + i;
                                                    } else {
                                                        pageNumber = pagination.page - 2 + i;
                                                    }
                                                }
                                                return pageNumber;
                                            }).map((page) => (
                                                <li key={page}>
                                                    <button
                                                        onClick={() => handlePageChange(page)}
                                                        className={`size-10 inline-flex ant-btn-primary justify-center items-center rounded-lg ${pagination.page === page
                                                            ? 'bg-[var(--riafco-blue)] text-white'
                                                            : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            ))}

                                            {pagination.pages > 5 && pagination.page < pagination.pages - 2 && (
                                                <li>
                                                    <span className="size-10 inline-flex justify-center items-center text-slate-500 dark:text-slate-400">
                                                        ...
                                                    </span>
                                                </li>
                                            )}

                                            <li>
                                                <button
                                                    onClick={() => handlePageChange(pagination.page + 1)}
                                                    disabled={pagination.page === pagination.pages}
                                                    className={`size-10 inline-flex justify-center items-center rounded-lg ${pagination.page === pagination.pages
                                                        ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                                        : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <MdKeyboardArrowRight className="text-lg" />
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
