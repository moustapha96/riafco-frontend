/* eslint-disable no-unused-vars */



/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import HeaderBreakdumb from "../components/hearder-breakdumb";
import newsService from '../../services/newsService';
import { buildImageUrl } from '../../utils/imageUtils';


import riafcoAbout from "../../assets/images/riafco-about.jpg";

import i18next from 'i18next';

export default function ActualitesPage() {
    const { t } = useTranslation();
    const [news, setNews] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 6,
        total: 0,
        pages: 1,
        hasNextPage: false,
        hasPrevPage: false
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');
        fetchNews();
    }, [pagination.page, searchTerm, statusFilter]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await newsService.getAll({
                page: pagination.page,
                limit: pagination.limit,
                search: searchTerm,
                status: statusFilter,
            });
            console.log(response.news);
            setNews(response.news.filter(item => item.validated === "VALIDATED")   );
            setPagination(response.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération des actualités :", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setPagination({ ...pagination, page });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        fetchNews();
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setPagination({ ...pagination, page: 1 });
    };



    const formatDate = (d) =>
        new Date(d).toLocaleDateString(i18next.language === 'fr' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("actualites.pageTitle")}
                description={t("actualites.pageDescription")}
                background={riafcoAbout}
            />

            {/* Section de filtrage et recherche */}
            <section className="relative md:py-12 py-8">
                <div className="container relative">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h3 className="md:text-2xl text-xl font-semibold mb-4 md:mb-0">
                            {t("actualites.filterSection.title")}
                        </h3>
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder={t("actualites.filterSection.searchPlaceholder")}
                                className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {/* <select
                                className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-48"
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                            >
                                <option value="">{t("actualites.filterSection.statusFilter.all")}</option>
                                <option value="PUBLISHED">{t("actualites.filterSection.statusFilter.published")}</option>
                                <option value="DRAFT">{t("actualites.filterSection.statusFilter.draft")}</option>
                                <option value="ARCHIVED">{t("actualites.filterSection.statusFilter.archived")}</option>
                            </select> */}

                            <button
                                type="submit"
                                className="py-2 ant-btn-primary  px-6 bg-[var(--riafco-blue)] text-white rounded-md hover:bg-[var(--riafco-blue)] w-full md:w-auto"
                            >
                                {t("actualites.filterSection.searchButton")}
                            </button>

                        </form>
                    </div>
                </div>
            </section>

            {/* Section des actualités */}
            <section className="relative md:py-12 py-8">
                <div className="container relative">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p>{t("actualites.newsSection.loading")}</p>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                                <p>{t("actualites.newsSection.notFound")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                            {news.map((item) => (
                                <div key={item.id} className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden">
                                    <img src={buildImageUrl(item.image)} alt={item.title_fr} className="w-full h-48 object-cover" />
                                    <div className="content p-6">
                                        <Link
                                            to={`/actualités/${item.id}/détails`}
                                            className="title h5 text-lg font-medium hover:text-[var(--riafco-orange)]  duration-500 ease-in-out"
                                        >
                                            {item.title_fr}
                                        </Link>
                                        <p
                                            className="text-slate-400 mt-3"
                                            dangerouslySetInnerHTML={{
                                                __html: item.contentPreview_fr || item.content_fr.substring(0, 150) + '...'
                                            }}
                                        />
                                        <div className="mt-4">
                                            <Link
                                                to={`/actualités/${item.id}/détails`}
                                                className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-[var(--riafco-orange)]  after:bg-[var(--riafco-blue)] duration-500"
                                            >
                                                {t("actualites.newsSection.readMore")} <FaArrowRight className="ms-2 text-[10px]" />
                                            </Link>
                                        </div>
                                        <div className="mt-4 flex items-center text-sm text-slate-400">
                                            <span className="me-2">
                                                {t("actualites.newsSection.publishedAt")}
                                                <span>{formatDate(item.publishedAt)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav aria-label="Page navigation">
                                <ul className="inline-flex items-center -space-x-px">
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            disabled={!pagination.hasPrevPage}
                                            className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)] ${!pagination.hasPrevPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <MdOutlineKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1" />
                                        </button>
                                    </li>
                                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                                        <li key={page}>
                                            <button
                                                onClick={() => handlePageChange(page)}
                                                className={`size-[40px] ant-btn-primary inline-flex justify-center items-center ${pagination.page === page ? 'text-white bg-[var(--riafco-blue)]' : 'text-slate-400 hover:text-white bg-white dark:bg-slate-900'} border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)]`}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            disabled={!pagination.hasNextPage}
                                            className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-[var(--riafco-blue)] dark:hover:border-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)] ${!pagination.hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1" />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section abonnement */}
            {/* <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="md:flex justify-center">
                        <div className="lg:w-2/3 text-center">
                            <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold mb-6">
                                {t("actualites.newsletterSection.title")}
                            </h3>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                {t("actualites.newsletterSection.description")}
                            </p>
                            <div className="mt-8">
                                <div className="text-center subcribe-form">
                                    <form className="relative mx-auto max-w-xl">
                                        <input
                                            type="email"
                                            id="subemail"
                                            name="email"
                                            className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700"
                                            placeholder={t("actualites.newsletterSection.emailPlaceholder")}
                                        />
                                        <button
                                            type="submit"
                                            className="py-2 px-5 inline-block font-semibold tracking-wide align-middle transition duration-500 ease-in-out text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-[var(--riafco-blue)] hover:bg-[var(--riafco-blue)] border border-[var(--riafco-blue)] hover:border-[var(--riafco-blue)] text-white rounded-full"
                                        >
                                            {t("actualites.newsletterSection.subscribeButton")}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <Footer />
        </>
    );
}
