
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    FaCalendarAlt,
    FaChevronDown,
    FaChevronUp,
    FaUsers,
    FaHandshake,
    FaGlobeAfrica,
    FaFileAlt,
    FaMapMarkedAlt,
    FaTimes,
    FaExternalLinkAlt,
    FaChevronRight,
    FaTh,
    FaList,
    FaStream,
    FaClock,
} from "react-icons/fa";
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import organizationService from "../../services/organizationService";
import { Chrono } from "react-chrono";
import ReactModal from "react-modal";
import HeaderBreakdumb from "../components/hearder-breakdumb";
import { useTranslation } from "react-i18next";
import { buildImageUrl } from "../../utils/imageUtils";

export default function HistoriquePage() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === "fr" ? "fr-FR" : "en-US";

    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedYears, setExpandedYears] = useState({});
    const [activeYear, setActiveYear] = useState(null);
    const [displayType, setDisplayType] = useState("timeline"); // "timeline", "cards", "alternate", "chrono"
    const [stats, setStats] = useState({
        totalEvents: 0,
        yearsCount: 0,
        countriesCount: 0,
        programsCount: 0,
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        // Safer in CSR
        if (typeof document !== "undefined") {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            ReactModal.setAppElement("#root");
        }
        fetchHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const normalize = (s) =>
        (s || "")
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const localizeText = (fr, en, fallback = "") =>
        i18n.language === "fr" ? fr ?? en ?? fallback : en ?? fr ?? fallback;

    const formatMonthYear = (dateString) =>
        new Date(dateString).toLocaleDateString(locale, { month: "long", year: "numeric" });

    // Fonction pour extraire la première image de la description HTML
    const extractFirstImage = (htmlString) => {
        if (!htmlString) return null;
        const imgMatch = htmlString.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
        if (imgMatch && imgMatch[1]) {
            return imgMatch[1];
        }
        return null;
    };

    // Fonction pour obtenir l'image d'un événement (image directe ou extraite de la description)
    const getEventImage = (event) => {
        if (event.image) {
            return buildImageUrl(event.image);
        }
        const extractedImage = extractFirstImage(event.description);
        if (extractedImage) {
            // Si l'image est déjà une URL complète, on la retourne telle quelle
            if (extractedImage.startsWith('http://') || extractedImage.startsWith('https://') || extractedImage.startsWith('//')) {
                return extractedImage;
            }
            return buildImageUrl(extractedImage);
        }
        return null;
    };

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await organizationService.getHistory();

            const sorted = (response?.data || [])
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item) => {
                    // Support potentiel *_fr / *_en
                    const title = localizeText(item.title_fr, item.title_en, item.title);
                    const description = localizeText(item.description_fr, item.description_en, item.description);
                    const date = item.date;
                    return {
                        ...item,
                        title,
                        description,
                        formattedDate: formatMonthYear(date),
                        year: new Date(date).getFullYear(),
                    };
                });

            setHistoryItems(sorted);
            calculateStats(sorted);

            const years = [...new Set(sorted.map((i) => i.year))];
            const initialExpanded = {};
            years.forEach((y) => (initialExpanded[y] = years.length <= 3));
            setExpandedYears(initialExpanded);
            if (years.length > 0) setActiveYear(Math.max(...years));
        } catch (e) {
            console.error("Erreur lors de la récupération de l'historique:", e);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (items) => {
        const years = [...new Set(items.map((i) => i.year))];
        const programs = items.filter(
            (i) => normalize(i.title).includes("programme") || normalize(i.description).includes("programme") || normalize(i.title).includes("program")
        );

        // Comptage simplifié des pays mentionnés
        const countryKeywords = [
            "cameroun",
            "mali",
            "madagascar",
            "niger",
            "sénégal",
            "senegal",
            "benin",
            "burundi",
            "gabon",
            "côte d'ivoire",
            "cote d'ivoire",
            "togo",
            "guinée",
            "guinea",
            "rdc",
            "maroc",
            "morocco",
            "tunisie",
            "algerie",
            "algérie",
        ];
        const countries = [
            ...new Set(
                items.flatMap((i) => {
                    const desc = normalize(i.description);
                    return countryKeywords.filter((k) => desc.includes(k));
                })
            ),
        ];

        setStats({
            totalEvents: items.length,
            yearsCount: years.length,
            countriesCount: countries.length,
            programsCount: programs.length,
        });
    };

    const groupByYear = () => {
        const grouped = {};
        historyItems.forEach((i) => {
            if (!grouped[i.year]) grouped[i.year] = [];
            grouped[i.year].push(i);
        });
        // Trier les événements dans chaque année du plus récent au plus ancien
        Object.keys(grouped).forEach(year => {
            grouped[year].sort((a, b) => new Date(b.date) - new Date(a.date));
        });
        return Object.entries(grouped).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
    };

    const toggleYear = (year) => setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));

    const scrollToYear = (year) => {
        setActiveYear(year);
        const el = document.getElementById(`year-${year}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const getYearDescription = (year) => {
        const yearEvents = historyItems.filter((i) => i.year === year);
        if (yearEvents.length === 0) return t("historique.labels.eventsOfYear", { year });

        const kw = [];
        yearEvents.forEach((ev) => {
            const title = normalize(ev.title);
            const desc = normalize(ev.description);
            if (title.includes("atelier") || desc.includes("atelier") || title.includes("workshop") || desc.includes("workshop")) kw.push(i18n.language === "fr" ? "ateliers" : "workshops");
            if (title.includes("programme") || desc.includes("programme") || title.includes("program") || desc.includes("program")) kw.push(i18n.language === "fr" ? "programmes" : "programs");
            if (title.includes("reconnaissance") || desc.includes("reconnaissance") || title.includes("recognition") || desc.includes("recognition")) kw.push(i18n.language === "fr" ? "reconnaissance" : "recognitions");
            if (title.includes("lancement") || desc.includes("lancement") || title.includes("launch") || desc.includes("launch")) kw.push(i18n.language === "fr" ? "lancements" : "launches");
            if (title.includes("étude") || desc.includes("étude") || title.includes("study") || desc.includes("study")) kw.push(i18n.language === "fr" ? "études" : "studies");
            if (title.includes("conférence") || desc.includes("conférence") || title.includes("conference") || desc.includes("conference")) kw.push(i18n.language === "fr" ? "conférences" : "conferences");
            if (title.includes("sommet") || desc.includes("sommet") || title.includes("summit") || desc.includes("summit")) kw.push(i18n.language === "fr" ? "sommets" : "summits");
        });
        const unique = [...new Set(kw)];
        return unique.length > 0
            ? t("historique.labels.yearOf", { keywords: unique.join(", ") })
            : t("historique.labels.eventsOfYear", { year });
    };

    const getHighlightEvents = () => {
        const keywords = [
            "reconnaissance",
            "recognition",
            "lancement",
            "launch",
            "atelier",
            "workshop",
            "programme",
            "program",
            "étude",
            "study",
            "conférence",
            "conference",
            "sommet",
            "summit",
            "partenariat",
            "partnership",
            "création",
            "creation",
            "implantation",
            "développement",
            "development",
            "renforcement",
            "capacity",
        ];
        return historyItems
            .filter((i) => keywords.some((k) => normalize(i.title).includes(normalize(k)) || normalize(i.description).includes(normalize(k))))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
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

    const chronoItems = historyItems.map((i) => {
        const eventImage = getEventImage(i);
        return {
            title: i.formattedDate,
            cardTitle: i.title,
            cardDetailedText: i.description?.replace(/<[^>]*>/g, ""),
            media: {
                type: "IMAGE",
                source: { url: eventImage || "https://riafco-oi.org/logo.png" },
            },
        };
    });

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("historique.header.title")}
                description={t("historique.header.description")}
                // background={riafcoAbout}
            />

            {/* Section Timeline Dynamique */}
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">{t("historique.journey.tag")}</h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            {t("historique.journey.title")}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("historique.journey.desc")}</p>
                    </div>

                    {/* Sélecteur de type d'affichage */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-1 shadow-sm">
                            <button
                                onClick={() => setDisplayType("timeline")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                    displayType === "timeline"
                                        ? "bg-[var(--riafco-blue)] text-white"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                <FaList />
                                {i18n.language === "fr" ? "Timeline" : "Timeline"}
                            </button>
                            <button
                                onClick={() => setDisplayType("cards")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                    displayType === "cards"
                                        ? "bg-[var(--riafco-blue)] text-white"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                <FaTh />
                                {i18n.language === "fr" ? "Cartes" : "Cards"}
                            </button>
                            <button
                                onClick={() => setDisplayType("alternate")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                    displayType === "alternate"
                                        ? "bg-[var(--riafco-blue)] text-white"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                <FaStream />
                                {i18n.language === "fr" ? "Alternée" : "Alternate"}
                            </button>
                            <button
                                onClick={() => setDisplayType("chrono")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                    displayType === "chrono"
                                        ? "bg-[var(--riafco-blue)] text-white"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                <FaClock />
                                {i18n.language === "fr" ? "Chrono" : "Chrono"}
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--riafco-blue)]"></div>
                        </div>
                    ) : (
                        <>
                            {/* Navigation par années - affichée pour timeline et cards */}
                            {(displayType === "timeline" || displayType === "cards") && (
                                <div className="mt-8 overflow-x-auto pb-4">
                                    <div className="flex gap-4 whitespace-nowrap">
                                        {[...new Set(historyItems.map((i) => i.year))]
                                            .sort((a, b) => b - a)
                                            .map((year) => (
                                                <button
                                                    key={year}
                                                    onClick={() => scrollToYear(year)}
                                                    className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[var(--riafco-blue)] hover:text-white transition-colors"
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                                {/* Timeline principale - affichée uniquement si displayType === "timeline" */}
                                {displayType === "timeline" && (
                                <div className="space-y-12" ref={timelineRef}>
                                    {timelineYears.map(([year, events]) => (
                                        <div
                                            key={year}
                                            id={`year-${year}`}
                                            className={`relative transition-all duration-300 ${activeYear === parseInt(year) ? "ring-2 ring-[var(--riafco-blue)]/30 rounded-lg" : ""
                                                }`}
                                        >
                                            {/* En-tête année */}
                                            <div
                                                className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm cursor-pointer"
                                                onClick={() => toggleYear(parseInt(year))}
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full bg-[var(--riafco-blue)] flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md mr-4">
                                                        <span className="text-white font-bold">{year}</span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-[var(--riafco-blue)]">{getYearDescription(parseInt(year))}</h3>
                                                </div>
                                                <div className="text-[var(--riafco-orange)]">{expandedYears[year] ? <FaChevronUp /> : <FaChevronDown />}</div>
                                            </div>

                                            {/* Événements de l'année */}
                                            <div
                                                className={`grid grid-cols-1 gap-6 mt-4 transition-all duration-300 ${expandedYears[year] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                                                    }`}
                                            >
                                                {events.map((event) => {
                                                    const eventImage = getEventImage(event);
                                                    return (
                                                        <div
                                                            key={event.id}
                                                            className="relative p-6 rounded-lg shadow-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800"
                                                        >
                                                            {eventImage && (
                                                                <div className="mb-4">
                                                                    <img
                                                                        src={eventImage}
                                                                        alt={event.title}
                                                                        className="w-full h-48 object-cover rounded-lg"
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex items-start mb-4">
                                                                <FaCalendarAlt className="text-[var(--riafco-orange)] text-lg mt-1 mr-3 flex-shrink-0" />
                                                                <div>
                                                                    <h4 className="font-semibold text-lg text-[var(--riafco-blue)]">{event.formattedDate}</h4>
                                                                </div>
                                                            </div>

                                                            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">{event.title}</h3>

                                                            <div
                                                                className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400"
                                                                dangerouslySetInnerHTML={{ __html: event.description }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}

                                {/* Version Chrono - affichée uniquement si displayType === "chrono" */}
                                {displayType === "chrono" && (
                                <div className="mt-12">
                                    {historyItems.length > 0 && (
                                        <div className="h-[600px]">
                                            <Chrono
                                                items={chronoItems}
                                                mode="VERTICAL_ALTERNATING"
                                                cardHeight={200}
                                                theme={{
                                                    primary: "var(--riafco-blue)",
                                                    secondary: "var(--riafco-orange)",
                                                    titleColor: "var(--riafco-blue)",
                                                }}
                                                fontSizes={{ title: "1rem", cardTitle: "1.2rem", cardSubtitle: "0.9rem", cardDetailedText: "0.9rem" }}
                                                slideShow
                                                slideItemDuration={4000}
                                                scrollable={{ scrollbar: false }}
                                            >
                                                <div className="chrono-icons">
                                                    {historyItems.map((_, idx) => (
                                                        <FaCalendarAlt key={idx} className="text-[var(--riafco-orange)]" />
                                                    ))}
                                                </div>
                                            </Chrono>
                                        </div>
                                    )}
                                </div>
                                )}

                                {/* Version Cartes - affichée uniquement si displayType === "cards" */}
                                {displayType === "cards" && (
                                <div className="mt-12">
                                    <div className="grid grid-cols-1 pb-8 text-center">
                                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">{t("historique.evolution.tag")}</h6>
                                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                                            {t("historique.evolution.title")}
                                        </h3>
                                    </div>

                                    {/* Timeline cartes */}
                                    <div className="mt-12 space-y-12">
                                        {[...new Set(historyItems.map((i) => i.year))]
                                            .sort((a, b) => b - a)
                                            .map((year) => {
                                                const yearEvents = historyItems.filter((i) => i.year === year).sort((a, b) => new Date(b.date) - new Date(a.date));
                                                return (
                                                    <div key={year} className="relative" id={`year-${year}`}>
                                                        <div className="flex items-center mb-6">
                                                            <div className="w-16 h-16 rounded-full bg-[var(--riafco-blue)] flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-md mr-4">
                                                                <span className="text-white font-bold text-xl">{year}</span>
                                                            </div>
                                                            <h3 className="text-2xl font-semibold text-[var(--riafco-blue)]">{getYearDescription(year)}</h3>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {yearEvents.map((event) => {
                                                                const eventImage = getEventImage(event);
                                                                return (
                                                                    <div
                                                                        key={event.id}
                                                                        className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border-l-4 border-[var(--riafco-blue)] hover:shadow-lg transition-shadow"
                                                                    >
                                                                        {eventImage && (
                                                                            <div className="mb-4">
                                                                                <img
                                                                                    src={eventImage}
                                                                                    alt={event.title}
                                                                                    className="w-full h-48 object-cover rounded-lg"
                                                                                    onError={(e) => {
                                                                                        e.target.style.display = 'none';
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <div className="flex items-center mb-3">
                                                                            <FaCalendarAlt className="text-[var(--riafco-orange)] mr-2" />
                                                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                                                {new Date(event.date).toLocaleDateString(locale, { month: "long" })}
                                                                            </span>
                                                                        </div>

                                                                        <h4 className="font-semibold text-lg mb-3 text-slate-800 dark:text-slate-200">{event.title}</h4>

                                                                        <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                                                                            {event.description.replace(/<[^>]*>/g, "").substring(0, 150)}...
                                                                        </p>

                                                                        <button
                                                                            className="mt-4 text-[var(--riafco-orange)] font-medium hover:underline flex items-center"
                                                                            onClick={() => openModal(event)}
                                                                        >
                                                                            {i18n.language === "fr" ? "Voir plus" : "See more"} <FaChevronRight className="ml-1" />
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                )}

                                {/* Version Alternée - affichée uniquement si displayType === "alternate" */}
                                {displayType === "alternate" && (
                                <div className="mt-12">
                                    <div className="grid grid-cols-1 pb-8 text-center">
                                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">{t("historique.timeline2.tag")}</h6>
                                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                                            {t("historique.timeline2.title")}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("historique.timeline2.desc")}</p>
                                    </div>

                                    <div className="relative mt-12">
                                        <div className="absolute left-1/2 h-full w-0.5 bg-[var(--riafco-blue)]/30 transform -translate-x-1/2"></div>

                                        {historyItems.map((item, index) => {
                                            const eventImage = getEventImage(item);
                                            return (
                                                <div key={item.id} className={`relative mb-12 ${index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2"}`}>
                                                    <div
                                                        className={`absolute top-0 w-4 h-4 rounded-full bg-[var(--riafco-blue)] -translate-y-1/2 ${index % 2 === 0 ? "md:right-1/2 md:translate-x-1/2" : "md:left-1/2 md:-translate-x-1/2"
                                                            }`}
                                                    ></div>

                                                    <div
                                                        className={`bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                                                            }`}
                                                    >
                                                        {eventImage && (
                                                            <div className="mb-4">
                                                                <img
                                                                    src={eventImage}
                                                                    alt={item.title}
                                                                    className="w-full h-48 object-cover rounded-lg"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex items-center mb-3">
                                                            <div className="w-12 h-12 rounded-full bg-[var(--riafco-blue)]/10 flex items-center justify-center mr-4">
                                                                <FaCalendarAlt className="text-[var(--riafco-blue)] text-xl" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-lg text-[var(--riafco-blue)]">
                                                                    {new Date(item.date).toLocaleDateString(locale, { year: "numeric" })}
                                                                </h4>
                                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                    {new Date(item.date).toLocaleDateString(locale, { month: "long" })}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">{item.title}</h3>

                                                        <div
                                                            className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400"
                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                        />

                                                        {normalize(item.description).includes("programme") || normalize(item.description).includes("program") ? (
                                                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                                <p className="text-sm text-[var(--riafco-blue)]">
                                                                    <FaHandshake className="inline mr-1" />
                                                                    {i18n.language === "fr" ? "Programme stratégique du RIAFCO" : "RIAFCO strategic program"}
                                                                </p>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                                )}
                        </>
                    )}
                </div>
            </section>

          
            {/* Section Événements marquants */}
            {/* <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">{t("historique.highlights.tag")}</h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            {t("historique.highlights.title")}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("historique.highlights.desc")}</p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getHighlightEvents().map((item, index) => {
                            const eventImage = getEventImage(item);
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                    onClick={() => openModal(item)}
                                >
                                    {eventImage ? (
                                        <div className="mb-4">
                                            <img
                                                src={eventImage}
                                                alt={item.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-4 flex justify-center">
                                            {index % 3 === 0 ? (
                                                <FaFileAlt className="text-3xl text-[var(--riafco-orange)]" />
                                            ) : index % 3 === 1 ? (
                                                <FaHandshake className="text-3xl text-[var(--riafco-orange)]" />
                                            ) : (
                                                <FaMapMarkedAlt className="text-3xl text-[var(--riafco-orange)]" />
                                            )}
                                        </div>
                                    )}
                                    <div className="text-[var(--riafco-blue)] font-bold text-center mb-2">{item.year}</div>
                                    <h4 className="font-semibold text-lg mb-2 text-center">
                                        {item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-center">
                                        {item.description.replace(/<[^>]*>/g, "").length > 120
                                            ? item.description.replace(/<[^>]*>/g, "").substring(0, 120) + "..."
                                            : item.description.replace(/<[^>]*>/g, "")}
                                    </p>
                                    <div className="mt-4 text-center">
                                        <button className="text-[var(--riafco-orange)] font-medium hover:underline flex items-center justify-center mx-auto">
                                            {t("historique.highlights.seeDetails")} <FaExternalLinkAlt className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section> */}


            {/* Modal Détails */}
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
                                    <h2 className="text-2xl font-bold text-[var(--riafco-blue)] mb-2">{selectedEvent.title}</h2>
                                    <div className="flex items-center text-[var(--riafco-orange)] mb-4">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>
                                            {selectedEvent.formattedDate} • {t("historique.modal.year", { year: selectedEvent.year })}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 dark:text-gray-300 hover:text-red-500 transition-colors"
                                    aria-label={t("historique.modal.close")}
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div
                                className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
                                dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                            />

                            {normalize(selectedEvent.description).includes("programme") || normalize(selectedEvent.description).includes("program") ? (
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h3 className="font-semibold text-[var(--riafco-blue)] mb-2">{t("historique.modal.programContextTitle")}</h3>
                                    <p className="text-sm">{t("historique.modal.programContextBody")}</p>
                                </div>
                            ) : null}

                            <div className="mt-6">
                                <Link
                                    to={`#year-${selectedEvent.year}`}
                                    onClick={() => {
                                        scrollToYear(selectedEvent.year);
                                        closeModal();
                                    }}
                                    className="inline-flex items-center px-4 py-2 bg-[var(--riafco-blue)] text-white rounded-lg hover:bg-[var(--riafco-blue-hover)] transition-colors"
                                >
                                    {t("historique.modal.viewInTimeline")} <FaCalendarAlt className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </ReactModal>


  {/* Section Chiffres Clés */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">{t("historique.stats.tag")}</h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            {t("historique.stats.title")}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {[
                            {
                                icon: <FaCalendarAlt className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.totalEvents,
                                title: t("historique.stats.eventsTitle"),
                                desc: t("historique.stats.eventsDesc"),
                            },
                            {
                                icon: <FaUsers className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.yearsCount,
                                title: t("historique.stats.yearsTitle"),
                                desc: t("historique.stats.yearsDesc"),
                            },
                            {
                                icon: <FaGlobeAfrica className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.countriesCount,
                                title: t("historique.stats.countriesTitle"),
                                desc: t("historique.stats.countriesDesc"),
                            },
                            {
                                icon: <FaHandshake className="text-4xl text-[var(--riafco-orange)]" />,
                                number: stats.programsCount,
                                title: t("historique.stats.programsTitle"),
                                desc: t("historique.stats.programsDesc"),
                            },
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


            <Footer />
        </>
    );
}
``
