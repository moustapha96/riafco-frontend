/* eslint-disable react/no-unescaped-entities */


import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import BlogComment from '../../component/blogComment';
import { MdKeyboardArrowRight } from 'react-icons/md';
import activityService from '../../services/activityService';
import ActiviteUserDetail from './ActiviteUserDetail';

export default function ActiviteDetailPage() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        const fetchActivity = async () => {
            try {
                setLoading(true);
                const response = await activityService.getById(id);
                console.log(response)
                setActivity(response.activity);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'activité :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>Chargement...</p>
                </div>
            </>
        );
    }

    if (!activity) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>Activité non trouvée.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar navClass="nav-light" />

            <section className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/blog/bg.jpg')] bg-center bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="mb-3 text-3xl leading-normal font-medium text-white">
                            {activity.title_fr}
                        </h3>
                        <ul className="list-none mt-6">
                            <li className="inline-block font-semibold text-white/50 mx-5">
                                <span className="text-white block">Auteur :</span>
                                <span className="block">
                                    {activity.author.firstName} {activity.author.lastName}
                                </span>
                            </li>
                            <li className="inline-block font-semibold text-white/50 mx-5">
                                <span className="text-white block">Date :</span>
                                <span className="block">
                                    {new Date(activity.createdAt).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="tracking-[0.5px] mb-0 inline-flex space-x-1">
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
                            <Link to="/">RIAFCO</Link>
                        </li>
                        <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
                            <MdKeyboardArrowRight className="text-xl" />
                        </li>
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white">
                            Détails de l'activité
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

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:col-span-6">
                            <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800">
                                <img
                                    src={activity.image}
                                    className="rounded-md w-full h-64 object-cover"
                                    alt={activity.title_fr}
                                />
                                <div className="mt-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: activity.description_fr }} />
                            </div>
                            <BlogComment />
                        </div>
                        <div className="lg:col-span-4 md:col-span-6">
                            <ActiviteUserDetail
                                className="lg:col-span-4 md:col-span-6"
                                name={`${activity.author.firstName} ${activity.author.lastName}`}
                                profilePic={activity.author.profilePic}
                                authorId={activity.author.id}
                                currentActivitySubject={activity.title_fr}
                                activiteId={activity.id}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container relative md:mt-24 mt-16">
                <div className="md:flex justify-center">
                    <div className="lg:w-2/3 text-center">
                        <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold mb-6">
                            Abonnez-vous à notre newsletter
                        </h3>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Abonnez-vous pour recevoir les dernières actualités et mises à jour sur nos activités.
                        </p>
                        <div className="mt-8">
                            <div className="text-center subcribe-form">
                                <form className="relative mx-auto max-w-xl">
                                    <input
                                        type="email"
                                        id="subemail"
                                        name="email"
                                        className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700"
                                        placeholder="Entrez votre adresse email..."
                                    />
                                    <button
                                        type="submit"
                                        className="py-2 px-5 inline-block font-semibold tracking-wide align-middle transition duration-500 ease-in-out text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white rounded-full"
                                    >
                                        S'abonner
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
