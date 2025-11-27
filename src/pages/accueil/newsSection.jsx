
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import newsService from '../../services/newsService';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { buildImageUrl } from '../../utils/imageUtils';

export default function NewsSection(props) {
    const { t } = useTranslation();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsService.getAll({ status: "PUBLISHED" });
                console.log(response.news);
                setNews(response.news || []);
            } catch (error) {
                console.error("Erreur lors de la récupération des news :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });



    const preview = (text = "", len = 50) => {
        const clean = String(text).replace(/<[^>]*>/g, ""); // strip HTML
        return clean.length > len ? clean.slice(0, len) + "…" : clean;
    };

    const validNews = news
        .filter(
            (item) =>
                item?.status === "PUBLISHED" &&
                item?.title_fr &&
                item?.content_fr
        )
        .slice(0, 3);

    return (
        <div className={props.className}>
            <div
                className="grid md:grid-cols-12 grid-cols-1 items-center wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
            >
                <div className="md:col-span-6">
                    <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">
                        {t('newsSection.label')}
                    </h6>
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-[var(--riafco-blue)]">
                        {t('newsSection.title')}
                    </h3>
                </div>
                <div className="md:col-span-6">
                    <p className="text-slate-400 max-w-xl">
                        {t('newsSection.description')}
                    </p>
                </div>
            </div>


            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--riafco-orange)]"></div>
                </div>
            )}

            {!loading && validNews.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
                    {validNews.map((item, index) => {
                        const title = i18next.language === "fr" ? item.title_fr : item.title_en;
                        const content = i18next.language === "fr" ? item.content_fr : item.content_en;

                        return (
                            <div
                                key={item.id}
                                className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden wow animate__animated animate__fadeInUp"
                                data-wow-delay={`${0.1 * (index + 1)}s`}
                            >
                                {item.image && (
                                    <img
                                        src={buildImageUrl(item.image)}
                                        alt={title || "news"}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="content p-6">
                                    <Link
                                        to={`/actualités/${item.id}/détails`}
                                        className="title h5 text-lg font-medium hover:text-[var(--riafco-orange)] duration-500 ease-in-out block"
                                    >
                                        {title}
                                    </Link>

                                    <p className="text-slate-400 mt-3">
                                        {preview(content, 100)}
                                    </p>

                                    <span className="me-2  text-sm text-slate-400">
                                        {t("actualites.newsSection.publishedAt")}
                                        <span>{formatDate(item.createdAt)}</span>
                                    </span>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            {item.author?.profilePic && (
                                                <img
                                                    src={buildImageUrl(item.author.profilePic)}
                                                    alt={`${item.author?.firstName || ""} ${item.author?.lastName || ""}`.trim() || "author"}
                                                    className="size-8 rounded-full mr-2"
                                                />
                                            )}
                                            {(item.author?.firstName || item.author?.lastName) && (
                                                <span className="text-sm text-slate-400">
                                                    {item.author?.firstName} {item.author?.lastName}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            <Link
                                                to={`/actualités/${item.id}/détails`}
                                                className="relative text-[var(--riafco-blue)] hover:text-[var(--riafco-orange)] inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none
                                                                    after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-00 hover:after:end-auto
                                                                    after:bottom-0 after:start-0 after:duration-500 duration-500"
                                            >
                                                {t('newsSection.readMore')}
                                                <FaArrowRight className="ms-2 text-[10px]" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {!loading && validNews.length === 0 && (

                <p className="text-center text-slate-400 mt-8">
                    {t('newsSection.empty')}
                </p>
            )}


            {validNews.length > 0 && (
                <div className="mt-10 text-center">
                    <Link
                        to="/actualités"
                        className="py-2 ant-btn-primary  px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                       text-white rounded-md"
                    >
                        {t('newsSection.seeAll')} <FaArrowRight className="ms-2 text-[10px]" />
                    </Link>
                </div>
            )}
        </div>
    );
}
