

import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaUsers, FaHandshake, FaGlobeAfrica, FaChartLine, FaFileAlt, FaMapMarkedAlt, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import organizationService from '../../services/organizationService';
import { Chrono } from 'react-chrono';

import ReactModal from 'react-modal';

export default function HistoriquePage() {
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedYears, setExpandedYears] = useState({});
    const [activeYear, setActiveYear] = useState(null);
    const [stats, setStats] = useState({
        totalEvents: 0,
        yearsCount: 0,
        countriesCount: 0,
        programsCount: 0
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const timelineRef = useRef(null);

    // Configuration du modal
    ReactModal.setAppElement('#root');

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await organizationService.getHistory();

            // Trier les événements par date (du plus ancien au plus récent)
            const sortedHistory = response.data
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(item => ({
                    ...item,
                    formattedDate: formatDate(item.date),
                    year: new Date(item.date).getFullYear()
                }));

            setHistoryItems(sortedHistory);
            calculateStats(sortedHistory);

            // Initialiser les années expandables
            const years = [...new Set(sortedHistory.map(item => item.year))];
            const initialExpanded = {};
            years.forEach(year => {
                initialExpanded[year] = years.length <= 3;
            });
            setExpandedYears(initialExpanded);

            // Définir l'année active (la plus récente)
            if (years.length > 0) {
                setActiveYear(Math.max(...years));
            }

        } catch (error) {
            console.error("Erreur lors de la récupération de l'historique:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (items) => {
        const years = [...new Set(items.map(item => item.year))];
        const programs = items.filter(item =>
            item.title.toLowerCase().includes("programme") ||
            item.description.toLowerCase().includes("programme")
        );

        // Compter les pays mentionnés (simplifié)
        const countryKeywords = ['cameroun', 'mali', 'madagascar', 'niger', 'sénégal', 'benin', 'burundi', 'gabon', 'côte d\'ivoire', 'togo', 'guinée', 'rdc', 'maroc', 'tunisie', 'algérie'];
        const countries = [...new Set(items
            .flatMap(item => {
                const desc = item.description.toLowerCase();
                return countryKeywords.filter(keyword => desc.includes(keyword));
            })
        )];

        setStats({
            totalEvents: items.length,
            yearsCount: years.length,
            countriesCount: countries.length,
            programsCount: programs.length
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            month: 'long',
            year: 'numeric'
        });
    };

    const groupByYear = () => {
        const grouped = {};
        historyItems.forEach(item => {
            if (!grouped[item.year]) {
                grouped[item.year] = [];
            }
            grouped[item.year].push(item);
        });
        return Object.entries(grouped).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    };

    const toggleYear = (year) => {
        setExpandedYears(prev => ({
            ...prev,
            [year]: !prev[year]
        }));
    };

    const scrollToYear = (year) => {
        setActiveYear(year);
        const yearElement = document.getElementById(`year-${year}`);
        if (yearElement) {
            yearElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const getYearDescription = (year) => {
        const yearEvents = historyItems.filter(item => item.year === year);
        if (yearEvents.length === 0) return `Événements de ${year}`;

        const keywords = yearEvents.flatMap(event => {
            const title = event.title.toLowerCase();
            const desc = event.description.toLowerCase();

            const found = [];
            if (title.includes("atelier") || desc.includes("atelier")) found.push("ateliers");
            if (title.includes("programme") || desc.includes("programme")) found.push("programmes");
            if (title.includes("reconnaissance") || desc.includes("reconnaissance")) found.push("reconnaissance");
            if (title.includes("lancement") || desc.includes("lancement")) found.push("lancements");
            if (title.includes("étude") || desc.includes("étude")) found.push("études");
            if (title.includes("conférence") || desc.includes("conférence")) found.push("conférences");
            if (title.includes("sommet") || desc.includes("sommet")) found.push("sommets");
            return found;
        });

        const uniqueKeywords = [...new Set(keywords)];

        if (uniqueKeywords.length > 0) {
            return `Année des ${uniqueKeywords.join(", ")}`;
        }

        return `Événements de ${year}`;
    };

    const getHighlightEvents = () => {
        const highlightKeywords = [
            "reconnaissance", "lancement", "atelier", "programme",
            "étude", "conférence", "sommet", "partenariat", "création",
            "implantation", "développement", "renforcement"
        ];

        return historyItems
            .filter(item =>
                highlightKeywords.some(keyword =>
                    item.title.toLowerCase().includes(keyword) ||
                    item.description.toLowerCase().includes(keyword)
                )
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Du plus récent au plus ancien
            .slice(0, 6);
    };

    const openModal = (event) => {
        setSelectedEvent(event);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEvent(null);
    };

    const timelineYears = groupByYear();

    // Préparation des données pour react-chrono (mobile)
    const chronoItems = historyItems.map(item => ({
        title: item.formattedDate,
        cardTitle: item.title,
        cardDetailedText: item.description,
        media: {
            type: "IMAGE",
            source: {
                url: "https://via.placeholder.com/300x200/4a6fa1/ffffff?text=RIAFCO"
            }
        }
    }));

    return (
        <>
            <Navbar />

            {/* Section Hero */}
            <section className="md:h-screen py-36 h-auto relative flex items-center background-effect overflow-hidden">
                <div className="absolute inset-0 jarallax bg-fixed" style={{ backgroundImage: `url(${riafcoAbout})` }}></div>
                <div className="absolute inset-0 bg-[var(--riafco-blue)]/70"></div>
                <div className="container relative z-1">
                    <div className="grid grid-cols-1 mt-5">
                        <div className="title-heading text-center">
                            <h1 className="lg:text-5xl text-3xl font-bold text-white mb-4">
                                L'historique du RIAFCO
                            </h1>
                            <p className="text-white/90 max-w-2xl mx-auto text-lg">
                                Découvrez le parcours du Réseau des Institutions Africaines de Financement des Collectivités Locales
                                depuis sa création jusqu'à aujourd'hui
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            {/* Section Timeline Dynamique */}
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">NOTRE PARCOURS</h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            Chronologie du RIAFCO
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Depuis sa création, le RIAFCO a marqué l'histoire du financement des collectivités locales en Afrique
                            à travers des initiatives majeures et des partenariats stratégiques.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--riafco-blue)]"></div>
                        </div>
                    ) : (
                        <>
                            {/* Timeline principale */}
                            <div className="space-y-12" ref={timelineRef}>
                                {timelineYears.map(([year, events]) => (
                                    <div
                                        key={year}
                                        id={`year-${year}`}
                                        className={`relative transition-all duration-300 ${activeYear === parseInt(year) ? 'ring-2 ring-[var(--riafco-blue)]/30 rounded-lg' : ''
                                            }`}
                                    >
                                        {/* En-tête de l'année */}
                                        <div
                                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm cursor-pointer"
                                            onClick={() => toggleYear(parseInt(year))}
                                        >
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full bg-[var(--riafco-blue)] flex items-center justify-center
                                                border-2 border-white dark:border-slate-900 shadow-md mr-4">
                                                    <span className="text-white font-bold">{year}</span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-[var(--riafco-blue)]">
                                                    {getYearDescription(parseInt(year))}
                                                </h3>
                                            </div>
                                            <div className="text-[var(--riafco-orange)]">
                                                {expandedYears[year] ? <FaChevronUp /> : <FaChevronDown />}
                                            </div>
                                        </div>

                                        {/* Événements de l'année */}
                                        <div className={`grid grid-cols-1 gap-6 mt-4 transition-all duration-300 ${expandedYears[year] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                            }`}>
                                            {events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="relative p-6 rounded-lg shadow-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800"
                                                >
                                                    <div className="flex items-start mb-4">
                                                        <FaCalendarAlt className="text-[var(--riafco-orange)] text-lg mt-1 mr-3 flex-shrink-0" />
                                                        <div>
                                                            <h4 className="font-semibold text-lg text-[var(--riafco-blue)]">
                                                                {event.formattedDate}
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                                                        {event.title}
                                                    </h3>

                                                    <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400"
                                                        dangerouslySetInnerHTML={{ __html: event.description }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                </div>

                                {/* Version mobile avec react-chrono */}
                                <div className="block md:hidden mt-12">
                                    {historyItems.length > 0 && (
                                        <div className="h-[600px]">
                                            <Chrono
                                                items={chronoItems}
                                                mode="VERTICAL_ALTERNATING"
                                                cardHeight={200}
                                                theme={{
                                                    primary: 'var(--riafco-blue)',
                                                    secondary: 'var(--riafco-orange)',
                                                    titleColor: 'var(--riafco-blue)'
                                                }}
                                                fontSizes={{
                                                    title: '1rem',
                                                    cardTitle: '1.2rem',
                                                    cardSubtitle: '0.9rem',
                                                    cardDetailedText: '0.9rem'
                                                }}
                                                slideShow
                                                slideItemDuration={4000}
                                                scrollable={{ scrollbar: false }}
                                            >
                                                <div className="chrono-icons">
                                                    {historyItems.map((_, index) => (
                                                        <FaCalendarAlt key={index} className="text-[var(--riafco-orange)]" />
                                                    ))}
                                                </div>
                                            </Chrono>
                                        </div>
                                    )}
                                </div>
                        </>
                    )}
                </div>
            </section>

            {/* Section Chiffres Clés Dynamiques */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">CHIFFRES CLÉS</h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            Notre impact en chiffres
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {[
                            {
                                icon: <FaCalendarAlt className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.totalEvents,
                                title: "Événements historiques",
                                desc: "enregistrés dans notre base"
                            },
                            {
                                icon: <FaUsers className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.yearsCount,
                                title: "Années d'activité",
                                desc: "de développement continu"
                            },
                            {
                                icon: <FaGlobeAfrica className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.countriesCount,
                                title: "Pays concernés",
                                desc: "mentionnés dans nos activités"
                            },
                            {
                                icon: <FaHandshake className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.programsCount,
                                title: "Programmes lancés",
                                desc: "et initiatives stratégiques"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md text-center">
                                <div className="mb-4">{item.icon}</div>
                                <div className="text-3xl font-bold text-[var(--riafco-blue)] mb-2">{item.number}</div>
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Événements Marquants avec Popup */}
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">ÉVÉNEMENTS MARQUANTS</h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            Moments clés de notre histoire
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Ces événements ont marqué l'évolution du RIAFCO et renforcé son impact sur le continent africain.
                            Cliquez sur un événement pour plus de détails.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getHighlightEvents().map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                <div className="mb-4 flex justify-center">
                                    {index % 3 === 0 ? <FaFileAlt className="text-3xl text-[var(--riafco-orange)]" /> :
                                        index % 3 === 1 ? <FaHandshake className="text-3xl text-[var(--riafco-orange)]" /> :
                                            <FaMapMarkedAlt className="text-3xl text-[var(--riafco-orange)]" />}
                                </div>
                                <div className="text-[var(--riafco-blue)] font-bold text-center mb-2">
                                    {item.year}
                                </div>
                                <h4 className="font-semibold text-lg mb-2 text-center">
                                    {item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 text-center">
                                    {item.description.length > 120 ? item.description.substring(0, 120) + "..." : item.description}
                                </p>
                                <div className="mt-4 text-center">
                                    <button
                                        className="text-[var(--riafco-orange)] font-medium hover:underline flex items-center justify-center mx-auto"
                                    >
                                        Voir les détails <FaExternalLinkAlt className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal pour les détails des événements */}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content max-w-3xl w-[90%] mx-auto my-8 p-0 rounded-lg overflow-hidden shadow-xl bg-white dark:bg-slate-800"
                overlayClassName="modal-overlay fixed inset-0 bg-black/70 z-50"
            >
                {selectedEvent && (
                    <>
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--riafco-blue)] mb-2">
                                        {selectedEvent.title}
                                    </h2>
                                    <div className="flex items-center text-[var(--riafco-orange)] mb-4">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{selectedEvent.formattedDate} • Année {selectedEvent.year}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 dark:text-gray-300 hover:text-red-500 transition-colors"
                                    aria-label="Fermer"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
                                dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />

                            {selectedEvent.description.includes("programme") && (
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h3 className="font-semibold text-[var(--riafco-blue)] mb-2">Contexte du programme</h3>
                                    <p className="text-sm">
                                        Ce programme s'inscrit dans le cadre des efforts du RIAFCO pour renforcer les capacités
                                        des institutions de financement local en Afrique et promouvoir un développement durable.
                                    </p>
                                </div>
                            )}

                            <div className="mt-6">
                                <Link
                                    to={`#year-${selectedEvent.year}`}
                                    onClick={() => {
                                        scrollToYear(selectedEvent.year);
                                        closeModal();
                                    }}
                                    className="inline-flex items-center px-4 py-2 bg-[var(--riafco-blue)] text-white rounded-lg hover:bg-[var(--riafco-blue-hover)] transition-colors"
                                >
                                    Voir dans le timeline
                                    <FaCalendarAlt className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </ReactModal>

           <Footer />
        </>
    );
}
