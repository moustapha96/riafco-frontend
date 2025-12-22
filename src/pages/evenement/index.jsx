


/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import CookieModal from "../../component/cookieModal";
import HeaderBreakdumb from "../components/hearder-breakdumb";
import eventService from "../../services/eventService";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { PiMapPinLight } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { BsCheckCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import { buildImageUrl } from "../../utils/imageUtils";

export default function EvenementPage() {
    const { t, i18n } = useTranslation();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await eventService.getAll();
            // La réponse peut avoir response.data ou response.events
            const eventsData = response.data?.data || response.data || response.events || [];
            // Filtrer uniquement les événements publiés
            const publishedEvents = Array.isArray(eventsData) 
                ? eventsData.filter((event) => event.status === "PUBLISHED")
                : [];
            setEvents(publishedEvents);
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    // --- Utils i18n date ---
    const locale = i18n.language === "fr" ? "fr-FR" : "en-US";

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const getFirstDayOfMonth = (date) => {
        // Make Monday index 0
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0..6 (Sun..Sat)
        return firstDay === 0 ? 6 : firstDay - 1;
    };

    const isSameDay = (d1, d2) =>
        d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

    const hasEventOnDate = (date) =>
        events.some((event) => isSameDay(new Date(event.startDate), date));

    const getEventsForDate = (date) =>
        events.filter((event) => isSameDay(new Date(event.startDate), date));

    const navigateMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    // Build localized weekday headers starting Monday
    const dayHeaders = (() => {
        const base = new Date(2025, 0, 6); // Monday
        return Array.from({ length: 7 }, (_, i) =>
            new Date(base.getFullYear(), base.getMonth(), base.getDate() + i).toLocaleDateString(locale, {
                weekday: "short",
            })
        );
    })();

    const monthLabel = (date) =>
        `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}`;

    const formatDateLong = (dateString) =>
        new Date(dateString).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

    const formatTime = (dateString) =>
        new Date(dateString).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

    const filteredEvents = selectedDate ? getEventsForDate(selectedDate) : events;

    const openEventDetails = (event) => {
        setSelectedEvent(event);
        setIsPopupOpen(true);
    };

    const closeEventDetails = () => {
        setSelectedEvent(null);
        setIsPopupOpen(false);
    };

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t("events.header.title")}
                description={t("events.header.description")}
                // background={riafcoAbout}
            />

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="mb-4 text-base font-medium text-[var(--riafco-orange)]">{t("events.intro.kicker")}</h6>
                        <h3
                            className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-slate-900 dark:text-white"
                            dangerouslySetInnerHTML={{ __html: t("events.intro.title") }}
                        />
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">{t("events.intro.desc")}</p>
                    </div>

                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-8">
                        {/* Calendar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={() => navigateMonth(-1)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                                        aria-label="Previous month"
                                    >
                                        <FaChevronLeft className="text-[var(--riafco-blue)]" />
                                    </button>
                                    <h4 className="text-lg font-semibold text-[var(--riafco-blue)] dark:text-white">{monthLabel(currentMonth)}</h4>
                                    <button
                                        onClick={() => navigateMonth(1)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                                        aria-label="Next month"
                                    >
                                        <FaChevronRight className="text-(--riafco-blue)" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {dayHeaders.map((day) => (
                                        <div key={day} className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 p-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                                        <div key={`empty-${i}`} className="p-2" />
                                    ))}

                                    {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
                                        const day = index + 1;
                                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                        const isSelected = selectedDate && isSameDay(date, selectedDate);
                                        const hasEvent = hasEventOnDate(date);
                                        const isToday = isSameDay(date, new Date());

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => setSelectedDate(date)}
                                                className={`
                                                    p-2 text-sm rounded-md transition-all duration-200 relative
                                                    ${isSelected ? "bg-[var(--riafco-blue)] text-white"
                                                                                    : isToday ? "bg-[var(--riafco-orange)] text-white"
                                                                                        : hasEvent ? "bg-[var(--riafco-orange)]/20 border-2 border-[var(--riafco-orange)] font-bold text-[var(--riafco-orange)]"
                                                                                            : "hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"}
                                                    ${hasEvent && (isSelected || isToday) ? "font-bold" : ""}
                                                    `}
                                                aria-pressed={isSelected}
                                            >
                                                {day}
                                                {hasEvent && (isSelected || isToday) && (
                                                    <div
                                                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 text-xs text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center mb-1">
                                        <div className="w-3 h-3 bg-[var(--riafco-orange)] rounded-full mr-2" />
                                        <span>{t("events.calendar.today")}</span>
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <div className="w-3 h-3 bg-[var(--riafco-blue)] rounded-full mr-2" />
                                        <span>{t("events.calendar.selected")}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-[var(--riafco-orange)]/20 border-2 border-[var(--riafco-orange)] rounded-md mr-2" />
                                        <span>{t("events.calendar.hasEvent")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                    <h4 className="text-lg font-semibold text-[var(--riafco-blue)] dark:text-white">
                                        {selectedDate
                                            ? t("events.calendar.monthOf", { date: selectedDate.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }) })
                                            : t("events.calendar.allEvents")}
                                    </h4>
                                    {selectedDate && (
                                        <button
                                            onClick={() => setSelectedDate(null)}
                                            className="text-sm text-[var(--riafco-orange)] hover:underline mt-1"
                                        >
                                            {t("events.calendar.seeAll")}
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {loading ? (
                                        <div className="p-8 text-center text-slate-600">...</div>
                                    ) : filteredEvents.length > 0 ? (
                                        filteredEvents.map((event, index) => (
                                            <div key={index} className="p-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex-shrink-0 w-16 h-16 border-2 border-[var(--riafco-orange)] rounded-lg flex flex-col items-center justify-center text-[var(--riafco-orange)] bg-[var(--riafco-orange)]/5">
                                                        <span className="text-lg font-bold">{new Date(event.startDate).getDate()}</span>
                                                        <span className="text-xs">
                                                            {new Date(event.startDate).toLocaleDateString(locale, { month: "short" })}
                                                        </span>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <button
                                                            onClick={() => openEventDetails(event)}
                                                            className="hover:text-[var(--riafco-blue)] text-lg font-semibold block mb-2 text-left transition-colors text-slate-900 dark:text-white"
                                                        >
                                                            {event.title}
                                                        </button>

                                                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                                                            {event.description}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                                            <span className="flex items-center">
                                                                <GoClock className="mr-1 text-[var(--riafco-orange)]" />
                                                                {formatTime(event.startDate)} - {formatTime(event.endDate)}
                                                            </span>
                                                            {event.location && (
                                                                <span className="flex items-center">
                                                                    <PiMapPinLight className="mr-1 text-[var(--riafco-orange)]" />
                                                                    {event.location}
                                                                </span>
                                                            )}
                                                            {event.isVirtual && (
                                                                <span className="flex items-center text-[var(--riafco-blue)]">
                                                                    <BsCheckCircle className="mr-1" />
                                                                    {t("events.modal.online")}
                                                                </span>
                                                            )}
                                                            {event.maxAttendees && (
                                                                <span className="flex items-center text-slate-500 dark:text-slate-400">
                                                                    👥 {event.maxAttendees} {i18n.language === "fr" ? "places" : "spots"}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            {event.author && (
                                                                <div className="flex items-center">
                                                                    <div className="w-8 h-8 rounded-full mr-2 flex items-center justify-center bg-[var(--riafco-blue)] text-white text-xs font-semibold flex-shrink-0">
                                                                        {event.author.profilePic ? (
                                                                            <img
                                                                                src={buildImageUrl(event.author.profilePic)}
                                                                                alt={`${event.author.firstName} ${event.author.lastName}`}
                                                                                className="w-8 h-8 rounded-full object-cover"
                                                                                onError={(e) => {
                                                                                    e.target.style.display = 'none';
                                                                                    e.target.parentElement.innerHTML = (event.author.firstName?.[0] || event.author.lastName?.[0] || 'A');
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            (event.author.firstName?.[0] || event.author.lastName?.[0] || 'A')
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                            {event.author.firstName} {event.author.lastName}
                                                                        </span>
                                                                        <span className="text-xs text-slate-500 dark:text-slate-400 block">{t("events.list.organizer")}</span>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center gap-3">
                                                                <button
                                                                    onClick={() => openEventDetails(event)}
                                                                    className="inline-flex items-center text-sm font-medium text-[var(--riafco-orange)] hover:text-[var(--riafco-orange)]/80 transition-colors"
                                                                >
                                                                    {t("events.list.details")} <FaArrowRight className="ml-1 text-xs" />
                                                                </button>

                                                                {event.registrationLink ? (
                                                                    <a
                                                                        href={event.registrationLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center text-sm font-medium text-[var(--riafco-blue)] hover:text-[var(--riafco-blue)]/80 transition-colors"
                                                                    >
                                                                        {t("events.list.register")} <FaArrowRight className="ml-1 text-xs" />
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-sm text-slate-500 dark:text-slate-400">{t("events.list.closed")}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                                <div className="p-8 text-center text-slate-600 dark:text-slate-400">
                                                    <p>{selectedDate ? t("events.calendar.emptyForDate") : t("events.calendar.emptyAll")}</p>
                                                </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isPopupOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-[var(--riafco-blue)] dark:text-white">
                                {selectedEvent.title}
                            </h2>
                            <button
                                onClick={closeEventDetails}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                aria-label={t("events.modal.close")}
                            >
                                <FaTimes className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6">
                            {selectedEvent.image ? (
                                <img
                                    src={buildImageUrl(selectedEvent.image)}
                                    alt={selectedEvent.title}
                                    className="w-full h-48 object-cover rounded-lg mb-6"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-48 bg-gradient-to-br from-[var(--riafco-blue)]/20 to-[var(--riafco-orange)]/20 rounded-lg mb-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <GoClock className="mx-auto text-4xl text-[var(--riafco-blue)] mb-2" />
                                        <p className="text-slate-600 dark:text-slate-400">{formatDateLong(selectedEvent.startDate)}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start text-gray-600 dark:text-gray-300">
                                    <GoClock className="mr-3 text-[var(--riafco-orange)] mt-1 flex-shrink-0" />
                                    <div className="flex-1 border-2 border-[var(--riafco-orange)] rounded-lg p-4 bg-[var(--riafco-orange)]/5">
                                        <p className="font-medium mb-2 text-[var(--riafco-orange)]">{t("events.modal.dateTime")}</p>
                                        <p className="font-semibold mb-1">{formatDateLong(selectedEvent.startDate)}</p>
                                        <p className="text-sm">
                                            {formatTime(selectedEvent.startDate)} - {formatTime(selectedEvent.endDate)}
                                        </p>
                                    </div>
                                </div>

                                {(selectedEvent.location || selectedEvent.isVirtual) && (
                                    <div className="flex items-start text-gray-600 dark:text-gray-300">
                                        <PiMapPinLight className="mr-3 text-[var(--riafco-orange)] mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium mb-1">{t("events.modal.place")}</p>
                                            {selectedEvent.location ? (
                                                <p>{selectedEvent.location}</p>
                                            ) : selectedEvent.isVirtual ? (
                                                <p className="text-slate-500 dark:text-slate-400 italic">
                                                    {i18n.language === "fr" ? "Événement en ligne" : "Online event"}
                                                </p>
                                            ) : null}
                                            {selectedEvent.isVirtual && (
                                                <span className="inline-flex items-center text-[var(--riafco-blue)] text-sm mt-1">
                                                    <BsCheckCircle className="mr-1" />
                                                    {t("events.modal.online")}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {selectedEvent.maxAttendees && (
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <span className="mr-3 text-[var(--riafco-orange)]">👥</span>
                                        <div>
                                            <p className="font-medium">{i18n.language === "fr" ? "Places disponibles" : "Available spots"}</p>
                                            <p>{selectedEvent.maxAttendees} {i18n.language === "fr" ? "places" : "spots"}</p>
                                        </div>
                                    </div>
                                )}

                                {selectedEvent.author && (
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <div className="w-10 h-10 mr-3 flex items-center justify-center flex-shrink-0 bg-[var(--riafco-blue)] rounded-full text-white text-sm font-semibold">
                                            {selectedEvent.author.profilePic ? (
                                                <img
                                                    src={buildImageUrl(selectedEvent.author.profilePic)}
                                                    alt={`${selectedEvent.author.firstName} ${selectedEvent.author.lastName}`}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = (selectedEvent.author.firstName?.[0] || selectedEvent.author.lastName?.[0] || 'A');
                                                    }}
                                                />
                                            ) : (
                                                (selectedEvent.author.firstName?.[0] || selectedEvent.author.lastName?.[0] || 'A')
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{t("events.modal.organizer")}</p>
                                            <p>
                                                {selectedEvent.author.firstName} {selectedEvent.author.lastName}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-[var(--riafco-blue)] dark:text-white mb-3">{t("events.modal.description")}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedEvent.description}
                                </p>
                            </div>

                            {selectedEvent.additionalInfo && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[var(--riafco-blue)] dark:text-white mb-3">{t("events.modal.moreInfo")}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {selectedEvent.additionalInfo}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {selectedEvent.registrationLink ? (
                                    <a
                                        href={selectedEvent.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 px-6 bg-[var(--riafco-blue)] hover:bg-[var(--riafco-orange)] text-white font-semibold rounded-md text-center transition-colors"
                                    >
                                        {t("events.modal.registerCta")}
                                    </a>
                                ) : (
                                    <div className="flex-1 py-3 px-6 bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 font-semibold rounded-md text-center">
                                        {t("events.modal.closed")}
                                    </div>
                                )}

                                <button
                                    onClick={closeEventDetails}
                                    className="py-3 px-6 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold rounded-md transition-colors"
                                >
                                    {t("events.modal.close")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            <CookieModal />
        </>
    );
}
