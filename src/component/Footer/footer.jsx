import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedin, FaTwitter, FaInstagram, FaRegEnvelope, FaYoutube } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';
import settingsService from '../../services/settingsService';
import logo_light from '../../assets/images/riafco-logo-blanc-90.png';
import logo_dark from '../../assets/images/logo-riafco-90.png';
import { useTranslation } from 'react-i18next';
import newsletterService from '../../services/newsletterService';


export default function Footer() {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(null);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState('');

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

    // Liens (titres i18n)
    const footerCompany = [
        { title: t('footer.companyLinks.history'), route: '/historique', liClass: 'mt-2' },
        { title: t('footer.companyLinks.team'), route: '/notre-équipe', liClass: 'mt-2' },
        { title: t('footer.companyLinks.membersMap'), route: '/membres', liClass: 'mt-2' },
        { title: t('footer.companyLinks.internalRules'), route: '/réglement-interieur', liClass: 'mt-2' },
    ];

    const footerLinks = [
        { title: t('footer.usefulLinks.events'), route: '/évènements', liClass: 'mt-2' },
        { title: t('footer.usefulLinks.history'), route: '/historique', liClass: 'mt-2' },
        { title: t('footer.usefulLinks.library'), route: '/ressources', liClass: 'mt-2' },
        { title: t('footer.usefulLinks.contact'), route: '/contact', liClass: 'mt-2' },
        { title: t('footer.usefulLinks.governanceReport'), route: '/rapport-gouvernance', liClass: 'mt-2' },
    ];

    if (!settings) {
        return null; // ou un spinner si tu préfères
    }

    const socialLinks = [
        { icon: <FaFacebookF />, url: settings.socialMedia?.facebook, title: 'Facebook' },
        { icon: <FaLinkedin />, url: settings.socialMedia?.linkedin, title: 'LinkedIn' },
        { icon: <FaTwitter />, url: settings.socialMedia?.twitter, title: 'Twitter' },
        {
            icon: <FaInstagram />, url: settings.socialMedia?.instagram, title: 'Instagram'
        }, // fallback
        { icon: <FaYoutube />, url: settings.socialMedia?.youtube, title: 'YouTube' }, // fallback
        { icon: <FaRegEnvelope />, url: `mailto:${settings.contactEmail}`, title: 'Email' },
    ].filter(link => link.url);

    const onSubmitNewsletter = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            setIsSubmitting(true);
            setSubscriptionStatus('');
            // ici tu peux appeler ton endpoint d’inscription newsletter si dispo
            await new Promise(r => setTimeout(r, 600)); // petit faux délai
            await newsletterService.subscribe(email);
            setSubscriptionStatus('success');
            setEmail('');
        } catch (err) {
            console.log(err);
            setSubscriptionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const year = new Date().getFullYear();
    const siteName = settings.siteName || 'RIAFCO';

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
                                        <img src={logo_dark} alt="Logo RIAFCO" className="h-20" />
                                    </Link>

                                    {settings.siteName && (
                                        <span className="font-bold text-sm text-white">{settings.siteName}</span>
                                    )}
                                    <p className="mt-6 text-slate-300">
                                        {settings.contactAddress}
                                    </p>

                                    <ul className="list-none mt-5 flex flex-wrap gap-2">
                                        {socialLinks.map((link, index) => (
                                            <li key={index}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="size-9 inline-flex items-center justify-center text-gray-300 hover:text-white border border-gray-200/30 rounded-md hover:border-[var(--riafco-orange)] hover:bg-[var(--riafco-orange)]"
                                                    title={link.title}
                                                    aria-label={link.title}
                                                >
                                                    {link.icon}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Liens "À Propos" */}
                                <div className="lg:col-span-2 md:col-span-4">
                                    <h5 className="tracking-[1px] text-[var(--riafco-orange)] font-semibold mb-4">
                                        {t('footer.sections.about')}
                                    </h5>
                                    <ul className="list-none footer-list">
                                        {footerCompany.map((item, index) => (
                                            <li key={index} className={item.liClass}>
                                                <Link
                                                    to={item.route}
                                                    className="text-slate-300 hover:text-[var(--riafco-orange)] duration-500 inline-flex items-center"
                                                >
                                                    <MdKeyboardArrowRight className="text-xl me-1" /> {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Liens Utiles */}
                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-[var(--riafco-orange)] font-semibold mb-4">
                                        {t('footer.sections.usefulLinks')}
                                    </h5>
                                    <ul className="list-none footer-list">
                                        {footerLinks.map((item, index) => (
                                            <li key={index} className={item.liClass}>
                                                <Link
                                                    to={item.route}
                                                    className="text-slate-300 hover:text-[var(--riafco-orange)] duration-500 inline-flex items-center"
                                                >
                                                    <MdKeyboardArrowRight className="text-xl me-1" /> {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Newsletter */}
                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-[var(--riafco-orange)] font-semibold mb-4">
                                        {t('footer.sections.newsletter')}
                                    </h5>
                                    <p className="text-slate-300 mb-4">
                                        {t('footer.newsletter.subscribeText', { siteName })}
                                    </p>

                                    <form onSubmit={onSubmitNewsletter}>
                                        <div className="grid grid-cols-1">
                                            <div className="foot-subscribe my-3">
                                                <label className="form-label text-slate-300">
                                                    {t('footer.newsletter.emailLabel')} <span className="text-red-300">*</span>
                                                </label>
                                                <div className="form-icon relative mt-2">
                                                    <Icon.Mail className="size-4 absolute top-3 start-4 text-slate-300" />
                                                    <input
                                                        type="email"
                                                        className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent border border-gray-200/40 rounded placeholder:text-slate-400"
                                                        placeholder={t('footer.newsletter.emailPlaceholder')}
                                                        name="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="py-2 px-5 font-semibold tracking-wide bg-[var(--riafco-blue)] hover:bg-[var(--riafco-orange)] text-white rounded-md disabled:opacity-60"
                                            >
                                                {isSubmitting ? '…' : t('footer.newsletter.subscribeBtn')}
                                            </button>

                                            {subscriptionStatus === 'success' && (
                                                <span className="text-green-200 mt-2">
                                                    {t('footer.newsletter.success')}
                                                </span>
                                            )}
                                            {subscriptionStatus === 'error' && (
                                                <span className="text-red-200 mt-2">
                                                    {t('footer.newsletter.error')}
                                                </span>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="py-[30px] px-0 border-t border-gray-200/20">
                <div className="container relative text-center">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="md:text-start text-center">
                            <p className="mb-0 text-slate-300">
                                {settings.footer
                                    ? settings.footer
                                    : t('footer.copyrightDefault', { year, siteName })}
                            </p>
                        </div>
                        <div className="md:text-end text-center mt-4 md:mt-0 space-x-4">
                            <Link to="/réglement-interieur" className="text-slate-300 hover:text-[var(--riafco-orange)]">
                                {t('footer.legal.mentions')}
                            </Link>
                            <Link to="/confidentialité" className="text-slate-300 hover:text-[var(--riafco-orange)]">
                                {t('footer.legal.privacy')}
                            </Link>
                            <Link to="/terme-et-condition" className="text-slate-300 hover:text-[var(--riafco-orange)]">
                                {t('footer.legal.terms')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
