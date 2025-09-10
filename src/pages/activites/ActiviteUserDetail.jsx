/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';
import activityService from '../../services/activityService';

export default function ActiviteUserDetail({ className, client, name, profilePic, authorId, currentActivitySubject, activiteId }) {

    const [similarActivities, setSimilarActivities] = useState([]);

    useEffect(() => {
        const fetchSimilarActivities = async () => {
            const params = {
                authorId: authorId,
                subject: currentActivitySubject,
                activiteId: activiteId,
                limit : 3
            }
            try {
                const activities = await activityService.
                    getSimilaireActivite(params);
                console.log(activities)
                setSimilarActivities(activities);
            } catch (error) {
                console.error("Erreur lors de la récupération des activités similaires :", error);
            }
        };

        if (authorId && currentActivitySubject) {
            fetchSimilarActivities();
        }
    }, [authorId, currentActivitySubject]);


    return (
        <div className={className}>
            <div className="sticky top-20">
                {/* Section Auteur */}
                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center">
                    Auteur
                </h5>
                <div className="text-center mt-8">
                    <img
                        src={profilePic || "/profiles/default-profile.png"}
                        className="size-24 mx-auto rounded-full shadow-sm mb-4"
                        alt={name || "Auteur"}
                    />
                    <Link className="text-lg font-semibold hover:text-indigo-600 transition-all duration-500 ease-in-out">
                        {name || "Administrateur RIAFCO"}
                    </Link>
                    <p className="text-slate-400">Membre du RIAFCO</p>
                </div>

                {/* Section Activités Similaires */}
                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center mt-8">
                    Activités Similaires
                </h5>
                <div className="mt-4 space-y-4">
                    {similarActivities.length > 0 ? (
                        similarActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center p-3 rounded-md shadow-sm dark:shadow-gray-800">
                                <div className="flex-shrink-0">
                                    <img
                                        src={activity.image || "/activities/default-activity.jpg"}
                                        className="size-16 rounded-md shadow-sm dark:shadow-gray-800"
                                        alt={activity.title_fr}
                                    />
                                </div>
                                <div className="ms-3">
                                    <Link
                                        to={`/activity-detail/${activity.id}`}
                                        className="font-semibold hover:text-indigo-600 block"
                                    >
                                        {activity.title_fr}
                                    </Link>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {new Date(activity.createdAt).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-400 text-center p-4">
                            Aucune activité similaire trouvée.
                        </p>
                    )}
                </div>

                
{/*                 
                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center mt-8">
                    Réseaux Sociaux
                </h5>
                <ul className="list-none text-center mt-8 space-x-1">
                    <li className="inline">
                        <Link
                            to="#"
                            className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600"
                        >
                            <Icon.Facebook className="size-4" />
                        </Link>
                    </li>
                    <li className="inline">
                        <Link
                            to="#"
                            className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600"
                        >
                            <Icon.Twitter className="size-4" />
                        </Link>
                    </li>
                    <li className="inline">
                        <Link
                            to="#"
                            className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600"
                        >
                            <Icon.Linkedin className="size-4" />
                        </Link>
                    </li>
                    <li className="inline">
                        <Link
                            to="#"
                            className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-indigo-600 hover:text-white hover:bg-indigo-600"
                        >
                            <Icon.Instagram className="size-4" />
                        </Link>
                    </li>
                </ul> */}

                {/* Section Tags */}
                <h5 className="text-lg font-semibold bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center mt-8">
                    Mots-Clés
                </h5>
                <ul className="list-none text-center mt-8">
                    <li className="inline-block m-2">
                        <Link
                            to="#"
                            className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow-sm dark:shadow-gray-800 transition-all duration-500 ease-in-out"
                        >
                            IFCL
                        </Link>
                    </li>
                    <li className="inline-block m-2">
                        <Link
                            to="#"
                            className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow-sm dark:shadow-gray-800 transition-all duration-500 ease-in-out"
                        >
                            Décentralisation
                        </Link>
                    </li>
                    <li className="inline-block m-2">
                        <Link
                            to="#"
                            className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow-sm dark:shadow-gray-800 transition-all duration-500 ease-in-out"
                        >
                            Financement Local
                        </Link>
                    </li>
                    <li className="inline-block m-2">
                        <Link
                            to="#"
                            className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow-sm dark:shadow-gray-800 transition-all duration-500 ease-in-out"
                        >
                            Afrique
                        </Link>
                    </li>
                    <li className="inline-block m-2">
                        <Link
                            to="#"
                            className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-50 dark:bg-slate-800 text-sm hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-md shadow-sm dark:shadow-gray-800 transition-all duration-500 ease-in-out"
                        >
                            Développement Durable
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
