
import { MdOutlineEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';

import settingsService from '../../services/settingsService';
import contactService from '../../services/contactService';

import riafcoAbout1 from "../../assets/images/riafco-about-1.jpg";
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: null, message: "" });
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.comments.value,
        };
        try {
            const response = await contactService.create(formData);
            setSubmitStatus({ success: true, message: t("contact.submitSuccess") });
            e.target.reset();
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            setSubmitStatus({ success: false, message: error.errors?.[0]?.msg || t("contact.submitError") });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative md:py-24 py-16 overflow-hidden">
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                    <div className="lg:col-span-5 md:col-span-6">
                        <div className="lg:me-8">
                            <div className="relative">
                                <img src={riafcoAbout1} alt={t("contact.imageAlt")} />
                                <div className="overflow-hidden absolute size-[512px] bg-[var(--riafco-blue)]/10 top-1/4 start-0 end-0 align-middle -z-1 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7 md:col-span-6">
                        <div className="lg:ms-5">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm dark:shadow-gray-800 p-6">
                                <h3 className="mb-6 text-2xl leading-normal font-medium text-[var(--riafco-blue)]">
                                    {t("contact.title")}
                                </h3>
                                <p className="text-slate-500 mb-6">
                                    {t("contact.description")}
                                </p>
                                {submitStatus.message && (
                                    <div className={`mb-4 p-3 rounded-md ${submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {submitStatus.message}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="grid lg:grid-cols-12 lg:gap-6">
                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-start">
                                                <label htmlFor="name" className="font-semibold">{t("form.nom")}</label>
                                                <div className="form-icon relative mt-2">
                                                    <Icon.User className="size-4 absolute top-3 start-4" />
                                                    <input
                                                        name="name"
                                                        id="name"
                                                        type="text"
                                                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[var(--riafco-orange)] dark:border-gray-800 dark:focus:border-[var(--riafco-orange)] focus:ring-0"
                                                        placeholder={t("form.nom")}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-start">
                                                <label htmlFor="email" className="font-semibold">{t("form.email")}</label>
                                                <div className="form-icon relative mt-2">
                                                    <Icon.Mail className="size-4 absolute top-3 start-4" />
                                                    <input
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[var(--riafco-orange)] dark:border-gray-800 dark:focus:border-[var(--riafco-orange)] focus:ring-0"
                                                        placeholder={t("form.email")}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div className="mb-5">
                                            <div className="text-start">
                                                <label htmlFor="subject" className="font-semibold">{t("form.sujet")}</label>
                                                <div className="form-icon relative mt-2">
                                                    <Icon.Book className="size-4 absolute top-3 start-4" />
                                                    <input
                                                        name="subject"
                                                        id="subject"
                                                        className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[var(--riafco-orange)] dark:border-gray-800 dark:focus:border-[var(--riafco-orange)] focus:ring-0"
                                                        placeholder={t("form.sujet")}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <div className="text-start">
                                                <label htmlFor="comments" className="font-semibold">{t("form.message")}</label>
                                                <div className="form-icon relative mt-2">
                                                    <Icon.MessageCircle className="size-4 absolute top-3 start-4" />
                                                    <textarea
                                                        name="comments"
                                                        id="comments"
                                                        className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-[var(--riafco-orange)] dark:border-gray-800 dark:focus:border-[var(--riafco-orange)] focus:ring-0"
                                                        placeholder={t("form.message")}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={isSubmitting ? <Icon.Loader className="animate-spin size-4 me-2" /> : <Icon.Book />}
                                        disabled={isSubmitting}
                                    >
                                        {t("form.envoyer")}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section des coordonnées */}
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                    {[
                        {
                            icon: <MdOutlineEmail className="text-3xl" />,
                            name: t("contact.contactInfo.email.title"),
                            desc: t("contact.contactInfo.email.desc"),
                            title: settings?.contactEmail || "contact@riafco.org",
                            link: `mailto:${settings?.contactEmail || "contact@riafco.org"}`,
                        },
                        {
                            icon: <Icon.Phone className="text-3xl" />,
                            name: t("contact.contactInfo.phone.title"),
                            desc: t("contact.contactInfo.phone.desc"),
                            title: settings?.contactPhone || "78 453 75 47",
                            link: `tel:${settings?.contactPhone || "784537547"}`,
                        },
                        {
                            icon: <Icon.MapPin className="text-3xl" />,
                            name: t("contact.contactInfo.address.title"),
                            desc: t("contact.contactInfo.address.desc"),
                            title: settings?.contactAddress || "Dakar, Boulevard Habib Bourguiba",
                        },
                    ].map((item, index) => (
                        <div className="text-center px-6" key={index}>
                            <div className="size-20 bg-[var(--riafco-blue)]/10 text-[var(--riafco-blue)] rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                {item.icon}
                            </div>
                            <div className="content mt-7">
                                <h5 className="text-xl font-semibold">{item.name}</h5>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                                <div className="mt-5">
                                    {item.link ? (
                                        <Link to={item.link} className="text-[var(--riafco-orange)] font-medium">
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <p className="text-[var(--riafco-orange)] font-medium">{item.title}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
