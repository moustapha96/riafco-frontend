import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaPlay, FaTimes, FaHandshake, FaNetworkWired, FaGlobeAfrica } from 'react-icons/fa';

export default function Cta() {
    const [isOpen, setOpen] = useState(false);

    return (
        <section className="py-20 w-full table relative bg-[url('../../assets/images/riafco-team.jpg')] bg-center bg-no-repeat bg-cover">
            <div className="absolute inset-0 bg-[var(--riafco-blue)]/80"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 text-center">
                    <h3 className="mb-4 md:text-3xl text-2xl text-white dark:text-white font-medium">
                        Rejoignez le réseau panafricain des institutions de financement local
                    </h3>
                    <p className="text-white/90 max-w-2xl mx-auto">
                        Ensemble, renforçons les capacités de financement des collectivités locales en Afrique
                        pour un développement durable et inclusif.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="py-3 px-6 bg-[var(--riafco-orange)] hover:bg-[var(--riafco-orange-hover)] text-white font-medium rounded-lg transition-colors duration-300"
                        >
                            Contactez Nous
                        </Link>

                        <button
                            onClick={() => setOpen(true)}
                            className="size-16 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center
                                       bg-white/90 dark:bg-slate-900/90 text-[var(--riafco-blue)] hover:text-[var(--riafco-orange)]
                                       mx-auto sm:mx-0 transition-colors duration-300"
                            aria-label="Regarder la vidéo de présentation du RIAFCO"
                        >
                            <FaPlay className="text-2xl" />
                        </button>
                    </div>

                    {/* Section avantages */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {[
                            {
                                icon: <FaNetworkWired className="text-[var(--riafco-orange)] text-2xl" />,
                                title: "Réseau panafricain",
                                desc: "Rejoignez un réseau de plus de 20 institutions dans 15 pays africains"
                            },
                            {
                                icon: <FaHandshake className="text-[var(--riafco-orange)] text-2xl" />,
                                title: "Coopération renforcée",
                                desc: "Échangez avec vos pairs et partagez les bonnes pratiques"
                            },
                            {
                                icon: <FaGlobeAfrica className="text-[var(--riafco-orange)] text-2xl" />,
                                title: "Impact continental",
                                desc: "Contribuez au développement local à l'échelle africaine"
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="mt-1">{item.icon}</div>
                                <div>
                                    <h4 className="text-white font-medium">{item.title}</h4>
                                    <p className="text-white/80 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal vidéo */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                            <div className="relative pb-[56.25%] h-0">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/1vDdmYuGa6c?autoplay=1&rel=0"
                                    title="Présentation du RIAFCO - Réseau des Institutions Africaines de Financement des Collectivités Locales"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 rounded-full p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                                aria-label="Fermer la vidéo"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
