// import { Link } from 'react-router-dom';

// import ab03 from '../../assets/images/about/ab03.jpg';
// import ab02 from '../../assets/images/about/ab02.jpg';
// import ab01 from '../../assets/images/about/ab01.jpg';

// import Navbar from '../../component/Navbar/navbar'
// import Footer from '../../component/Footer/footer';
// import CookieModal from '../../component/cookieModal';
// import ManagementTeam from '../../component/managementTeam';
// import CompanyLogo from '../../component/companyLogo';


// import TinySlider from 'tiny-slider-react';
// import CountUp from 'react-countup';
// import { feedback } from '../../data/data';
// import { consultingAbout, consultingProduct, consultingServices } from '../../data/dataTwo';
// import { FaArrowRight } from 'react-icons/fa';
// import { FiAirplay } from 'react-icons/fi';
// import { useEffect } from 'react';
// import activityService from '../../services/activityService';

// const settings = {
//     container: '.tiny-single-item',
//     items: 1,
//     controls: false,
//     mouseDrag: true,
//     loop: true,
//     rewind: true,
//     autoplay: true,
//     autoplayButtonOutput: false,
//     autoplayTimeout: 3000,
//     navPosition: "bottom",
//     speed: 400,
//     gutter: 16,
// }
// export default function ActiviteSection() {
//     useEffect(() => {
//         const htmlTag = document.getElementsByTagName("html")[0]
//         htmlTag.classList.add('light');
//         htmlTag.classList.remove('dark')

//         fetchActivity();
//     });

//     const fetchActivity = () => {
//         try {
//             const response = activityService.getAll();
//             console.log(response)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <>

//             <section className="relative md:py-24 py-16">
//                 <div className="container relative">
//                     <div className="grid grid-cols-1 pb-8 text-center">
//                         <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Business Consulting Services</h3>

//                         <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.</p>
//                     </div>

//                     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
//                         {consultingServices.map((item, index) => {
//                             return (
//                                 <div className="group relative" key={index}>
//                                     <div className="relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden">
//                                         <img src={item.image} className="" alt="" />
//                                         <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 duration-500 ease-in-out"></div>
//                                     </div>

//                                     <div className="mt-6">
//                                         <Link to="#" className="text-xl font-semibold hover:text-indigo-600 transition-all duration-500 ease-in-out">{item.title}</Link>

//                                         <p className="text-slate-400 mt-4">{item.desc}</p>

//                                         <div className="mt-4">
//                                             <Link to="#" className="hover:text-indigo-600 duration-500 ease-in-out font-semibold"><span className="hidden group-hover:inline-block">Read More</span> <FaArrowRight className="ms-2 text-[10px] inline" /></Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </div>
//             </section>

           
//         </>
//     )
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { activityService } from '../../services/activityService';

export default function ActiviteSection(props) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await activityService.getAll(1, 3); // Récupère 3 activités
                if (response.data.success) {
                    setActivities(response.data.news.filter(activity => activity.status === "PUBLISHED"));
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des activités :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (loading) {
        return <div className={props.className}>Chargement des activités...</div>;
    }

    return (
        <div className={props.className}>
            <div className="grid md:grid-cols-12 grid-cols-1 items-center wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                <div className="md:col-span-6">
                    <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">Activités RIAFCO</h6>
                   
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                        Découvrez nos <span className="text-[--riafco-blue]">dernières activités</span> <br />
                        et projets en Afrique
                    </h3>
                </div>
                <div className="md:col-span-6">
                    <p className="text-slate-600 max-w-xl">
                        Suivez les initiatives, événements et ressources partagées par RIAFCO pour un développement durable en Afrique.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <div
                            key={activity.id}
                            className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden wow animate__animated animate__fadeInUp"
                            data-wow-delay={index * 0.1 + "s"}
                        >
                            {activity.image && (
                                <img
                                    src={activity.image}
                                    alt={activity.title_fr || "Activité RIAFCO"}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="content p-6">
                                <div className="flex items-center mb-3">
                                    {activity.author?.profilePic && (
                                        <img
                                            src={activity.author.profilePic}
                                            alt={activity.author.firstName}
                                            className="size-8 rounded-full mr-2"
                                        />
                                    )}
                                    <span className="text-sm text-slate-600">
                                        {activity.author?.firstName} {activity.author?.lastName} • {activity.formattedPublishedAt}
                                    </span>
                                </div>
                                <Link
                                    to={`/activities/${activity.id}`}
                                    className="title h5 text-lg font-medium hover:text-[--riafco-blue] duration-500 ease-in-out block mb-2"
                                >
                                    {activity.title_fr || activity.title_en || "Activité RIAFCO"}
                                </Link>
                                <p className="text-slate-600 mt-3">
                                    {activity.contentPreview_fr || activity.contentPreview_en || "Découvrez les détails de cette activité..."}
                                </p>
                                <div className="mt-4">
                                    <Link
                                        to={`/activities/${activity.id}`}
                                        className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none
                    after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto
                    after:bottom-0 after:start-0 after:duration-500 hover:text-[--riafco-blue] after:bg-[--riafco-blue] duration-500"
                                    >
                                        Lire la suite <FaArrowRight className="ms-2 text-[10px]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-600 col-span-full text-center py-8">
                        Aucune activité publiée pour le moment.
                    </p>
                )}
            </div>

            {activities.length > 0 && (
                <div className="mt-10 text-center">
                    <Link
                        to="/activities"
                        className="py-2 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center
            bg-[--riafco-blue] hover:bg-[--riafco-blue-hover] border-[--riafco-blue] hover:border-[--riafco-blue-hover]
            text-white rounded-md"
                    >
                        Voir toutes les activités <FaArrowRight className="ms-2 text-[10px]" />
                    </Link>
                </div>
            )}
        </div>
    );
}
