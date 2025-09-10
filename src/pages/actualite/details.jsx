/* eslint-disable react/no-unescaped-entities */
// import { Link, useParams } from 'react-router-dom';

// import slide02 from '../../assets/images/blog/slide02.jpg';

// import Navbar from '../../component/Navbar/navbar'
// import Footer from '../../component/Footer/footer';
// import BlogComment from '../../component/blogComment';
// import BlogUserDetail from '../../component/blogUserDetail';
// import { blogData } from '../../data/data';
// import { MdKeyboardArrowRight } from 'react-icons/md';
// import { useEffect } from 'react';

// import HeaderBreakdumb from "../components/hearder-breakdumb";

// export default function ActualitesDetails() {

//     useEffect(() => {
//         const htmlTag = document.getElementsByTagName("html")[0]
//         htmlTag.classList.add('light');
//         htmlTag.classList.remove('dark')
//     },[]);

//     const params = useParams();
//     const id = params.id
//     const data = blogData.find((blog)=>blog.id === parseInt(id))
//     return (
//         <>
//             <Navbar navClass="nav-light" />

            
//             <HeaderBreakdumb title="Nos Actualités" />
            

//             <div className="relative">
//                 <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
//                     <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
//                     </svg>
//                 </div>
//             </div>


//             <section className="relative md:py-24 py-16">
//                 <div className="container relative">
//                     <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
//                         <div className="lg:col-span-8 md:col-span-6">
//                             <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800">

//                                 <img src={data?.image ? data?.image : slide02} className="rounded-md" alt="" />

//                                 <div className="mt-6">
//                                     <p className="text-slate-400">The most well-known dummy text is the &apos;Lorem Ipsum&apos;, which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to &apos;proper&apos; Latin. It contains a series of real Latin words. This ancient dummy text is also incomprehensible, but it imitates the rhythm of most European languages in Latin script.</p>
//                                     <p className="text-slate-400 italic border-x-4 border-indigo-600 rounded-ss-xl rounded-ee-xl mt-3 p-3">&quot; There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. &quot;</p>
//                                     <p className="text-slate-400 mt-3">The advantage of its Latin origin and the relative meaninglessness of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer&apos;s attention from the layout.</p>
//                                 </div>
//                             </div>

//                            <BlogComment/>
//                         </div>

//                         <div className="lg:col-span-4 md:col-span-6">
//                             <BlogUserDetail client={data?.client} name={data?.name}/>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="container relative md:mt-24 mt-16">
//                     <div className="md:flex justify-center">
//                         <div className="lg:w-2/3 text-center">
//                             <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold mb-6">Subscribe our weekly subscription</h3>

//                             <p className="text-slate-400 max-w-xl mx-auto">Add some text to explain benefits of subscripton on your services. We&apos;ll send you the best of our blog just once a weekly.</p>

//                             <div className="mt-8">
//                                 <div className="text-center subcribe-form">
//                                     <form className="relative mx-auto max-w-xl">
//                                         <input type="email" id="subemail" name="name" className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700" placeholder="Enter your email id.." />
//                                         <button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle transition duration-500 ease-in-out text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white rounded-full">Subcribe Now</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     )
// }

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import BlogComment from '../../component/blogComment';
import HeaderBreakdumb from "../components/hearder-breakdumb";
import newsService from '../../services/newsService';
import ActualiteUserDetail from './ActualiteUserDetail';

export default function ActualitesDetails() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarNews, setSimilarNews] = useState([]);

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        fetchNewsItem();
        fetchSimilarNews();
    }, [id]);

    const fetchNewsItem = async () => {
        try {
            setLoading(true);
            const response = await newsService.getById(id);
            console.log(response)
            setNewsItem(response.news);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'actualité :", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSimilarNews = async () => {
        try {
            const response = await newsService.getAll({
                limit: 3,
                authorId: newsItem?.authorId,
                search: newsItem?.title_fr
            });
            setSimilarNews(response.news.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erreur lors de la récupération des actualités similaires :", error);
        }
    };

    useEffect(() => {
        if (newsItem) {
            fetchSimilarNews();
        }
    }, [newsItem]);

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

    if (!newsItem) {
        return (
            <>
                <Navbar navClass="nav-light" />
                <div className="flex justify-center items-center h-64">
                    <p>Actualité non trouvée.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar navClass="nav-light" />
            <HeaderBreakdumb title={newsItem.title_fr} />

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
                                    src={newsItem.image}
                                    className="rounded-md w-full h-64 object-cover mb-6"
                                    alt={newsItem.title_fr}
                                />

                                <div className="flex items-center mb-4 text-sm text-slate-400">
                                    <span className="me-4">
                                        Publié le : {new Date(newsItem.publishedAt).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className="me-4">
                                        Auteur : {newsItem.author.firstName} {newsItem.author.lastName}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-semibold mb-6">{newsItem.title_fr}</h2>

                                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsItem.content_fr }} />

                                {/* Section des tags */}
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold mb-3">Mots-clés</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-sm">
                                            IFCL
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-sm">
                                            Décentralisation
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-sm">
                                            Financement Local
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-sm">
                                            Afrique
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-sm">
                                            Développement Durable
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Section des actualités similaires */}
                            {similarNews.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="text-xl font-semibold mb-6">Actualités Similaires</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {similarNews.map((item) => (
                                            <div key={item.id} className="rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    className="w-full h-32 object-cover"
                                                    alt={item.title_fr}
                                                />
                                                <div className="p-4">
                                                    <Link
                                                        to={`/actualités/${item.id}/détails`}
                                                        className="font-semibold hover:text-indigo-600 block mb-2"
                                                    >
                                                        {item.title_fr}
                                                    </Link>
                                                    <p className="text-sm text-slate-400">
                                                        {new Date(item.publishedAt).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <BlogComment />
                        </div>

                        <div className="lg:col-span-4 md:col-span-6">
                           
                            <ActualiteUserDetail
                                className="lg:col-span-4 md:col-span-6"
                                auteurNom={`${newsItem.author.firstName} ${newsItem.author.lastName}`}
                                auteurPhoto={newsItem.author.profilePic}
                                auteurId={newsItem.author.id}
                                sujetActuel={newsItem.title_fr}
                                actualiteId={newsItem.id}
                            />

                        </div>
                    </div>
                </div>

               
            </section>

            <Footer />
        </>
    );
}
