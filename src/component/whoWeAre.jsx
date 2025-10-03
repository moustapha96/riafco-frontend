// import { Link } from "react-router-dom";

// import ab03 from '../assets/images/about/ab03.jpg';
// import ab02 from '../assets/images/about/ab02.jpg';
// import ab01 from '../assets/images/about/ab01.jpg';

// import CountUp from 'react-countup';
// import { FaRegEnvelope } from "react-icons/fa";


// export default function WhoWeAre(){
//     return(
//         <div className="container relative">
//             <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
//                 <div className="lg:col-span-5 md:col-span-6">
//                     <div className="grid grid-cols-12 gap-6 items-center">
//                         <div className="col-span-6">
//                             <div className="grid grid-cols-1 gap-6">
//                                 <img src={ab03} className="shadow-sm rounded-md" alt="" />
//                                 <img src={ab02} className="shadow-sm rounded-md" alt="" />
//                             </div>
//                         </div>

//                         <div className="col-span-6">
//                             <div className="grid grid-cols-1 gap-6">
//                                 <img src={ab01} className="shadow-sm rounded-md" alt="" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="lg:col-span-7 md:col-span-6">
//                     <div className="lg:ms-5">
//                         <div className="flex mb-4">
//                             <span className="text-[var(--riafco-orange)]  text-2xl font-bold mb-0"><CountUp className="counter-value text-6xl font-bold" start={1} end={15}></CountUp>+</span>
//                             <span className="self-end font-medium ms-2">Years <br /> Experience</span>
//                         </div>

//                         <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Who we are ?</h3>

//                         <p className="text-slate-400 max-w-xl">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with &apos;real&apos; content.</p>

//                         <div className="mt-6">
//                             <Link to="/contact-one" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[var(--riafco-blue)] hover:bg-[var(--riafco-blue] border-[var(--riafco-blue)] hover:border-[var(--riafco-blue] text-white rounded-md me-2 mt-2"><FaRegEnvelope className="me-2 text-sm" /> Contact us</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaUsers, FaHandshake, FaGlobeAfrica, FaChartLine } from "react-icons/fa";
import CountUp from 'react-countup';



import riafcoTeam1 from '../assets/images/about/ab03.jpg';
import riafcoTeam2 from '../assets/images/about/ab02.jpg';
import riafcoTeam3 from '../assets/images/about/ab01.jpg';

export default function WhoWeAre() {
    // Données statistiques dynamiques (à remplacer par des données réelles de votre API)
    const stats = {
        yearsExperience: 8, // Années d'expérience du RIAFCO
        memberCountries: 15, // Nombre de pays membres
        localInstitutions: 22, // Nombre d'institutions locales partenaires
        projectsFunded: 47 // Nombre de projets financés
    };

    return (
        <div className="container relative md:py-16 py-12">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                {/* Section images */}
                <div className="lg:col-span-5 md:col-span-6">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-6">
                            <div className="grid grid-cols-1 gap-6">
                                <img
                                    src={riafcoTeam1}
                                    className="shadow-sm rounded-md w-full h-48 object-cover"
                                    alt="Membres du RIAFCO en réunion"
                                />
                                <img
                                    src={riafcoTeam2}
                                    className="shadow-sm rounded-md w-full h-32 object-cover"
                                    alt="Atelier de formation RIAFCO"
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="grid grid-cols-1 gap-6">
                                <img
                                    src={riafcoTeam3}
                                    className="shadow-sm rounded-md w-full h-64 object-cover"
                                    alt="Équipe dirigeante du RIAFCO"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section contenu */}
                <div className="lg:col-span-7 md:col-span-6">
                    <div className="lg:ms-5">
                        <div className="flex flex-wrap mb-6 gap-8">
                            {/* Statistiques clés */}
                            <div className="flex items-center">
                                <span className="text-[var(--riafco-orange)] text-2xl font-bold">
                                    <CountUp
                                        start={0}
                                        end={stats.yearsExperience}
                                        duration={2.5}
                                        className="counter-value text-4xl font-bold"
                                    />
                                    +
                                </span>
                                <span className="self-end font-medium ms-2 text-sm">
                                    Années<br />d'expérience
                                </span>
                            </div>

                            <div className="flex items-center">
                                <span className="text-[var(--riafco-orange)] text-2xl font-bold">
                                    <CountUp
                                        start={0}
                                        end={stats.memberCountries}
                                        duration={2.5}
                                        className="counter-value text-4xl font-bold"
                                    />
                                    +
                                </span>
                                <span className="self-end font-medium ms-2 text-sm">
                                    Pays<br />membres
                                </span>
                            </div>

                            <div className="flex items-center">
                                <span className="text-[var(--riafco-orange)] text-2xl font-bold">
                                    <CountUp
                                        start={0}
                                        end={stats.localInstitutions}
                                        duration={2.5}
                                        className="counter-value text-4xl font-bold"
                                    />
                                    +
                                </span>
                                <span className="self-end font-medium ms-2 text-sm">
                                    Institutions<br />partenaires
                                </span>
                            </div>
                        </div>

                        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            Qui sommes-nous ?
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mb-4">
                            Le <span className="font-semibold text-[var(--riafco-blue)]">RIAFCO</span> (Réseau des Institutions Africaines
                            de Financement des Collectivités Locales) est une organisation panafricaine qui vise à renforcer
                            les capacités des institutions financières locales pour soutenir le développement durable des territoires.
                        </p>

                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mb-6">
                            Depuis notre création, nous connectons les acteurs publics, les institutions financières et les partenaires
                            pour des projets communs visant à améliorer le financement des collectivités locales en Afrique.
                        </p>

                        {/* Nos valeurs */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-lg text-[var(--riafco-blue)] mb-3">Nos valeurs fondamentales</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: <FaUsers />, text: "Collaboration entre institutions" },
                                    { icon: <FaHandshake />, text: "Partenariats durables" },
                                    { icon: <FaGlobeAfrica />, text: "Impact panafricain" },
                                    { icon: <FaChartLine />, text: "Innovation financière" }
                                ].map((value, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="text-[var(--riafco-orange)] mr-3">{value.icon}</div>
                                        <span className="text-slate-600 dark:text-slate-400">{value.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link
                                to="/a-propos"
                                className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-[var(--riafco-blue)] hover:bg-[var(--riafco-blue-hover)] border-[var(--riafco-blue)] text-white rounded-md"
                            >
                                En savoir plus
                            </Link>

                            <Link
                                to="/contact"
                                className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-[var(--riafco-blue)]/10 border-[var(--riafco-blue)] text-[var(--riafco-blue)] hover:text-[var(--riafco-blue-hover)] rounded-md"
                            >
                                <FaRegEnvelope className="me-2" />
                                Nous contacter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
