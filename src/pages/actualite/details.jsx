

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import newsService from '../../services/newsService';
import ActualiteUserDetail from './ActualiteUserDetail';
import { useTranslation } from 'react-i18next';
import HeaderBreakdumb from '../components/hearder-breakdumb';
import background from '../../assets/images/corporate/1.jpg';
import Gallery from '../../component/Gallery';
import { buildImageUrl } from '../../utils/imageUtils';
export default function ActualitesDetails() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarNews, setSimilarNews] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        fetchNewsItem();
    }, [id]);

    const fetchNewsItem = async () => {
        try {
            setLoading(true);
            const response = await newsService.getById(id);
            console.log(response);
            setImages(response.news.galleries || []);
            setNewsItem(response.news);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'actualité :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (newsItem) {
            fetchSimilarNews();
        }
    }, [newsItem]);

    const fetchSimilarNews = async () => {
        try {
            const response = await newsService.getAll({
                limit: 3,
                status: "PUBLISHED",
                authorId: newsItem?.authorId,
                search: i18n.language === "fr" ? newsItem?.title_fr : newsItem?.title_en
            });
            setSimilarNews(response.news.filter(item => item.id !== id && item.validated === "VALIDATED"));
        } catch (error) {
            console.error("Erreur lors de la récupération des actualités similaires :", error);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>{t("actualitesDetails.loading")}</p>
                </div>
            </>
        );
    }

    if (!newsItem) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>{t("actualitesDetails.notFound")}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={i18n.language === "fr" ? newsItem.title_fr : newsItem.title_en}
                background={newsItem?.image ? newsItem.image : null}

            />


            {/* Contenu */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:col-span-6">
                            <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800">
                                <img
                                    src={buildImageUrl(newsItem.image)}
                                    className="rounded-md w-full h-64 object-cover mb-6"
                                    alt={i18n.language === "fr" ? newsItem.title_fr : newsItem.title_en}
                                />

                                <div className="flex items-center mb-4 text-sm text-slate-400">
                                    <span className="me-4">
                                        {t("actualitesDetails.publishedOn", {
                                            date: new Date(newsItem.publishedAt).toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            })
                                        })}
                                    </span>
                                    <span className="me-4">
                                        {t("actualitesDetails.author", { name: `${newsItem.author.firstName} ${newsItem.author.lastName}` })}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-semibold mb-6">
                                    {i18n.language === "fr" ? newsItem.title_fr : newsItem.title_en}
                                </h2>

                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: i18n.language === "fr" ? newsItem.content_fr : newsItem.content_en
                                    }}
                                />

                                {images.length > 0 && (
                                    <>
                                        <h3 className="mt-10 mb-3 text-xl font-semibold">
                                            {t("actualitesDetails.gallery") || "Galerie photos"}
                                        </h3>
                                        <Gallery images={images} title={i18n.language === "fr" ? newsItem.title_fr : newsItem.title_en} />
                                    </>
                                )}
                            </div>

                            {/* Actualités Similaires */}
                            {similarNews.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="text-xl font-semibold mb-6">{t("actualitesDetails.similarNews")}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {similarNews.map((item) => (
                                            <div key={item.id} className="rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden">
                                                <img
                                                    src={buildImageUrl(item.image)}
                                                    className="w-full h-32 object-cover"
                                                    alt={i18n.language === "fr" ? item.title_fr : item.title_en}
                                                />
                                                <div className="p-4">
                                                    <Link
                                                        to={`/actualités/${item.id}/détails`}
                                                        className="font-semibold hover:text-[var(--riafco-orange)]  block mb-2"
                                                    >
                                                        {i18n.language === "fr" ? item.title_fr : item.title_en}
                                                    </Link>
                                                    <p className="text-sm text-slate-400">
                                                        {new Date(item.publishedAt).toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US")}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* <BlogComment /> */}
                        </div>

                        {/* Sidebar Auteur */}
                        <div className="lg:col-span-4 md:col-span-6">
                            <ActualiteUserDetail
                                auteurNom={`${newsItem.author.firstName} ${newsItem.author.lastName}`}
                                auteurPhoto={newsItem.author.profilePic}
                                auteurId={newsItem.author.id}
                                sujetActuel={i18n.language === "fr" ? newsItem.title_fr : newsItem.title_en}
                                actualiteId={newsItem.id}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
