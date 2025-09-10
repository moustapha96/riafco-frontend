// /* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';

// import { FaArrowRight } from "react-icons/fa"
// import { blogData } from '../../data/data';

// import newsService from '../../services/newsService';
// import { useEffect, useState } from 'react';

// export default function NewsSection(props) {
//         const [news, setNews] = useState(null);
      
//         useEffect(() => {
//             const fetchSettings = async () => {
//                 try {
//                     const response = await newsService.getAll();
//                     console.log(response)
//                     setNews(response.data);
//                 } catch (error) {
//                     console.error("Erreur lors de la récupération des paramètres :", error);
//                 }
//             };
//             fetchSettings();
//         }, []);
    
//     return (
//         <div className={props.className}>
//             <div className="grid md:grid-cols-12 grid-cols-1 items-center wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
//                 <div className="md:col-span-6">
//                     <h6 className="text-indigo-600 text-sm font-bold uppercase mb-2">Blogs</h6>
//                     <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Reads Our Latest <br /> News & Blog</h3>
//                 </div>

//                 <div className="md:col-span-6">
//                     <p className="text-slate-400 max-w-xl">Start working with Techwind that can provide everything you need to generate awareness, drive traffic, connect.</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">

//                 {blogData.slice(11, 14).map((data, index) => {
//                     return (
//                         <div key={index} className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden wow animate__animated animate__fadeInUp" data-wow-delay={data.DelayTime}>
//                             <img src={data.image} alt="" />

//                             <div className="content p-6">
//                                 <Link to="/blog-detail" className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">{data.title}</Link>
//                                 <p className="text-slate-400 mt-3">{data.desc}</p>

//                                 <div className="mt-4">
//                                     <Link to="/blog-detail" className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-indigo-600 after:bg-indigo-600 duration-500">Read More <FaArrowRight className="ms-2 text-[10px]" /></Link>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>

//     )
// }

import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import newsService from '../../services/newsService';

export default function NewsSection(props) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsService.getAll({ status: "PUBLISHED" });
                console.log(response)
                setNews(response.news);
            } catch (error) {
                console.error("Erreur lors de la récupération des news :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // Filtrer les news publiées avec un titre et un contenu en français valides
    const validNews = news.filter(item =>
        item.status === "PUBLISHED" &&
        item.title_fr &&
        item.contentPreview_fr
    ).slice(0, 3); // Afficher les 3 dernières news publiées

    return (
        <div className={props.className}>
            <div className="grid md:grid-cols-12 grid-cols-1 items-center wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                <div className="md:col-span-6">
                    <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">Actualités</h6>
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-[var(--riafco-blue)]">
                        Découvrez nos dernières actualités
                    </h3>
                </div>
                <div className="md:col-span-6">
                    <p className="text-slate-400 max-w-xl">
                        Retrouvez ici les dernières actualités, événements et ressources de RIAFCO pour rester informé.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--riafco-orange)]"></div>
                </div>
            ) : validNews.length === 0 ? (
                <p className="text-center text-slate-400 mt-8">
                    Aucune actualité disponible pour le moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
                    {validNews.map((item, index) => (
                        <div
                            key={item.id}
                            className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden wow animate__animated animate__fadeInUp"
                            data-wow-delay={`${0.1 * (index + 1)}s`}
                        >
                            <img
                                src={item.image}
                                alt={item.title_fr}
                                className="w-full h-48 object-cover"
                            />
                            <div className="content p-6">
                                <Link
                                    to={`/news/${item.id}`}
                                    className="title h5 text-lg font-medium hover:text-[var(--riafco-orange)] duration-500 ease-in-out block"
                                >
                                    {item.title_fr}
                                </Link>
                                <p className="text-slate-400 mt-3">
                                    {item.contentPreview_fr}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={item.author.profilePic}
                                            alt={`${item.author.firstName} ${item.author.lastName}`}
                                            className="size-8 rounded-full mr-2"
                                        />
                                        <span className="text-sm text-slate-400">
                                            {item.author.firstName} {item.author.lastName}
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            to={`/news/${item.id}`}
                                            className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-[var(--riafco-orange)] after:bg-[var(--riafco-orange)] duration-500"
                                        >
                                            Lire plus
                                            <FaArrowRight className="ms-2 text-[10px]" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
