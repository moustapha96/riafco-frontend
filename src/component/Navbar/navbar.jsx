

/* eslint-disable react/prop-types */
import logo_light from '../../assets/images/riafco-logo-blanc-90.png'
import logo_dark from '../../assets/images/logo-riafco-90.png'

import frFlag from "@/assets/lang/fr.png";
import enFlag from "@/assets/lang/en.png";

import '../../assets/libs/@mdi/font/css/materialdesignicons.min.css';
import '../../assets/css/tailwind.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import settingsService from '../../services/settingsService';
import { FaFacebookF, FaInstagram, FaLinkedin, FaRegEnvelope, FaTwitter, FaYoutube } from 'react-icons/fa';


/* ----------------------- Barre bleue supérieure ----------------------- */
function TopStrip() {
   
    const { t } = useTranslation();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await settingsService.getAll();
                setSettings(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des paramètres :', error);
            }
        };
        fetchSettings();
    }, []);

    const socialLinks = [
        { icon: <FaFacebookF />, url: settings?.socialMedia?.facebook, title: 'Facebook' },
        { icon: <FaLinkedin />, url: settings?.socialMedia?.linkedin, title: 'LinkedIn' },
        { icon: <FaTwitter />, url: settings?.socialMedia?.twitter, title: 'Twitter' },
        {
            icon: <FaInstagram />, url: settings?.socialMedia?.instagram, title: 'Instagram'
        }, // fallback
        { icon: <FaYoutube />, url: settings?.socialMedia?.youtube, title: 'YouTube' }, // fallback
        { icon: <FaRegEnvelope />, url: `mailto:${settings?.contactEmail}`, title: 'Email' },
    ].filter(link => link.url);




    return (
        <div className="w-full bg-[var(--riafco-blue)] text-white">
            <div className="container flex items-center justify-between gap-3 py-2">
                {/* Recherche */}

                {/* Actions droites */}
                <div className="ml-auto flex items-center gap-3 md:gap-4">

                    <Link
                        to="https://admin.riafco-io.org/auth/login"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/30 hover:bg-white/10"
                    >
                        <i className="mdi mdi-account text-lg" />
                        <span className="hidden sm:inline">{t("Login", { ns: "common" })}</span>
                    </Link>


                    {settings && socialLinks.map((link, index) => (

                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center size-9 rounded-md hover:bg-white/10"
                            title={link.title}
                            aria-label={link.title}
                        >
                            {link.icon}
                        </a>

                    ))}



                    <LanguageFlags className="!text-white" />
                </div>
            </div>
        </div>
    );
}

/* ----------------------------- Navbar -------------------------------- */
export default function Navbar(props) {
    const { navClass, navJustify, bg } = props;
    const [isMenu, setIsMenu] = useState(false);
    const [manu, setManu] = useState('');
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        let current = location.pathname;
        setManu(current);
        function windowScroll() {
            const navbar = document.getElementById("topnav");
            if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
                navbar?.classList.add("nav-sticky");
            } else {
                navbar?.classList.remove("nav-sticky");
            }
        }
        window.addEventListener("scroll", windowScroll);
        window.scrollTo(0, 0);
        return () => window.removeEventListener('scroll', windowScroll);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenu(!isMenu);
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href");
                    if (target !== "" && elem.target.nextElementSibling) {
                        const submenu = elem.target.nextElementSibling.nextElementSibling;
                        submenu?.classList?.toggle('open');
                    }
                });
            });
        }
    };

    return (
        <>

            {/* Barre principale (ta navbar existante) */}
            <nav
                id="topnav"
                className={`defaultscroll ${navClass === "nav-light" ? '' : navClass === "nav-sticky" ? 'bg-white dark:bg-slate-900' : ''} ${bg ? '!bg-white dark:!bg-slate-900' : ''}`}
            >
                <TopStrip />

                <div className="container relative">
                    {navClass === "nav-light" ? (
                        <Link className="logo" to="/">
                            <span className="inline-block dark:hidden">
                                <img src={logo_dark} className="l-dark" height="24" alt="RIAFCO Logo" />
                                <img src={logo_light} className="l-light" height="24" alt="RIAFCO Logo" />
                            </span>
                            <img src={logo_light} height="24" className="hidden dark:inline-block" alt="RIAFCO Logo" />
                        </Link>
                    ) : (
                        <Link className="logo" to="/">
                            <img src={logo_dark} className="inline-block dark:hidden" alt="RIAFCO Logo" />
                            <img src={logo_light} className="hidden dark:inline-block" alt="RIAFCO Logo" />
                        </Link>
                    )}

                    <div className="menu-extras">
                        <div className="menu-item">
                            <button
                                type="button"
                                className={`navbar-toggle ${isMenu ? 'open' : ''}`}
                                id="isToggle"
                                onClick={toggleMenu}
                                aria-label="Ouvrir le menu"
                            >
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                        <ul className={`navigation-menu ${navClass} ${navJustify}`}>
                            <li className={manu === "/" ? "active" : ""}>
                                <Link to="/" className="sub-menu-item">{t('header.accueil')}</Link>
                            </li>

                              <li className={`${[ "/réglement-interieur", "/a-propos", "/notre-équipe"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                <Link to="#">{t('header.apropos')}</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "/a-propos" ? "active" : ""}><Link to="/a-propos" className="sub-menu-item">{t('header.apropos')}</Link></li>
                                    <li className={manu === "/notre-équipe" ? "active" : ""}><Link to="/notre-équipe" className="sub-menu-item">{t('header.notre_equipe')}</Link></li>
                                    <li className={manu === "/réglement-interieur" ? "active" : ""}><Link to="/réglement-interieur" className="sub-menu-item">{t('header.reglement-interieur')}</Link></li>
                                </ul>
                            </li>

                            <li className={manu === "/actualités" ? "active" : ""}>
                                <Link to="/actualités" className="sub-menu-item">{t('header.actualites')}</Link>
                            </li>
                            <li className={manu === "/activités" ? "active" : ""}>
                                <Link to="/activités" className="sub-menu-item">{t('header.activites')}</Link>
                            </li>
                            <li className={manu === "/membres" ? "active" : ""}>
                                <Link to="/membres" className="sub-menu-item">{t('header.membres')}</Link>
                            </li>
                            <li className={manu === "/évènements" ? "active" : ""}>
                                <Link to="/évènements" className="sub-menu-item">{t('header.evenements')}</Link>
                            </li>

                           <li className={`${["/ressources", "/rapport-gouvernance", "/historique",  ].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                <Link to="#">{t('header.historique')}</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "/historique" ? "active" : ""}><Link to="/historique" className="sub-menu-item">{t('header.historique')}</Link></li>
                                    <li className={manu === "/ressources" ? "active" : ""}><Link to="/ressources" className="sub-menu-item">{t('header.ressources')}</Link></li>
                                    <li className={manu === "/rapport-gouvernance" ? "active" : ""}><Link to="/rapport-gouvernance" className="sub-menu-item">{t('header.gouvernances')}</Link></li>
                                   
                                </ul>
                            </li>

                            <li className={manu === "/contact" ? "active" : ""}>
                                <Link to="/contact" className="sub-menu-item">{t('header.contact')}</Link>
                            </li>


                            {/* <li className="inline-flex items-center mt-4 lg:ml-3 md:hidden">
                                <LanguageFlags className="sub-menu-item" />
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

/* ----------------------- Sélecteur de langue ----------------------- */
function LanguageFlags({ className = "" }) {
    const { i18n } = useTranslation();
    const langs = [
        { code: "fr", name: "Français", flag: frFlag },
        { code: "en", name: "English", flag: enFlag },
    ];

    const changeLanguage = async (lng) => {
        if (lng !== i18n.language) await i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center gap-2">
            {langs.map((lng) => {
                const active = i18n.language === lng.code;
                return (
                    <button
                        key={lng.code}
                        type="button"
                        onClick={() => changeLanguage(lng.code)}
                        title={lng.name}
                        aria-label={lng.name}
                        className={[
                            "sub-menu-item",
                            className,
                            "h-10 px-2 inline-flex items-center justify-center",
                            "rounded-md transition bg-transparent border border-transparent",
                            "hover:border-[var(--riafco-orange)]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riafco-orange)]/50",
                            active ? "ring-2 ring-[var(--riafco-orange)]/60" : ""
                        ].join(" ")}
                    >
                        <img src={lng.flag} alt={lng.name} className="w-5 h-5 rounded-sm" />
                        <span className="sr-only">{lng.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
