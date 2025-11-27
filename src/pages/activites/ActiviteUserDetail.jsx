// /* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';
// import * as Icon from 'react-feather';
// import { useEffect, useState } from 'react';
// import activityService from '../../services/activityService';

// export default function ActiviteUserDetail({ className, client, name, profilePic, authorId, currentActivitySubject, activiteId }) {

//     const [similarActivities, setSimilarActivities] = useState([]);

//     useEffect(() => {
//         const fetchSimilarActivities = async () => {
//             const params = {
//                 authorId: authorId,
//                 subject: currentActivitySubject,
//                 activiteId: activiteId,
//                 limit : 3
//             }
//             try {
//                 const activities = await activityService.
//                     getSimilaireActivite(params);
//                 console.log(activities)
//                 setSimilarActivities(activities);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des activités similaires :", error);
//             }
//         };

//         if (authorId && currentActivitySubject) {
//             fetchSimilarActivities();
//         }
//     }, [authorId, currentActivitySubject]);


//     return (
//         <div className={className}>
//             <div className="sticky top-20">
//                 {/* Section Auteur */}
//                 <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center">
//                     Auteur
//                 </h5>
//                 <div className="text-center mt-8">
//                     <img
//                         src={profilePic || "/profiles/default-profile.png"}
//                         className="size-24 mx-auto rounded-full shadow-sm mb-4"
//                         alt={name || "Auteur"}
//                     />
//                     <Link className="text-lg font-semibold hover:text-[var(--riafco-orange)]  transition-all duration-500 ease-in-out">
//                         {name || "Administrateur RIAFCO"}
//                     </Link>
//                     <p className="text-slate-400">Membre du RIAFCO</p>
//                 </div>

//                 {/* Section Activités Similaires */}
//                 <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center mt-8">
//                     Activités Similaires
//                 </h5>
//                 <div className="mt-4 space-y-4">
//                     {similarActivities.length > 0 ? (
//                         similarActivities.map((activity) => (
//                             <div key={activity.id} className="flex items-center p-3 rounded-md shadow-sm dark:shadow-gray-800">
//                                 <div className="flex-shrink-0">
//                                     <img
//                                         src={activity.image || "/activities/default-activity.jpg"}
//                                         className="size-16 rounded-md shadow-sm dark:shadow-gray-800"
//                                         alt={activity.title_fr}
//                                     />
//                                 </div>
//                                 <div className="ms-3">
//                                     <Link
//                                         to={`/activity-detail/${activity.id}`}
//                                         className="font-semibold hover:text-[var(--riafco-orange)]  block"
//                                     >
//                                         {activity.title_fr}
//                                     </Link>
//                                     <p className="text-sm text-slate-400 mt-1">
//                                         {new Date(activity.createdAt).toLocaleDateString('fr-FR', {
//                                             day: 'numeric',
//                                             month: 'short',
//                                             year: 'numeric'
//                                         })}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-slate-400 text-center p-4">
//                             Aucune activité similaire trouvée.
//                         </p>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// }

// ActiviteUserDetail.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import activityService from '../../services/activityService';
import { buildImageUrl } from '../../utils/imageUtils';

export default function ActiviteUserDetail({
    className,
    name,
    profilePic,
    authorId,
    currentActivitySubject,
    activiteId
}) {
    const [similarActivities, setSimilarActivities] = useState([]);

    useEffect(() => {
        const fetchSimilarActivities = async () => {
            try {
                const params = {
                    authorId,
                    activiteId,    // exclure l'actuelle côté backend
                    limit: 3,
                    status: "PUBLISHED",
                };
                const { activities } = await activityService.getAll(params);
                console.log(activities);

                setSimilarActivities(activities.filter(item => item.id !== activiteId) || []);
            } catch (error) {
                console.error("Erreur lors de la récupération des activités similaires :", error);
            }
        };

        if (authorId && activiteId) {
            fetchSimilarActivities();
        }
    }, [authorId, activiteId]);


    return (
        <div className={className}>
            <div className="sticky top-20">
                {/* Auteur */}
                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center">
                    Auteur
                </h5>
                <div className="text-center mt-8">
                    <img
                        src={profilePic ? buildImageUrl(profilePic) : "/profiles/default-profile.png"}
                        className="size-24 mx-auto rounded-full shadow-sm mb-4"
                        alt={name || "Auteur"}
                    />
                    <span className="text-lg font-semibold">{name || "Administrateur RIAFCO"}</span>
                    <p className="text-slate-400">Membre du RIAFCO</p>
                </div>

                {/* Similaires */}
                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center mt-8">
                    Activités Similaires
                </h5>
                <div className="mt-4 space-y-4">
                    {similarActivities.length > 0 ? (
                        similarActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center p-3 rounded-md shadow-sm dark:shadow-gray-800">
                                <img
                                    src={activity.image ? buildImageUrl(activity.image) : "/activities/default-activity.jpg"}
                                    className="size-16 rounded-md shadow-sm dark:shadow-gray-800 object-cover"
                                    alt={activity.title_fr || activity.title_en}
                                />
                                <div className="ms-3">
                                    <Link
                                        to={`/actualités/${activity.id}/détails`}
                                        className="font-semibold hover:text-[var(--riafco-orange)] block"
                                    >
                                        {activity.title_fr || activity.title_en}
                                    </Link>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {new Date(activity.publishedAt || activity.createdAt).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                            <p className="text-slate-400 text-center p-4">Aucune activité similaire trouvée.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
