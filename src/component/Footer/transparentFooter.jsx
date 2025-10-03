import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedin, FaTwitter, FaInstagram, FaRegEnvelope, FaYoutube } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';
import settingsService from '../../services/settingsService';
import logo_light from '../../assets/images/riafco-logo-blanc-90.png'
import logo_dark from '../../assets/images/logo-riafco-90.png'


export default function TransparentFooter() {
    const [settings, setSettings] = useState(null);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await settingsService.getAll();
                setSettings(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des paramètres :", error);
            }
        };
        fetchSettings();
    }, []);

    // Liens fixes
    const footerCompany = [
        { title: "Historique", route: "/historique", liClass: "mt-2" },
        { title: "Gouvernance", route: "/gouvernance", liClass: "mt-2" },
        { title: "Notre Équipe", route: "/notre-équipe", liClass: "mt-2" },
        { title: "Carte des membres", route: "/membres", liClass: "mt-2" },
        { title: "Règlement intérieur", route: "/réglement-interieur", liClass: "mt-2" },
    ];

    const footerLinks = [
        { title: "Événements", route: "/évènements", liClass: "mt-2" },
        { title: "Bibliothèque", route: "/ressources", liClass: "mt-2" },
        { title: "Nous Contacter", route: "/contact", liClass: "mt-2" },
        { title: "Rapport de Gouvernance", route: "/rapport-gouvernance", liClass: "mt-2" },
    ];

    if (!settings) {
        return null; // ou un spinner
    }

    const socialLinks = [
        { icon: <FaFacebookF />, url: settings.socialMedia?.facebook, title: "Facebook" },
        { icon: <FaLinkedin />, url: settings.socialMedia?.linkedin, title: "LinkedIn" },
        { icon: <FaTwitter />, url: settings.socialMedia?.twitter, title: "Twitter" },
        { icon: <FaInstagram />, url: "https://instagram.com/riafco", title: "Instagram" }, // pas dans le backend
        { icon: <FaYoutube />, url: "https://youtube.com/riafco", title: "YouTube" }, // pas dans le backend
        { icon: <FaRegEnvelope />, url: `mailto:${settings.contactEmail}`, title: "Email" },
    ].filter(link => link.url); // on enlève les liens vides

    return (
        <footer className="relative bg-gradient-to-br from-[var(--riafco-blue)] to-blue-900 text-gray-100">
            <div className="container relative">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="py-[60px] px-0">
                            <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                                {/* Logo + Description + Réseaux sociaux */}
                                <div className="lg:col-span-4 md:col-span-12">

                                    <Link to="/" className="text-[22px] focus:outline-none dark:hidden block">
                                        <img src={logo_light} alt="Logo RIAFCO" className="h-20" />
                                    </Link>
                                    <Link to="/" className="text-[22px] focus:outline-none dark:block hidden">
                                        <img src={logo_light} alt="Logo RIAFCO" className="h-20" />
                                    </Link>

                                    {settings.siteName &&
                                        <span className="font-bold text-sm text-white">{settings.siteName}</span>
                                    }
                                    <p className="mt-6 text-slate-400 dark:text-slate-300">
                                        {settings.contactAddress}
                                    </p>
                                    <ul className="list-none mt-5 flex flex-wrap gap-2">
                                        {socialLinks.map((link, index) => (
                                            <li key={index}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="size-9 inline-flex items-center justify-center text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-[var(--riafco-orange)] hover:bg-[var(--riafco-orange)]"
                                                    title={link.title}
                                                >
                                                    {link.icon}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Liens "À Propos" */}
                                <div className="lg:col-span-2 md:col-span-4">
                                    <h5 className="tracking-[1px] text-[var(--riafco-orange)] font-semibold mb-4">À Propos</h5>
                                    <ul className="list-none footer-list">
                                        {footerCompany.map((item, index) => (
                                            <li key={index} className={item.liClass}>
                                                <Link to={item.route} className="text-slate-400 hover:text-[var(--riafco-orange)] duration-500 inline-flex items-center">
                                                    <MdKeyboardArrowRight className="text-xl me-1" /> {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Liens Utiles */}
                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-[var(--riafco-orange)] font-semibold mb-4">Liens Utiles</h5>
                                    <ul className="list-none footer-list">
                                        {footerLinks.map((item, index) => (
                                            <li key={index} className={item.liClass}>
                                                <Link to={item.route} className="text-slate-400 hover:text-[var(--riafco-orange)] duration-500 inline-flex items-center">
                                                    <MdKeyboardArrowRight className="text-xl me-1" /> {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Newsletter */}
                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-[var(--riafco-orange)] font-semibold mb-4">Newsletter</h5>
                                    <p className="text-slate-400 mb-4">
                                        Abonnez-vous pour recevoir les dernières actualités de {settings.siteName}.
                                    </p>
                                    <form>
                                        <div className="grid grid-cols-1">
                                            <div className="foot-subscribe my-3">
                                                <label className="form-label text-slate-400">
                                                    Votre email <span className="text-red-600">*</span>
                                                </label>
                                                <div className="form-icon relative mt-2">
                                                    <Icon.Mail className="size-4 absolute top-3 start-4 text-slate-400" />
                                                    <input
                                                        type="email"
                                                        className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent border border-gray-200 rounded"
                                                        placeholder="votre@email.com"
                                                        name="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="py-2 px-5 font-semibold tracking-wide bg-[var(--riafco-blue)] hover:bg-[var(--riafco-orange)] text-white rounded-md"
                                            >
                                                S'abonner
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="py-[30px] px-0 border-t border-gray-200 dark:border-gray-700">
                <div className="container relative text-center">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="md:text-start text-center">
                            <p className="mb-0 text-slate-400">
                                {settings.footer || `© ${new Date().getFullYear()} ${settings.siteName}. Tous droits réservés.`}
                            </p>
                        </div>
                        <div className="md:text-end text-center mt-4 md:mt-0">
                            <Link to="/réglement-interieur" className="text-slate-400 hover:text-[var(--riafco-orange)] me-4">
                                Mentions Légales
                            </Link>
                            <Link to="/confidentialité" className="text-slate-400 hover:text-[var(--riafco-orange)]">
                                Politique de Confidentialité
                            </Link>
                            <Link to="/terme-et-condition" className="text-slate-400 hover:text-[var(--riafco-orange)] ms-4">
                                Termes et Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
