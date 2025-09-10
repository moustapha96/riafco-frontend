// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../../component/Navbar/navbar';
// import Footer from '../../component/Footer/footer';
// import * as Icon from 'react-feather';
// import { MdKeyboardArrowRight } from 'react-icons/md';
// import settingsService from '../../services/settingsService';
// import riafcoAbout from "../../assets/images/riafco-about.jpg";

// export default function ContactPage() {
//     const [config, setConfig] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const htmlTag = document.getElementsByTagName("html")[0];
//         htmlTag.classList.add('light');
//         htmlTag.classList.remove('dark');

//         const fetchConfig = async () => {
//             try {
//                 const response = await settingsService.getAll();
//                 setConfig(response.data);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération de la configuration:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchConfig();
//     }, []);

//     return (
//         <>
//             <Navbar navClass="nav-light" />
//             <section className="relative table w-full py-36 bg-[url('../../assets/images/company/aboutus.jpg')] bg-center bg-no-repeat bg-cover">
//                 <div className="absolute inset-0 bg-slate-900/80"></div>
//                 <div className="container relative">
//                     <div className="grid grid-cols-1 pb-8 text-center mt-10">
//                         <h3 className="md:text-4xl text-3xl md:leading-normal tracking-wide leading-normal font-medium text-white">
//                             Nous contacter
//                         </h3>
//                     </div>
//                 </div>
//                 <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
//                     <ul className="tracking-[0.5px] mb-0 inline-flex space-x-1">
//                         <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
//                             <Link to="/">Accueil</Link>
//                         </li>
//                         <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
//                             <MdKeyboardArrowRight className="text-xl" />
//                         </li>
//                         <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
//                             Contact
//                         </li>
//                     </ul>
//                 </div>
//             </section>

//             <div className="relative">
//                 <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
//                     <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
//                     </svg>
//                 </div>
//             </div>

//             {/* Section des coordonnées */}
//             <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
//                 <div className="container relative">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
//                         {/* Adresse */}
//                         <div className="text-center px-6 mt-6">
//                             <div className="size-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
//                                 <Icon.MapPin className="size-7" />
//                             </div>
//                             <div className="content mt-7">
//                                 <h5 className="title h5 text-xl font-medium">Notre adresse</h5>
//                                 <p className="text-slate-400 mt-3">
//                                     {loading ? "Chargement..." : config?.contactAddress || "Dakar, Sénégal"}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Email */}
//                         <div className="text-center px-6 mt-6">
//                             <div className="size-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
//                                 <Icon.Mail className="size-7" />
//                             </div>
//                             <div className="content mt-7">
//                                 <h5 className="title h5 text-xl font-medium">Notre email</h5>
//                                 <p className="text-slate-400 mt-3">
//                                     {loading ? "Chargement..." : config?.contactEmail || "contact@riafco.org"}
//                                 </p>
//                                 <div className="mt-5">
//                                     <Link
//                                         to={`mailto:${config?.contactEmail || "contact@riafco.org"}`}
//                                         className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500"
//                                     >
//                                         Nous écrire
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Téléphone */}
//                         <div className="text-center px-6 mt-6">
//                             <div className="size-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
//                                 <Icon.Phone className="size-7" />
//                             </div>
//                             <div className="content mt-7">
//                                 <h5 className="title h5 text-xl font-medium">Nos téléphones</h5>
//                                 <p className="text-slate-400 mt-3">
//                                     {loading ? "Chargement..." : (
//                                         <>
//                                             {config?.contactPhone && <div>Fixe: {config.contactPhone}</div>}
//                                             {config?.contactMobile && <div>Mobile: {config.contactMobile}</div>}
//                                         </>
//                                     )}
//                                 </p>
//                                 <div className="mt-5">
//                                     <Link
//                                         to={`tel:${config?.contactPhone || "+221784537547"}`}
//                                         className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500"
//                                     >
//                                         Nous appeler
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Section du formulaire de contact */}
//             <section className="relative md:py-24 py-16">
//                 <div className="container relative">
//                     <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
//                         <div className="lg:col-span-6 md:col-span-6">
//                             <img src={riafcoAbout} alt="Contact RIAFCO" />
//                         </div>
//                         <div className="lg:col-span-5 md:col-span-6">
//                             <div className="lg:ms-6">
//                                 <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm dark:shadow-gray-800 p-6">
//                                     <h3 className="mb-6 text-2xl leading-normal font-medium">Contactez-nous</h3>
//                                     <form>
//                                         <div className="grid lg:grid-cols-12 lg:gap-6">
//                                             <div className="lg:col-span-6 mb-5">
//                                                 <div className="text-start">
//                                                     <label htmlFor="name" className="font-semibold">Votre nom:</label>
//                                                     <div className="form-icon relative mt-2">
//                                                         <Icon.User className="size-4 absolute top-3 start-4"></Icon.User>
//                                                         <input
//                                                             name="name"
//                                                             id="name"
//                                                             type="text"
//                                                             className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
//                                                             placeholder="Votre nom"
//                                                             required
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="lg:col-span-6 mb-5">
//                                                 <div className="text-start">
//                                                     <label htmlFor="email" className="font-semibold">Votre email:</label>
//                                                     <div className="form-icon relative mt-2">
//                                                         <Icon.Mail className="size-4 absolute top-3 start-4"></Icon.Mail>
//                                                         <input
//                                                             name="email"
//                                                             id="email"
//                                                             type="email"
//                                                             className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
//                                                             placeholder="Votre email"
//                                                             required
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1">
//                                             <div className="mb-5">
//                                                 <div className="text-start">
//                                                     <label htmlFor="subject" className="font-semibold">Sujet:</label>
//                                                     <div className="form-icon relative mt-2">
//                                                         <Icon.Book className="size-4 absolute top-3 start-4"></Icon.Book>
//                                                         <input
//                                                             name="subject"
//                                                             id="subject"
//                                                             className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
//                                                             placeholder="Sujet de votre message"
//                                                             required
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="mb-5">
//                                                 <div className="text-start">
//                                                     <label htmlFor="comments" className="font-semibold">Votre message:</label>
//                                                     <div className="form-icon relative mt-2">
//                                                         <Icon.MessageCircle className="size-4 absolute top-3 start-4"></Icon.MessageCircle>
//                                                         <textarea
//                                                             name="comments"
//                                                             id="comments"
//                                                             className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
//                                                             placeholder="Votre message..."
//                                                             required
//                                                         ></textarea>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <button
//                                             type="submit"
//                                             className="py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md justify-center flex items-center"
//                                         >
//                                             Envoyer le message
//                                         </button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Section des réseaux sociaux */}
//             <section className="relative md:py-16 py-12 bg-gray-50 dark:bg-slate-800">
//                 <div className="container relative">
//                     <div className="text-center mb-12">
//                         <h3 className="md:text-2xl text-xl font-medium mb-4">Suivez-nous sur les réseaux sociaux</h3>
//                         <div className="flex justify-center gap-6">
//                             {loading ? (
//                                 <p>Chargement des réseaux sociaux...</p>
//                             ) : (
//                                 <>
//                                     {config?.socialMedia?.facebook && (
//                                         <Link
//                                             to={config.socialMedia.facebook}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="size-12 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
//                                         >
//                                             <Icon.Facebook className="size-5" />
//                                         </Link>
//                                     )}
//                                     {config?.socialMedia?.twitter && (
//                                         <Link
//                                             to={config.socialMedia.twitter}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="size-12 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
//                                         >
//                                             <Icon.Twitter className="size-5" />
//                                         </Link>
//                                     )}
//                                     {config?.socialMedia?.linkedin && (
//                                         <Link
//                                             to={config.socialMedia.linkedin}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="size-12 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
//                                         >
//                                             <Icon.Linkedin className="size-5" />
//                                         </Link>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Carte Google Maps */}
//             <div className="container-fluid relative">
//                 <div className="grid grid-cols-1">
//                     <div className="w-full leading-[0] border-0">
//                         <iframe
//                             title="Localisation RIAFCO"
//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.9999999999995!2d-17.46766932416432!3d14.716677000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173d78f77b3bd%3A0x4f753f3f8d8a8f0!2sDakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
//                             style={{ border: 0 }}
//                             className="w-full h-[500px]"
//                             allowFullScreen
//                             loading="lazy"
//                         ></iframe>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </>
//     );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import * as Icon from 'react-feather';
import { MdKeyboardArrowRight } from 'react-icons/md';
import contactImage from '../../assets/images/contact.svg';
import contactService from '../../services/contactService';
import settingsService from '../../services/settingsService';
import { toast, ToastContainer } from 'react-toastify';
import riafcoAbout2 from "../../assets/images/riafco-about-2.jpg";
import riafcoAbout1 from "../../assets/images/riafco-about-1.jpg";
import { Button } from 'antd';

export default function ContactPage() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        const fetchConfig = async () => {
            try {
                const response = await settingsService.getAll();
                console.log(response)
                setConfig(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la configuration:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await contactService.create(formData);
            console.log(response) 
            toast.success("Votre message a été envoyé avec succès! Nous vous contacterons bientôt.");
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
            toast.error("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <Navbar navClass="nav-light" />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <section className="relative table w-full py-36 bg-[url('../../assets/images/company/aboutus.jpg')] bg-center bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal tracking-wide leading-normal font-medium text-white">
                            Nous contacter
                        </h3>
                    </div>
                </div>
                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="tracking-[0.5px] mb-0 inline-flex space-x-1">
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
                            <Link to="/">Accueil</Link>
                        </li>
                        <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
                            <MdKeyboardArrowRight className="text-xl" />
                        </li>
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">
                            Contact
                        </li>
                    </ul>
                </div>
            </section>

            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            {/* Section des coordonnées */}
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        {/* Adresse */}
                        <div className="text-center px-6 mt-6">
                            <div className="size-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <Icon.MapPin className="size-7" />
                            </div>
                            <div className="content mt-7">
                                <h5 className="title h5 text-xl font-medium">Notre adresse</h5>
                                <p className="text-slate-400 mt-3">
                                    {loading ? "Chargement..." : config?.contactAddress || "Dakar, Sénégal - Boulevard Habib Bourguiba"}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="text-center px-6 mt-6">
                            <div className="size-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <Icon.Mail className="size-7" />
                            </div>
                            <div className="content mt-7">
                                <h5 className="title h5 text-xl font-medium">Notre email</h5>
                                <p className="text-slate-400 mt-3">
                                    {loading ? "Chargement..." : config?.contactEmail || "contact@riafco.org"}
                                </p>
                                <div className="mt-5">
                                    <Link
                                        to={`mailto:${config?.contactEmail || "contact@riafco.org"}`}
                                        className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500"
                                    >
                                        Nous écrire
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Téléphone */}
                        <div className="text-center px-6 mt-6">
                            <div className="size-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto">
                                <Icon.Phone className="size-7" />
                            </div>
                            <div className="content mt-7">
                                <h5 className="title h5 text-xl font-medium">Nos téléphones</h5>
                                <p className="text-slate-400 mt-3">
                                    {loading ? "Chargement..." : (
                                        <>
                                            {config?.contactPhone && <div>Fixe: {config.contactPhone}</div>}
                                            {config?.contactMobile && <div>Mobile: {config.contactMobile}</div>}
                                        </>
                                    )}
                                </p>
                                <div className="mt-5">
                                    <Link
                                        to={`tel:${config?.contactPhone || "+221784537547"}`}
                                        className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500"
                                    >
                                        Nous appeler
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section du formulaire de contact */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-6 md:col-span-6">
                            <img src={riafcoAbout1} alt="Contact RIAFCO" />
                        </div>
                        <div className="lg:col-span-6 md:col-span-6">
                            <div className="lg:ms-5">
                                <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm dark:shadow-gray-800 p-6">
                                    <h3 className="mb-6 text-2xl leading-normal font-medium">Contactez-nous</h3>
                                    <p className="text-slate-500 mb-6">
                                        Nous sommes à votre disposition pour répondre à toutes vos questions concernant
                                        les institutions de financement des collectivités locales en Afrique.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <div className="text-start">
                                                    <label htmlFor="name" className="font-semibold block mb-2">
                                                        Votre nom <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="form-icon relative">
                                                        <Icon.User className="size-4 absolute top-3 start-4" />
                                                        <input
                                                            name="name"
                                                            id="name"
                                                            type="text"
                                                            className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                                            placeholder="Votre nom complet"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:col-span-6 mb-5">
                                                <div className="text-start">
                                                    <label htmlFor="email" className="font-semibold block mb-2">
                                                        Votre email <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="form-icon relative">
                                                        <Icon.Mail className="size-4 absolute top-3 start-4" />
                                                        <input
                                                            name="email"
                                                            id="email"
                                                            type="email"
                                                            className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                                            placeholder="Votre adresse email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <div className="text-start">
                                                    <label htmlFor="subject" className="font-semibold block mb-2">
                                                        Sujet <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="form-icon relative">
                                                        <Icon.Book className="size-4 absolute top-3 start-4" />
                                                        <input
                                                            name="subject"
                                                            id="subject"
                                                            className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                                            placeholder="Sujet de votre message"
                                                            value={formData.subject}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <div className="text-start">
                                                    <label htmlFor="message" className="font-semibold block mb-2">
                                                        Votre message <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="form-icon relative">
                                                        <Icon.MessageCircle className="size-4 absolute top-3 start-4" />
                                                        <textarea
                                                            name="message"
                                                            id="message"
                                                            className="form-input ps-11 w-full py-2 px-3 h-32 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                                                            placeholder="Décrivez votre demande ou question..."
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`py-2 px-5  ant-btn-primary font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md justify-center flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="mr-2">Envoi en cours...</span>
                                                    <span className="animate-spin">
                                                        <Icon.Loader2 className="size-4" />
                                                    </span>
                                                </>
                                            ) : (
                                                'Envoyer le message'
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des réseaux sociaux */}
            <section className="relative md:py-16 py-12 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="text-center mb-12">
                        <h3 className="md:text-2xl text-xl font-medium mb-4">Suivez-nous sur les réseaux sociaux</h3>
                        <div className="flex justify-center gap-6">
                            {loading ? (
                                <p className="text-slate-500">Chargement des réseaux sociaux...</p>
                            ) : (
                                <>
                                    {config?.socialMedia?.facebook && (
                                        <Link
                                            to={config.socialMedia.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="size-12 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <Icon.Facebook className="size-5" />
                                        </Link>
                                    )}
                                    {config?.socialMedia?.twitter && (
                                        <Link
                                            to={config.socialMedia.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="size-12 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                                            aria-label="Twitter"
                                        >
                                            <Icon.Twitter className="size-5" />
                                        </Link>
                                    )}
                                    {config?.socialMedia?.linkedin && (
                                        <Link
                                            to={config.socialMedia.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="size-12 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <Icon.Linkedin className="size-5" />
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Carte Google Maps */}
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-[0] border-0">
                        <iframe
                            title="Localisation RIAFCO - Dakar, Sénégal"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.9999999999995!2d-17.46766932416432!3d14.716677000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173d78f77b3bd%3A0x4f753f3f8d8a8f0!2sDakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
                            style={{ border: 0 }}
                            className="w-full h-[500px]"
                            allowFullScreen
                            loading="lazy"
                            aria-label="Carte de localisation du RIAFCO à Dakar, Sénégal"
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
