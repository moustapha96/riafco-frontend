


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
            const response = await eventService.getAll();
            if (response && response.events) {
                setEvents(response.events.filter((event) => event.status === "PUBLISHED"));
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
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
                        <h6 className="mb-4 text-base font-medium text-(--riafco-orange)">{t("events.intro.kicker")}</h6>
                        <h3
                            className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold"
                            dangerouslySetInnerHTML={{ __html: t("events.intro.title") }}
                        />
                        <p className="text-slate-600 max-w-xl mx-auto">{t("events.intro.desc")}</p>
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
                                        <FaChevronLeft className="text-(--riafco-blue)" />
                                    </button>
                                    <h4 className="text-lg font-semibold text-(--riafco-blue)">{monthLabel(currentMonth)}</h4>
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
                                        <div key={day} className="text-center text-sm font-medium text-slate-600 p-2">
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
                          ${isSelected ? "bg-(--riafco-blue) text-white"
                                                        : isToday ? "bg-(--riafco-orange) text-white"
                                                            : "hover:bg-gray-100 dark:hover:bg-slate-800"}
                          ${hasEvent ? "font-bold" : ""}
                        `}
                                                aria-pressed={isSelected}
                                            >
                                                {day}
                                                {hasEvent && (
                                                    <div
                                                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected || isToday ? "bg-white" : "bg-(--riafco-orange)"
                                                            }`}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 text-xs text-slate-600">
                                    <div className="flex items-center mb-1">
                                        <div className="w-3 h-3 bg-(--riafco-orange) rounded-full mr-2" />
                                        <span>{t("events.calendar.today")}</span>
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <div className="w-3 h-3 bg-(--riafco-blue) rounded-full mr-2" />
                                        <span>{t("events.calendar.selected")}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-1 h-1 bg-(--riafco-orange) rounded-full mr-2 ml-1" />
                                        <span>{t("events.calendar.hasEvent")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                    <h4 className="text-lg font-semibold text-(--riafco-blue)">
                                        {selectedDate
                                            ? t("events.calendar.monthOf", { date: selectedDate.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }) })
                                            : t("events.calendar.allEvents")}
                                    </h4>
                                    {selectedDate && (
                                        <button
                                            onClick={() => setSelectedDate(null)}
                                            className="text-sm text-(--riafco-orange) hover:underline mt-1"
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
                                                    <div className="flex-shrink-0 w-16 h-16 bg-(--riafco-blue)/10 rounded-lg flex flex-col items-center justify-center text-(--riafco-blue)">
                                                        <span className="text-lg font-bold">{new Date(event.startDate).getDate()}</span>
                                                        <span className="text-xs">
                                                            {new Date(event.startDate).toLocaleDateString(locale, { month: "short" })}
                                                        </span>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <button
                                                            onClick={() => openEventDetails(event)}
                                                            className="hover:text-(--riafco-blue) text-lg font-semibold block mb-2 text-left transition-colors"
                                                        >
                                                            {i18n.language === "fr" ? (event.title_fr || event.title) : (event.title_en || event.title_fr || event.title)}
                                                        </button>

                                                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                                            {i18n.language === "fr" ? (event.description_fr || event.description) : (event.description_en || event.description_fr || event.description)}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                                                            <span className="flex items-center">
                                                                <GoClock className="mr-1 text-(--riafco-orange)" />
                                                                {formatTime(event.startDate)} - {formatTime(event.endDate)}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <PiMapPinLight className="mr-1 text-(--riafco-orange)" />
                                                                {event.location}
                                                            </span>
                                                            {event.isVirtual && (
                                                                <span className="flex items-center text-(--riafco-blue)">
                                                                    <BsCheckCircle className="mr-1" />
                                                                    {t("events.modal.online")}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            {event.author && (
                                                                <div className="flex items-center">
                                                                    {event.author.profilePic && (
                                                                        <img
                                                                            src={buildImageUrl(event.author.profilePic) || "/placeholder.svg"}
                                                                            alt={event.author.firstName}
                                                                            className="w-8 h-8 rounded-full mr-2"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <span className="text-sm font-medium">
                                                                            {event.author.firstName} {event.author.lastName}
                                                                        </span>
                                                                        <span className="text-xs text-slate-500 block">{t("events.list.organizer")}</span>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center gap-3">
                                                                <button
                                                                    onClick={() => openEventDetails(event)}
                                                                    className="inline-flex items-center text-sm font-medium text-(--riafco-orange) hover:text-(--riafco-orange)/80 transition-colors"
                                                                >
                                                                    {t("events.list.details")} <FaArrowRight className="ml-1 text-xs" />
                                                                </button>

                                                                {event.registrationLink ? (
                                                                    <Link
                                                                        to={event.registrationLink}
                                                                        target="_blank"
                                                                        className="inline-flex items-center text-sm font-medium text-(--riafco-blue) hover:text-(--riafco-blue)/80 transition-colors"
                                                                    >
                                                                        {t("events.list.register")} <FaArrowRight className="ml-1 text-xs" />
                                                                    </Link>
                                                                ) : (
                                                                        <span className="text-sm text-slate-500">{t("events.list.closed")}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                                <div className="p-8 text-center text-slate-600">
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
                            <h2 className="text-2xl font-bold text-(--riafco-blue)">
                                {i18n.language === "fr" ? (selectedEvent.title_fr || selectedEvent.title) : (selectedEvent.title_en || selectedEvent.title_fr || selectedEvent.title)}
                            </h2>
                            <button
                                onClick={closeEventDetails}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                aria-label={t("events.modal.close")}
                            >
                                <FaTimes className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            {selectedEvent.image && (
                                <img
                                    src={buildImageUrl(selectedEvent.image) || "/placeholder.svg"}
                                    alt={i18n.language === "fr" ? (selectedEvent.title_fr || selectedEvent.title) : (selectedEvent.title_en || selectedEvent.title_fr || selectedEvent.title)}
                                    className="w-full h-48 object-cover rounded-lg mb-6"
                                />
                            )}

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <GoClock className="mr-3 text-(--riafco-orange)" />
                                    <div>
                                        <p className="font-medium">{t("events.modal.dateTime")}</p>
                                        <p>{formatDateLong(selectedEvent.startDate)}</p>
                                        <p>
                                            {formatTime(selectedEvent.startDate)} - {formatTime(selectedEvent.endDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-600">
                                    <PiMapPinLight className="mr-3 text-(--riafco-orange)" />
                                    <div>
                                        <p className="font-medium">{t("events.modal.place")}</p>
                                        <p>{selectedEvent.location}</p>
                                        {selectedEvent.isVirtual && (
                                            <span className="inline-flex items-center text-(--riafco-blue) text-sm mt-1">
                                                <BsCheckCircle className="mr-1" />
                                                {t("events.modal.online")}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {selectedEvent.author && (
                                    <div className="flex items-center text-gray-600">
                                        <div className="w-6 h-6 mr-3 flex items-center justify-center">
                                            {selectedEvent.author.profilePic ? (
                                                <img
                                                    src={buildImageUrl(selectedEvent.author.profilePic) || "/placeholder.svg"}
                                                    alt={selectedEvent.author.firstName}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-6 h-6 bg-(--riafco-blue) rounded-full flex items-center justify-center text-white text-xs">
                                                    {selectedEvent.author.firstName[0]}
                                                </div>
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
                                <h3 className="text-lg font-semibold text-(--riafco-blue) mb-3">{t("events.modal.description")}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {i18n.language === "fr"
                                        ? (selectedEvent.description_fr || selectedEvent.description)
                                        : (selectedEvent.description_en || selectedEvent.description_fr || selectedEvent.description)}
                                </p>
                            </div>

                            {selectedEvent.additionalInfo && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-(--riafco-blue) mb-3">{t("events.modal.moreInfo")}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {i18n.language === "fr"
                                            ? (selectedEvent.additionalInfo_fr || selectedEvent.additionalInfo)
                                            : (selectedEvent.additionalInfo_en || selectedEvent.additionalInfo_fr || selectedEvent.additionalInfo)}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {selectedEvent.registrationLink ? (
                                    <Link
                                        to={selectedEvent.registrationLink}
                                        target="_blank"
                                        className="flex-1 py-3 px-6 bg-(--riafco-blue) hover:bg-(--riafco-blue)/90 text-white font-semibold rounded-md text-center transition-colors"
                                    >
                                        {t("events.modal.registerCta")}
                                    </Link>
                                ) : (
                                    <div className="flex-1 py-3 px-6 bg-gray-200 text-gray-500 font-semibold rounded-md text-center">
                                        {t("events.modal.closed")}
                                    </div>
                                )}

                                <button
                                    onClick={closeEventDetails}
                                    className="py-3 px-6 border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold rounded-md transition-colors"
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
