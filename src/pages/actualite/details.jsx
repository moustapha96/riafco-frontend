

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
import Seo from '../../component/Seo';
export default function ActualitesDetails() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const isFr = (i18n.language || 'fr').toLowerCase().startsWith('fr');
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
            // S'assurer que galleries est un tableau et filtrer les valeurs nulles/vides
            const galleries = Array.isArray(response.news.galleries) 
                ? response.news.galleries.filter(img => img && img.trim() !== '')
                : [];
            setImages(galleries);
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
                search: isFr ? (newsItem?.title_fr || newsItem?.title_en) : (newsItem?.title_en || newsItem?.title_fr)
            });
            setSimilarNews(response.news.filter(item => item.id !== id && item.validated === "VALIDATED"));
        } catch (error) {
            console.error("Erreur lors de la récupération des actualités similaires :", error);
        }
    };

    const formatDate = (d) => {
        if (d == null || d === '') return '—';
        let dateInput = d;
        // Chaîne date seule (YYYY-MM-DD) : interpréter à midi pour éviter le décalage de fuseau
        if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}(T|$)/.test(d.trim())) {
            const datePart = d.trim().split('T')[0];
            if (datePart && /^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
                dateInput = `${datePart}T12:00:00`;
            }
        }
        const date = new Date(dateInput);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
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

    const currentTitle = isFr ? (newsItem.title_fr || newsItem.title_en) : (newsItem.title_en || newsItem.title_fr);
    const seoTitle = `${currentTitle} | RIAFCO`;
    const seoDescription =
        (isFr ? newsItem.content_fr : newsItem.content_en)?.replace(/<[^>]+>/g, '').slice(0, 160) ||
        (isFr ? newsItem.content_en : newsItem.content_fr)?.replace(/<[^>]+>/g, '').slice(0, 160) ||
        (isFr
            ? 'Détail d’une actualité du RIAFCO concernant les institutions africaines de financement des collectivités locales.'
            : 'RIAFCO news detail about African local government financing institutions.');

    return (
        <>
            <Seo
                title={seoTitle}
                description={seoDescription}
                canonicalPath={`/actualités/${newsItem.id}/détails`}
                lang={i18n.language}
                ogType="article"
            />
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={currentTitle}
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
                                    alt={isFr ? (newsItem.title_fr || newsItem.title_en) : (newsItem.title_en || newsItem.title_fr)}
                                />

                                <div className="flex items-center mb-4 text-sm text-slate-400">
                                    <span className="me-4">
                                        {t("actualitesDetails.publishedOn", {
                                            date: formatDate(newsItem.publishedAt ?? newsItem.updatedAt)
                                        })}
                                    </span>
                                    <span className="me-4">
                                        {t("actualitesDetails.author", { name: `${newsItem.author.firstName} ${newsItem.author.lastName}` })}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-semibold mb-6">
                                    {isFr ? (newsItem.title_fr || newsItem.title_en) : (newsItem.title_en || newsItem.title_fr)}
                                </h2>

                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: isFr ? (newsItem.content_fr || newsItem.content_en) : (newsItem.content_en || newsItem.content_fr)
                                    }}
                                />

                                {images && images.length > 0 && (
                                    <>
                                        <h3 className="mt-10 mb-3 text-xl font-semibold">
                                            {t("actualitesDetails.gallery") || "Galerie photos"}
                                        </h3>
                                        <Gallery 
                                            images={images} 
                                            title={isFr ? (newsItem.title_fr || newsItem.title_en) : (newsItem.title_en || newsItem.title_fr)} 
                                        />
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
                                                    alt={isFr ? (item.title_fr || item.title_en) : (item.title_en || item.title_fr)}
                                                />
                                                <div className="p-4">
                                                    <Link
                                                        to={`/actualités/${item.id}/détails`}
                                                        className="font-semibold hover:text-[var(--riafco-orange)]  block mb-2"
                                                    >
                                                        {isFr ? (item.title_fr || item.title_en) : (item.title_en || item.title_fr)}
                                                    </Link>
                                                    <p className="text-sm text-slate-400">
                                                        {formatDate(item.publishedAt ?? item.updatedAt)}
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
                                sujetActuel={isFr ? (newsItem.title_fr || newsItem.title_en) : (newsItem.title_en || newsItem.title_fr)}
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
