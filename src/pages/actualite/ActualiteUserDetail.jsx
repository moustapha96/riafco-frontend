
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import newsService from '../../services/newsService';
import { buildImageUrl } from '../../utils/imageUtils';

export default function ActualiteUserDetail({
    className,
    auteurNom,
    auteurPhoto,
    auteurId,
    sujetActuel,
    actualiteId
}) {
    const { i18n } = useTranslation();
    const isFr = (i18n.language || 'fr').toLowerCase().startsWith('fr');
    const [actualitesSimilaires, setActualitesSimilaires] = useState([]);
    const [chargement, setChargement] = useState(false);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        const recupererActualitesSimilaires = async () => {
            if (!auteurId || !sujetActuel) return;

            setChargement(true);
            setErreur(null);

            try {
                const params = {
                    authorId: auteurId,
                    search: sujetActuel,
                    limit: 3,
                    excludeId: actualiteId // Pour exclure l'actualité actuelle
                };

                const response = await newsService.getAll(params);
                setActualitesSimilaires(response.news);
            } catch (error) {
                console.error("Erreur lors de la récupération des actualités similaires:", error);
                setErreur("Impossible de charger les actualités similaires");
            } finally {
                setChargement(false);
            }
        };

        recupererActualitesSimilaires();
    }, [auteurId, sujetActuel, actualiteId]);

    return (
        <div className={className}>
            <div className="sticky top-20">
                {/* Section Auteur */}
                <div className="bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-4 mb-6">
                    <h5 className="text-lg font-semibold text-center mb-4">Auteur</h5>
                    <div className="text-center">
                        <img
                            src={auteurPhoto ? buildImageUrl(auteurPhoto) : "/profiles/default-profile.png"}
                            className="size-24 mx-auto rounded-full shadow-sm mb-4"
                            alt={auteurNom || "Auteur"}
                        />
                        <Link
                            to="#"
                            className="text-lg font-semibold hover:text-[var(--riafco-orange)]  transition-all duration-500 ease-in-out block"
                        >
                            {auteurNom || "Administrateur RIAFCO"}
                        </Link>
                        <p className="text-slate-400 mt-1">Membre du RIAFCO</p>
                    </div>
                </div>

                {/* Section Actualités Similaires */}
                <div className="bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-4">
                    <h5 className="text-lg font-semibold text-center mb-4">Actualités Similaires</h5>

                    {chargement ? (
                        <div className="text-center py-4">
                            <p className="text-slate-400">Chargement des actualités...</p>
                        </div>
                    ) : erreur ? (
                        <div className="text-center py-4">
                            <p className="text-red-500">{erreur}</p>
                        </div>
                    ) : actualitesSimilaires.length > 0 ? (
                        <div className="space-y-4">
                            {actualitesSimilaires.map((actualite) => (
                                <div
                                    key={actualite.id}
                                    className="flex p-3 rounded-md shadow-sm dark:shadow-gray-800 bg-white dark:bg-slate-900"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={actualite.image ? buildImageUrl(actualite.image) : "/news/default-news.jpg"}
                                            className="size-16 rounded-md shadow-sm dark:shadow-gray-800 object-cover"
                                            alt={isFr ? (actualite.title_fr || actualite.title_en) : (actualite.title_en || actualite.title_fr)}
                                        />
                                    </div>
                                    <div className="ms-3 flex-grow">
                                        <Link
                                            to={`/actualités/${actualite.id}/détails`}
                                            className="font-semibold hover:text-[var(--riafco-orange)]  block"
                                        >
                                            {isFr ? (actualite.title_fr || actualite.title_en) : (actualite.title_en || actualite.title_fr)}
                                        </Link>
                                        <p className="text-sm text-slate-400 mt-1">
                                            {new Date(actualite.publishedAt ?? actualite.updatedAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-slate-400">Aucune actualité similaire trouvée</p>
                        </div>
                    )}
                </div>

                {/* Section Mots-Clés */}
                <div className="bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-4 mt-6">
                    <h5 className="text-lg font-semibold text-center mb-4">Mots-Clés</h5>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            'RIAFCO', 'IFCL', 'Décentralisation',
                            'Financement Local', 'Afrique',
                            'Développement Durable', 'Coopération'
                        ].map((motCle) => (
                            <Link
                                key={motCle}
                                to="#"
                                className="px-3 py-1 text-slate-400 hover:text-white dark:hover:text-white bg-gray-100 dark:bg-slate-700 text-sm hover:bg-[var(--riafco-blue)] dark:hover:bg-[var(--riafco-blue)] rounded-md shadow-sm dark:shadow-gray-800 transition-all duration-300 ease-in-out"
                            >
                                {motCle}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
