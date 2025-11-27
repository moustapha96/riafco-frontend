

/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';

import activityService from '../../services/activityService';
import ActiviteUserDetail from './ActiviteUserDetail';
import { useTranslation } from 'react-i18next';
import HeaderBreakdumb from '../components/hearder-breakdumb';
import background from '../../assets/images/corporate/1.jpg';
import Gallery from '../../component/Gallery';
import { buildImageUrl } from '../../utils/imageUtils';
export default function ActiviteDetailPage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [similarActivities, setSimilarActivities] = useState([]);

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        const fetchActivity = async () => {
            try {
                setLoading(true);
                const response = await activityService.getById(id);
                setImages(response.activity.galleries || []);
                setActivity(response.activity);

            } catch (error) {
                console.error("Erreur lors de la récupération de l'activité :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [id]);



    useEffect(() => {
        if (activity?.id) fetchSimilarActivities();
    }, [activity, i18n.language]);

    const fetchSimilarActivities = async () => {
        try {
            const params = {
                activiteId: activity.id,
                authorId: activity.authorId,
                limit: 3,
                status: "PUBLISHED"
            };
            const { activities } = await activityService.getAll(params);
            setSimilarActivities(activities.filter(item => item.id !== activity.id) || []);

        } catch (error) {
            console.error("Erreur lors de la récupération des actualités similaires :", error);
        }
    };



    const formatDate = (d) =>
        new Date(d).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });


    // 


    if (loading) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>{t("activitesDetails.loading")}</p>
                </div>
            </>
        );
    }

    if (!activity) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>{t("activitesDetails.notFound")}</p>
                </div>
            </>
        );
    }

    const title = i18n.language === 'fr' ? (activity.title_fr || activity.title_en) : (activity.title_en || activity.title_fr);
    const descriptionHtml = i18n.language === 'fr'
        ? (activity.description_fr || activity.description_en || '')
        : (activity.description_en || activity.description_fr || '');

    return (
        <>
            <Navbar navClass="nav-light" />


            <HeaderBreakdumb
                title={title}
                description={t("activitesDetails.author", { name: `${activity.author.firstName} ${activity.author.lastName}` })}
                background={activity?.image ? `${import.meta.env.VITE_API_URL_SIMPLE || 'https://back.riafco-oi.org/'}${activity.image}` : background}

            />


            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg
                        className="w-full h-auto scale-[2.0] origin-top"
                        viewBox="0 0 2880 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Contenu */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:col-span-6">
                            <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800">
                                <img
                                    // src={buildImageUrl(activity.image)}
                                    src={activity.image}
                                    className="rounded-md w-full h-64 object-cover mb-6"
                                    alt={title}
                                />

                                <div className="flex items-center mb-4 text-sm text-slate-400">
                                    
                                    <span className="me-4">
                                        {t("actualitesDetails.dateActivity")} : {formatDate(activity.dateActivity)}
                                    </span>
                                </div>
                                
                                <div className="flex items-center mb-4 text-sm text-slate-400">
                                    <span className="me-4">
                                        {t("actualitesDetails.publishedOn", {
                                            date: new Date(activity.createdAt).toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            })
                                        })}
                                    </span>
                                    <span className="me-4">
                                        {t("actualitesDetails.author", { name: `${activity.author.firstName} ${activity.author.lastName}` })}
                                    </span>
                                </div>

                                <div
                                    className="mt-6 prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                                />

                                {images.length > 1 && (
                                    <>
                                        <h3 className="mt-10 mb-3 text-xl font-semibold">
                                            {t('activitesDetails.gallery')}

                                        </h3>
                                        <Gallery images={images} title={title} />
                                    </>
                                )}
                            </div>
                            {/* <BlogComment /> */}

                            {similarActivities.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="text-xl font-semibold mb-6">{t("activitesDetails.similarActivites")}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {similarActivities.map((item) => (
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

                                                        <span className="me-4">
                                                            {t("actualitesDetails.publishedOn", {
                                                                date: new Date(item.createdAt).toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US", {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric"
                                                                })
                                                            })}
                                                        </span>
                                                    </p>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 md:col-span-6">
                            <ActiviteUserDetail
                                className="lg:col-span-4 md:col-span-6"
                                name={`${activity.author.firstName} ${activity.author.lastName}`}
                                profilePic={buildImageUrl(activity.author.profilePic)}
                                authorId={activity.author.id}
                                currentActivitySubject={title}
                                activiteId={id}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter (réutilise les clés existantes) */}
            <div className="container relative md:mt-24 mt-16">
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

            <Footer />
        </>
    );
}
