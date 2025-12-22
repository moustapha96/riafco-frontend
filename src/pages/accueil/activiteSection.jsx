/* eslint-disable react/prop-types */


// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from "react-icons/fa";
// import { activityService } from '../../services/activityService';

// export default function ActiviteSection(props) {
//     const [activities, setActivities] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchActivities = async () => {
//             try {
//                 const response = await activityService.getAll({ limit: 3 });
//                 // console.log(response)
//                 if (response.activities) {
//                     setActivities(response.activities.filter(activity => activity.status === "PUBLISHED"));
//                 }
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des activités :", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchActivities();
//     }, []);

//     if (loading) {
//         return <div className={props.className}>Chargement des activités...</div>;
//     }

//     return (
//         <div className={props.className}>
//             <div className="grid md:grid-cols-12 grid-cols-1 items-center wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
//                 <div className="md:col-span-6">
//                     <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">Activités RIAFCO</h6>
                   
//                     <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
//                         Découvrez nos <span className="text-[--riafco-blue]">dernières activités</span> <br />
//                         et projets en Afrique
//                     </h3>
//                 </div>
//                 <div className="md:col-span-6">
//                     <p className="text-slate-600 max-w-xl">
//                         Suivez les initiatives, événements et ressources partagées par RIAFCO pour un développement durable en Afrique.
//                     </p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
//                 {activities.length > 0 ? (
//                     activities.map((activity, index) => (
//                         <div
//                             key={activity.id}
//                             className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden wow animate__animated animate__fadeInUp"
//                             data-wow-delay={index * 0.1 + "s"}
//                         >
//                             {activity.image && (
//                                 <img
//                                     src={activity.image}
//                                     alt={activity.title_fr || "Activité RIAFCO"}
//                                     className="w-full h-48 object-cover"
//                                 />
//                             )}
//                             <div className="content p-6">
//                                 <div className="flex items-center mb-3">
//                                     {activity.author?.profilePic && (
//                                         <img
//                                             src={activity.author.profilePic}
//                                             alt={activity.author.firstName}
//                                             className="size-8 rounded-full mr-2"
//                                         />
//                                     )}
//                                     <span className="text-sm text-slate-600">
//                                         {activity.author?.firstName} {activity.author?.lastName} • {activity.formattedPublishedAt}
//                                     </span>
//                                 </div>
//                                 <Link
//                                     to={`/activitiés/${activity.id}/détails`}
//                                     className="title h5 text-lg font-medium hover:text-[--riafco-blue] duration-500 ease-in-out block mb-2"
//                                 >
//                                     {activity.title_fr || activity.title_en || "Activité RIAFCO"}
//                                 </Link>
//                                 <p className="text-slate-600 mt-3">
//                                     {activity.contentPreview_fr || activity.contentPreview_en || "Découvrez les détails de cette activité..."}
//                                 </p>
//                                 <div className="mt-4">
//                                     <Link
//                                         to={`/activités/${activity.id}/détails`}
//                                         className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none
//                     after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto
//                     after:bottom-0 after:start-0 after:duration-500 hover:text-[--riafco-blue] after:bg-[--riafco-blue] duration-500"
//                                     >
//                                         Lire la suite <FaArrowRight className="ms-2 text-[10px]" />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-slate-600 col-span-full text-center py-8">
//                         Aucune activité publiée pour le moment.
//                     </p>
//                 )}
//             </div>

//             {activities.length > 0 && (
//                 <div className="mt-10 text-center">
//                     <Link
//                         to="/activités"
//                         className="py-2 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
//             bg-[--riafco-blue] hover:bg-[--riafco-blue-hover] border-[--riafco-blue] hover:border-[--riafco-blue-hover]
//             text-white rounded-md"
//                     >
//                         Voir toutes les activités <FaArrowRight className="ms-2 text-[10px]" />
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { activityService } from '../../services/activityService';
import { useTranslation } from 'react-i18next';
import { buildImageUrl } from '../../utils/imageUtils';

export default function ActiviteSection(props) {
    const { t } = useTranslation();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await activityService.getAll({ limit: 3 });
                console.log(response);
                if (response.activities) {
                    setActivities(response.activities.filter(a => a.status === "PUBLISHED"));
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des activités :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (loading) {
        return <div className={props.className}>{t('activitySection.loading')}</div>;
    }

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className={props.className}>
            <div
                className="grid md:grid-cols-12 grid-cols-1 items-center wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
            >
                <div className="md:col-span-6">
                    <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">
                        {t('activitySection.label')}
                    </h6>

                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                        {t('activitySection.title.pre')}{" "}
                        <span className="text-[var(--riafco-blue)]">
                            {t('activitySection.title.highlight')}
                        </span>{" "}
                        {t('activitySection.title.post')}
                    </h3>
                </div>

                <div className="md:col-span-6">
                    <p className="text-slate-600 max-w-xl">
                        {t('activitySection.description')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
                {activities.length > 0 ? (
                    activities.map((activity, index) => {
                        const author =
                            [activity.author?.firstName, activity.author?.lastName]
                                .filter(Boolean)
                                .join(' ');
                        const date =
                            activity.formattedPublishedAt ||
                            (activity.publishedAt ? formatDate(activity.publishedAt) : '');

                        const imageUrl = activity.image ? buildImageUrl(activity.image) : DEFAULT_IMAGE_URL;

                        return (
                            <div
                                key={activity.id}
                                className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden wow animate__animated animate__fadeInUp"
                                data-wow-delay={`${index * 0.1}s`}
                            >
                                {activity.image && (
                                    <img
                                        src={activity.image ? buildImageUrl(activity.image) : DEFAULT_IMAGE_URL}
                                        alt={activity.title_fr || t('activitySection.fallbackTitle')}
                                        className="w-full h-48 object-cover"
                                    />
                                )}

                                <div className="content p-6">
                                    
                                   

                                    <Link
                                        to={`/activités/${activity.id}/détails`}
                                        className="title h5 text-lg font-medium hover:text-[var(--riafco-blue)] duration-500 ease-in-out block mb-2"
                                    >
                                        {activity.title_fr || activity.title_en || t('activitySection.fallbackTitle')}
                                    </Link>

                                    <p className="text-slate-600 mt-3">
                                        {activity.contentPreview_fr ||
                                            activity.contentPreview_en ||
                                            t('activitySection.fallbackExcerpt')}
                                    </p>
                                    
                                    <span className="me-2  text-sm text-slate-400">
                                        {t("actualites.newsSection.publishedAt")}
                                        <span>{formatDate(activity.createdAt)}</span>
                                    </span>
                                  
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        {activity.author?.profilePic && (
                                            <img
                                                src={buildImageUrl(activity.author.profilePic)}
                                                alt={`${activity.author?.firstName || ""} ${activity.author?.lastName || ""}`.trim() || "author"}
                                                className="size-8 rounded-full mr-2"
                                            />
                                        )}
                                        {(activity.author?.firstName || activity.author?.lastName) && (
                                            <span className="text-sm text-slate-400">
                                                {activity.author?.firstName} {activity.author?.lastName}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <Link
                                            to={`/activités/${activity.id}/détails`}
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
                    })
                ) : (
                    <p className="text-slate-600 col-span-full text-center py-8">
                        {t('activitySection.none')}
                    </p>
                )}
            </div>

            {activities.length > 0 && (
                <div className="mt-10 text-center">
                    <Link
                        to="/activités"
                        className="py-2 ant-btn-primary  px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
                       text-white rounded-md"
                    >
                        {t('activitySection.seeAll')} <FaArrowRight className="ms-2 text-[10px]" />
                    </Link>
                </div>
            )}
        </div>
    );
}
