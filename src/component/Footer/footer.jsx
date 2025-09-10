// import settingsService from '../../services/settingsService';

// import { Link } from 'react-router-dom';
// import logo_light from '../../assets/images/riafco-logo-blanc-110.png';
// import { FaFacebookF, FaLinkedin, FaTwitter, FaInstagram, FaRegEnvelope } from 'react-icons/fa';
// import { MdKeyboardArrowRight } from 'react-icons/md';
// import * as Icon from 'react-feather';
// import { useEffect, useState } from 'react';

// export default function Footer() {
//     const [settinsg, setSettings] = useState(null)

//     useEffect(() => {
//         const fetchSettinsg = async () => {
//             try {
//                 const response = await settingsService.getAll()
//                 console.log(response.data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchSettinsg()
//     }, [])


//     return (
//         <footer className="relative bg-[var(--riafco-blue)] text-gray-200">
//             <div className="container mx-auto px-4">
//                 <div className="py-[60px] px-0">
//                     <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
//                         {/* Logo et description */}
//                         <div className="lg:col-span-4 md:col-span-12">
//                             <Link to="/" className="focus:outline-none">
//                                 <img src={logo_light} alt="RIAFCO Logo" className="h-16" />
//                             </Link>
//                             <p className="mt-6 text-gray-300">
//                                 RIAFCO est une organisation dédiée à la promotion de la collaboration et de l'innovation en Afrique.
//                                 Découvrez nos actualités, ressources et événements pour nos membres et partenaires.
//                             </p>
//                             {/* Réseaux sociaux */}
//                             <ul className="flex space-x-2 mt-5">
//                                 {[
//                                     { icon: <FaFacebookF />, link: "https://facebook.com/riafco" },
//                                     { icon: <FaLinkedin />, link: "https://linkedin.com/company/riafco" },
//                                     { icon: <FaTwitter />, link: "https://twitter.com/riafco" },
//                                     { icon: <FaInstagram />, link: "https://instagram.com/riafco" },
//                                     { icon: <FaRegEnvelope />, link: "mailto:contact@riafco.org" },
//                                 ].map((social, index) => (
//                                     <li key={index}>
//                                         <Link
//                                             to={social.link}
//                                             target="_blank"
//                                             className="size-9 inline-flex items-center justify-center rounded-md bg-[var(--riafco-orange)] hover:bg-opacity-90 text-white transition-colors"
//                                         >
//                                             {social.icon}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Liens : À Propos */}
//                         <div className="lg:col-span-2 md:col-span-4">
//                             <h5 className="tracking-[1px] text-white font-semibold">À Propos</h5>
//                             <ul className="list-none footer-list mt-6 space-y-2">
//                                 {[
//                                     { to: "/a-propos/gouvernance", label: "Gouvernance" },
//                                     { to: "/a-propos/equipe", label: "Équipe" },
//                                     { to: "/a-propos/historique", label: "Historique" },
//                                     { to: "/a-propos/reglement-interieur", label: "Règlement intérieur" },
//                                 ].map((item, index) => (
//                                     <li key={index}>
//                                         <Link
//                                             to={item.to}
//                                             className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
//                                         >
//                                             <MdKeyboardArrowRight className="text-xl me-1" /> {item.label}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Liens : Membres et Ressources */}
//                         <div className="lg:col-span-2 md:col-span-4">
//                             <h5 className="tracking-[1px] text-white font-semibold">Membres</h5>
//                             <ul className="list-none footer-list mt-6 space-y-2">
//                                 {[
//                                     { to: "/membres", label: "Carte des membres" },
//                                     { to: "/espace-membre", label: "Espace membre" },
//                                 ].map((item, index) => (
//                                     <li key={index}>
//                                         <Link
//                                             to={item.to}
//                                             className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
//                                         >
//                                             <MdKeyboardArrowRight className="text-xl me-1" /> {item.label}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                             <h5 className="tracking-[1px] text-white font-semibold mt-8">Ressources</h5>
//                             <ul className="list-none footer-list mt-6 space-y-2">
//                                 <li>
//                                     <Link
//                                         to="/ressources"
//                                         className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
//                                     >
//                                         <MdKeyboardArrowRight className="text-xl me-1" /> Bibliothèque
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Liens : Événements et Contact */}
//                         <div className="lg:col-span-2 md:col-span-4">
//                             <h5 className="tracking-[1px] text-white font-semibold">Événements</h5>
//                             <ul className="list-none footer-list mt-6 space-y-2">
//                                 <li>
//                                     <Link
//                                         to="/evenements"
//                                         className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
//                                     >
//                                         <MdKeyboardArrowRight className="text-xl me-1" /> Agenda
//                                     </Link>
//                                 </li>
//                             </ul>
//                             <h5 className="tracking-[1px] text-white font-semibold mt-8">Contact</h5>
//                             <ul className="list-none footer-list mt-6 space-y-2">
//                                 <li>
//                                     <Link
//                                         to="/contact"
//                                         className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
//                                     >
//                                         <MdKeyboardArrowRight className="text-xl me-1" /> Nous contacter
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Newsletter */}
//                         <div className="lg:col-span-2 md:col-span-6">
//                             <h5 className="tracking-[1px] text-white font-semibold">Newsletter</h5>
//                             <p className="mt-6 text-gray-300">
//                                 Abonnez-vous pour recevoir les dernières actualités et événements de RIAFCO.
//                             </p>
//                             <form className="mt-4">
//                                 <div className="grid grid-cols-1 gap-3">
//                                     <div className="relative">
//                                         <Icon.Mail className="absolute left-3 top-3 text-gray-400" />
//                                         <input
//                                             type="email"
//                                             className="w-full py-2 px-10 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--riafco-orange)] placeholder:text-gray-400"
//                                             placeholder="Votre email"
//                                             name="email"
//                                             required
//                                         />
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="py-2 px-5 bg-[var(--riafco-orange)] hover:bg-opacity-90 text-white font-semibold rounded-md transition-colors"
//                                     >
//                                         S'abonner
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Copyright */}
//             <div className="py-[30px] px-0 border-t border-gray-800">
//                 <div className="container mx-auto px-4 text-center">
//                     <p className="mb-0 text-gray-300">
//                         © {new Date().getFullYear()} RIAFCO. Tous droits réservés.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// }

import { Link } from 'react-router-dom';
import logo_light from '../../assets/images/riafco-logo-blanc-110.png';
import { FaFacebookF, FaLinkedin, FaTwitter, FaInstagram, FaRegEnvelope } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';
import settingsService from '../../services/settingsService';

export default function Footer() {
    const [settings, setSettings] = useState(null);

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

    // Réseaux sociaux dynamiques
    const socialMediaLinks = settings?.socialMedia ? [
        { icon: <FaTwitter />, link: settings.socialMedia.twitter },
        { icon: <FaFacebookF />, link: settings.socialMedia.facebook },
        { icon: <FaLinkedin />, link: settings.socialMedia.linkedin },
        { icon: <FaInstagram />, link: "https://instagram.com/riafco" }, // Par défaut si non fourni
        { icon: <FaRegEnvelope />, link: `mailto:${settings?.contactEmail || "contact@riafco.org"}` },
    ] : [];

    return (
        <footer className="relative bg-[var(--riafco-blue)] text-gray-200">
            <div className="container mx-auto px-4">
                <div className="py-[60px] px-0">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        {/* Logo et description */}
                        <div className="lg:col-span-4 md:col-span-12">
                            <Link to="/" className="focus:outline-none">
                                <img src={logo_light} alt="RIAFCO Logo" className="h-22" />
                            </Link>
                            <p className="mt-6 text-gray-300">
                                {settings?.siteName || "RIAFCO est une organisation dédiée à la promotion de la collaboration et de l'innovation en Afrique."}
                            </p>
                            {/* Réseaux sociaux dynamiques */}
                            <ul className="flex space-x-2 mt-5">
                                {socialMediaLinks.map((social, index) => (
                                    <li key={index}>
                                        <Link
                                            to={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="size-9 inline-flex items-center justify-center rounded-md bg-[var(--riafco-orange)] hover:bg-opacity-90 text-white transition-colors"
                                        >
                                            {social.icon}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Adresse et contact */}
                            <div className="mt-6 text-gray-300">
                                <p>{settings?.contactAddress || "Dakar, Sénégal"}</p>
                                <p className="mt-1">Tél: {settings?.contactPhone || "78 453 75 47"}</p>
                                <p className="mt-1">Email: {settings?.contactEmail || "contact@riafco.org"}</p>
                            </div>
                        </div>

                        {/* Liens : À Propos */}
                        <div className="lg:col-span-2 md:col-span-4">
                            <h5 className="tracking-[1px] text-white font-semibold">À Propos</h5>
                            <ul className="list-none footer-list mt-6 space-y-2">
                                {[
                                    { to: "/a-propos/gouvernance", label: "Gouvernance" },
                                    { to: "/a-propos/equipe", label: "Équipe" },
                                    { to: "/a-propos/historique", label: "Historique" },
                                    { to: "/a-propos/reglement-interieur", label: "Règlement intérieur" },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.to}
                                            className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
                                        >
                                            <MdKeyboardArrowRight className="text-xl me-1" /> {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Liens : Membres et Ressources */}
                        <div className="lg:col-span-2 md:col-span-4">
                            <h5 className="tracking-[1px] text-white font-semibold">Membres</h5>
                            <ul className="list-none footer-list mt-6 space-y-2">
                                {[
                                    { to: "/membres", label: "Carte des membres" },
                                    { to: "/espace-membre", label: "Espace membre" },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.to}
                                            className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
                                        >
                                            <MdKeyboardArrowRight className="text-xl me-1" /> {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <h5 className="tracking-[1px] text-white font-semibold mt-8">Ressources</h5>
                            <ul className="list-none footer-list mt-6 space-y-2">
                                <li>
                                    <Link
                                        to="/ressources"
                                        className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
                                    >
                                        <MdKeyboardArrowRight className="text-xl me-1" /> Bibliothèque
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Liens : Événements et Contact */}
                        <div className="lg:col-span-2 md:col-span-4">
                            <h5 className="tracking-[1px] text-white font-semibold">Événements</h5>
                            <ul className="list-none footer-list mt-6 space-y-2">
                                <li>
                                    <Link
                                        to="/evenements"
                                        className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
                                    >
                                        <MdKeyboardArrowRight className="text-xl me-1" /> Agenda
                                    </Link>
                                </li>
                            </ul>
                            <h5 className="tracking-[1px] text-white font-semibold mt-8">Contact</h5>
                            <ul className="list-none footer-list mt-6 space-y-2">
                                <li>
                                    <Link
                                        to="/contact"
                                        className="text-gray-300 hover:text-[var(--riafco-orange)] transition-colors inline-flex items-center"
                                    >
                                        <MdKeyboardArrowRight className="text-xl me-1" /> Nous contacter
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="lg:col-span-2 md:col-span-6">
                            <h5 className="tracking-[1px] text-white font-semibold">Newsletter</h5>
                            <p className="mt-6 text-gray-300">
                                Abonnez-vous pour recevoir les dernières actualités et événements de RIAFCO.
                            </p>
                            <form
                                className="mt-4"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const email = e.target.email.value;
                                    try {
                                        const response = await fetch('/api/newsletter/subscribe', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ email }),
                                        });
                                        if (response.ok) {
                                            alert('Merci pour votre abonnement !');
                                            e.target.reset();
                                        } else {
                                            alert('Une erreur est survenue. Veuillez réessayer.');
                                        }
                                    } catch (error) {
                                        console.error("Erreur lors de l'abonnement :", error);
                                        alert('Une erreur est survenue. Veuillez réessayer.');
                                    }
                                }}
                            >
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="relative">
                                        <Icon.Mail className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            className="w-full py-2 px-10 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--riafco-orange)] placeholder:text-gray-400"
                                            placeholder="Votre email"
                                            name="email"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="py-2 px-5 bg-[var(--riafco-orange)] hover:bg-opacity-90 text-white font-semibold rounded-md transition-colors"
                                    >
                                        S'abonner
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="py-[30px] px-0 border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-0 text-gray-300">
                        {settings?.footer || `© ${new Date().getFullYear()} RIAFCO. Tous droits réservés.`}
                    </p>
                </div>
            </div>
        </footer>
    );
}
