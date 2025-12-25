

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import * as Icon from 'react-feather';
import settingsService from '../../services/settingsService';
import ContactSection from '../accueil/contactSection';
import HeaderBreakdumb from '../components/hearder-breakdumb';
import { useTranslation } from 'react-i18next';

import riafcoAbout from "../../assets/images/riafco-about.jpg";



export default function ContactPage() {
    const { t } = useTranslation();
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        const fetchConfig = async () => {
            try {
                const response = await settingsService.getAll();
                setConfig(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la configuration:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t('contact.header.title')}
                description={t('contact.header.description', { siteName: config?.siteName || '' })}
                // background={riafcoAbout}
            />

            {/* Ton formulaire / section de contact (peut être i18n-isé dans son composant aussi) */}
            <ContactSection />

            {/* Réseaux sociaux */}
            <section className="relative md:py-16 py-12 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="text-center mb-12">
                        <h3 className="md:text-2xl text-xl font-medium mb-4">
                            {t('contact.followUs')}
                        </h3>

                        <div className="flex justify-center gap-6">
                            {loading ? (
                                <p className="text-slate-500">{t('contact.loadingSocial')}</p>
                            ) : (
                                <>
                                    {config?.socialMedia?.facebook && (
                                        <Link
                                            to={config.socialMedia.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                                className="size-12 bg-[var(--riafco-blue)]/10 text-[var(--riafco-orange)] rounded-full flex items-center justify-center hover:bg-[var(--riafco-blue)] hover:text-white transition-colors"
                                                aria-label={t('contact.social.facebook')}
                                        >
                                            <Icon.Facebook className="size-5" />
                                        </Link>
                                    )}

                                    {config?.socialMedia?.twitter && (
                                        <Link
                                            to={config.socialMedia.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                                className="size-12 bg-[var(--riafco-blue)]/10 text-[var(--riafco-orange)] rounded-full flex items-center justify-center hover:bg-[var(--riafco-blue)] hover:text-white transition-colors"
                                                aria-label={t('contact.social.twitter')}
                                        >
                                            <Icon.Twitter className="size-5" />
                                        </Link>
                                    )}

                                        {config?.socialMedia?.linkedin && (
                                            <Link
                                                to={config.socialMedia.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-12 bg-[var(--riafco-blue)]/10 text-[var(--riafco-orange)] rounded-full flex items-center justify-center hover:bg-[var(--riafco-blue)] hover:text-white transition-colors"
                                                aria-label={t('contact.social.linkedin')}
                                            >
                                                <Icon.Linkedin className="size-5" />
                                            </Link>
                                        )}
                                        {config?.socialMedia?.instagram && (
                                            <Link
                                                to={config.socialMedia.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-12 bg-[var(--riafco-blue)]/10 text-[var(--riafco-orange)] rounded-full flex items-center justify-center hover:bg-[var(--riafco-blue)] hover:text-white transition-colors"
                                                aria-label={t('contact.social.instagram')}
                                            >
                                                <Icon.Instagram className="size-5" />
                                            </Link>
                                        )}

                                       
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Carte Google */}
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-[0] border-0">

                        <iframe
                            style={{ border: 0 }}
                            className="w-full h-[500px]"
                            allowFullScreen
                            loading="lazy"
                            aria-label={t('contact.map.aria')}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7961.022355998347!2d11.523842793579101!3d3.9142964000000178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc7d7aaaf2e75%3A0xc43b1a8efc0fdfe6!2sSANTA%20Barbara!5e0!3m2!1sfr!2ssn!4v1758617926635!5m2!1sfr!2ssn" ></iframe>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
