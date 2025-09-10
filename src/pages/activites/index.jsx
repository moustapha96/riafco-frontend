// // import { Link } from 'react-router-dom';

// // import Navbar from '../../component/Navbar/navbar'
// // import Footer from '../../component/Footer/footer';
// // import BlogUserDetail from '../../component/blogUserDetail';
// // import { blogData, courseListing } from '../../data/data';
// // import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
// // import { FaArrowRight } from 'react-icons/fa6';
// // import { useEffect } from 'react';
// // import { PiBookOpenText } from 'react-icons/pi';
// // import { GoClock } from 'react-icons/go';
// // import { AiOutlineEye } from 'react-icons/ai';
// // import HeaderBreakdumb from "../components/hearder-breakdumb";
// // import activityService from '../../services/activityService';


// // export default function ActivitePage() {
// //     useEffect(() => {
// //         const htmlTag = document.getElementsByTagName("html")[0]
// //         htmlTag.classList.add('light');
// //         htmlTag.classList.remove('dark')

// //         fetchActivite();
// //     });
  
// //     const fetchActivite = async () => {
// //         try {
// //             const response =  await activityService.getAll();
// //             console.log(response)
// //         } catch (error) {
// //             console.log(error)
// //         }
        
// //     }

// //     return (
// //         <>
// //             <Navbar navClass="nav-light" />

// //             <HeaderBreakdumb title="Nos Activités" />
            

// //             <div className="relative">
// //                 <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
// //                     <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
// //                     </svg>
// //                 </div>
// //             </div>
// //             <section className="relative md:py-24 py-16">
// //                 <div className="container relative">
// //                     <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
// //                         <div className="lg:col-span-8 md:col-span-6">
// //                             <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
// //                                 {
// //                                     blogData.slice(9,18).map((item,index)=>{
// //                                         return(

// //                                                 <div className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden" key={index}>
// //                                                     <img src={item.image} alt="" />

// //                                                     <div className="content p-6">
// //                                                         <Link to={`/blog-detail/${item.id}`} className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out">{item.desc}</Link>
// //                                                         <p className="text-slate-400 mt-3">{item.desc}</p>

// //                                                         <div className="mt-4">
// //                                                             <Link to={`/blog-detail/${item.id}`} className="relative inline-flex  items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-indigo-600 after:bg-indigo-600 duration-500">Read More <FaArrowRight className="ms-2 text-[10px]"/></Link>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                         )
// //                                     })
// //                                 }

// //                             </div>

// //                             <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
// //                                 <div className="md:col-span-12 text-center">
// //                                     <nav>
// //                                         <ul className="inline-flex items-center -space-x-px">
// //                                             <li>
// //                                                 <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600">
// //                                                     <MdOutlineKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
// //                                                 </Link>
// //                                             </li>
// //                                             <li>
// //                                                 <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600">1</Link>
// //                                             </li>
// //                                             <li>
// //                                                 <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600">2</Link>
// //                                             </li>
// //                                             <li>
// //                                                 <Link to="/#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-indigo-600 border border-indigo-600">3</Link>
// //                                             </li>
// //                                             <li>
// //                                                 <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600">4</Link>
// //                                             </li>
// //                                             <li>
// //                                                 <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600">5</Link>
// //                                             </li>
// //                                             <li>
// //                                                 <Link to="/#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600">
// //                                                     <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1"/>
// //                                                 </Link>
// //                                             </li>
// //                                         </ul>
// //                                     </nav>
// //                                 </div>
// //                             </div>
// //                         </div>

                       
// //                         <BlogUserDetail className={"lg:col-span-4 md:col-span-6"} />
// //                     </div>
// //                 </div>

// //                 <div className="container relative md:mt-24 mt-16">
// //                     <div className="md:flex justify-center">
// //                         <div className="lg:w-2/3 text-center">
// //                             <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold mb-6">Subscribe our weekly subscription</h3>

// //                             <p className="text-slate-400 max-w-xl mx-auto">Add some text to explain benefits of subscripton on your services. We&apos;ll send you the best of our blog just once a weekly.</p>

// //                             <div className="mt-8">
// //                                 <div className="text-center subcribe-form">
// //                                     <form className="relative mx-auto max-w-xl">
// //                                         <input type="email" id="subemail" name="name" className="pt-4 pe-40 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700" placeholder="Enter your email id.." />
// //                                         <button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle transition duration-500 ease-in-out text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white rounded-full">Subcribe Now</button>
// //                                     </form>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>


// //               <section className="relative md:py-24 py-16 overflow-hidden">
// //                             <div className="container relative">
// //                                 <div className="grid grid-cols-1 pb-8 text-center">
// //                                     <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Popular Courses</h3>
// //                                     <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.</p>
// //                                 </div>
            
// //                                 <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
// //                                     {courseListing.slice(0,6).map((item,index)=>{
// //                                         return(
// //                                         <div className="group relative rounded-md shadow-sm hover:shadow-lg dark:shadow-gray-800 duration-500 ease-in-out overflow-hidden" key={index}>
// //                                         <div className="relative overflow-hidden">
// //                                             <img src={item.image} className="group-hover:scale-110 duration-500 ease-in-out" alt="" />
// //                                             <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 duration-500 ease-in-out"></div>
            
// //                                             <div className="absolute start-0 bottom-0 opacity-0 group-hover:opacity-100 duration-500 ease-in-out">
// //                                                 <div className="pb-4 ps-4 flex items-center">
// //                                                     <img src={item.image2} className="size-12 rounded-full shadow-md dark:shadow-gray-800 mx-auto" alt="" />
// //                                                     <div className="ms-3">
// //                                                         <Link to='#' className="font-semibold text-white block">{item.name}</Link>
// //                                                         <span className="text-white/70 text-sm">{item.role}</span>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
            
// //                                         <div className="content p-6 relative">
// //                                             <Link to={`/course-detail/${item.id}`} className="font-medium block text-indigo-600">{item.field}</Link>
// //                                             <Link to={`/course-detail/${item.id}`} className="text-lg font-medium block hover:text-indigo-600 duration-500 ease-in-out mt-2">{item.desc}</Link>
// //                                             <p className="text-slate-400 mt-3 mb-4">The phrasal sequence of the is now so that many campaign and benefit</p>
            
// //                                             <ul className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center list-none text-slate-400">
// //                                                 <li className="flex items-center me-4">
// //                                                     <PiBookOpenText className="text-lg leading-none me-2 text-slate-900 dark:text-white"/>
// //                                                     <span>25 Lectures</span>
// //                                                 </li>
            
// //                                                 <li className="flex items-center me-4">
// //                                                     <GoClock className="text-lg leading-none me-2 text-slate-900 dark:text-white"/>
// //                                                     <span>1h 30m</span>
// //                                                 </li>
            
// //                                                 <li className="flex items-center">
// //                                                     <AiOutlineEye className=" text-lg leading-none me-2 text-slate-900 dark:text-white"/>
// //                                                     <span>3012</span>
// //                                                 </li>
// //                                             </ul>
            
// //                                             <div className="absolute -top-7 end-6 z-1 opacity-0 group-hover:opacity-100 duration-500 ease-in-out">
// //                                                 <div className="flex justify-center items-center size-14 bg-white dark:bg-slate-900 rounded-full shadow-lg dark:shadow-gray-800 text-indigo-600 dark:text-white">
// //                                                     <span className="font-semibold">$11</span>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                         )
// //                                     })}
// //                                 </div>
            
// //                                 <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
// //                                     <div className="md:col-span-12 text-center">
// //                                         <Link to="/course-listing" className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 text-slate-400 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">See All Courses <FaArrowRight className="ms-2 text-[10px]"/></Link>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //             </section>
            

            
// //             <Footer />
// //              </>
// //     )
// // }

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../../component/Navbar/navbar';
// import Footer from '../../component/Footer/footer';
// import BlogUserDetail from '../../component/blogUserDetail';
// import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
// import { FaArrowRight } from 'react-icons/fa6';
// import HeaderBreakdumb from "../components/hearder-breakdumb";
// import activityService from '../../services/activityService';


// export default function ActivitePage() {
//     const [activities, setActivities] = useState([]);
//     const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, pages: 1 });
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("");

//     useEffect(() => {
//         const htmlTag = document.getElementsByTagName("html")[0];
//         htmlTag.classList.add('light');
//         htmlTag.classList.remove('dark');
//         fetchActivities();
//     }, [pagination.page, searchTerm, statusFilter]);

//     const fetchActivities = async () => {
//         try {
//             setLoading(true);
//             const response = await activityService.getAll({
//                 page: pagination.page,
//                 limit: pagination.limit,
//                 search: searchTerm,
//                 status: statusFilter,
//             });
//             console.log(response)
//             setActivities(response.activities);
//             setPagination(response.pagination);
//         } catch (error) {
//             console.error("Erreur lors de la récupération des activités :", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handlePageChange = (page) => {
//         setPagination({ ...pagination, page });
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setPagination({ ...pagination, page: 1 });
//         fetchActivities();
//     };

//     const handleStatusFilterChange = (e) => {
//         setStatusFilter(e.target.value);
//         setPagination({ ...pagination, page: 1 });
//     };

//     return (
//         <>
//             <Navbar navClass="nav-light" />
//             <HeaderBreakdumb title="Nos Activités" />

//             <div className="relative">
//                 <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
//                     <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
//                     </svg>
//                 </div>
//             </div>

//             {/* Section de filtrage et de recherche */}
//             <section className="relative md:py-12 py-8">
//                 <div className="container relative">
//                     <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//                         <h3 className="md:text-2xl text-xl font-semibold mb-4 md:mb-0">
//                             Filtrer les Activités
//                         </h3>
//                         <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
//                             <input
//                                 type="text"
//                                 placeholder="Rechercher une activité..."
//                                 className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-64"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                             <select
//                                 className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-48"
//                                 value={statusFilter}
//                                 onChange={handleStatusFilterChange}
//                             >
//                                 <option value="">Tous les statuts</option>
//                                 <option value="PUBLISHED">Publié</option>
//                                 <option value="DRAFT">Brouillon</option>
//                                 <option value="ARCHIVED">Archivé</option>
//                             </select>
//                             <button
//                                 type="submit"
//                                 className="py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full md:w-auto"
//                             >
//                                 Rechercher
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </section>

//             {/* Section des activités */}
//             <section className="relative md:py-12 py-8">
//                 <div className="container relative">
//                     <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
//                         {loading ? (
//                             <div className="flex justify-center items-center h-64">
//                                 <p>Chargement des activités...</p>
//                             </div>
//                         ) : activities.length === 0 ? (
//                             <div className="flex justify-center items-center h-64">
//                                 <p>Aucune activité trouvée.</p>
//                             </div>
//                         ) : (
//                             <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
//                                 {activities.map((activity) => (
//                                     <div className="blog relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden" key={activity.id}>
//                                         <img src={activity.image} alt={activity.title_fr} className="w-full h-48 object-cover" />
//                                         <div className="content p-6">
//                                             <div className="flex items-center mb-2">
//                                                 <span className="text-indigo-600 text-lg">{activity.icon}</span>
//                                                 <span className="text-sm text-slate-400 ms-2">
//                                                     {new Date(activity.createdAt).toLocaleDateString()}
//                                                 </span>
//                                             </div>
//                                             <Link
//                                                 to={`/activités/${activity.id}/détails`}
//                                                 className="title h5 text-lg font-medium hover:text-indigo-600 duration-500 ease-in-out"
//                                             >
//                                                 {activity.title_fr}
//                                             </Link>
//                                             <div
//                                                 className="text-slate-400 mt-3 prose max-w-none"
//                                                 dangerouslySetInnerHTML={{ __html: activity.description_fr.substring(0, 200) + '...' }}
//                                             />
//                                             <div className="mt-4">
//                                                 <Link
//                                                     to={`/activités/${activity.id}/détails`}
//                                                     className="relative inline-flex items-center font-normal tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 hover:text-indigo-600 after:bg-indigo-600 duration-500"
//                                                 >
//                                                     Lire la suite <FaArrowRight className="ms-2 text-[10px]" />
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
//                             <div className="md:col-span-12 text-center">
//                                 <nav>
//                                     <ul className="inline-flex items-center -space-x-px">
//                                         <li>
//                                             <button
//                                                 onClick={() => handlePageChange(pagination.page - 1)}
//                                                 disabled={pagination.page === 1}
//                                                 className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600 ${pagination.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                             >
//                                                 <MdOutlineKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1" />
//                                             </button>
//                                         </li>
//                                         {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
//                                             <li key={page}>
//                                                 <button
//                                                     onClick={() => handlePageChange(page)}
//                                                     className={`size-[40px] inline-flex justify-center items-center ${pagination.page === page ? 'text-white bg-indigo-600' : 'text-slate-400 hover:text-white bg-white dark:bg-slate-900'} border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600`}
//                                                 >
//                                                     {page}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                         <li>
//                                             <button
//                                                 onClick={() => handlePageChange(pagination.page + 1)}
//                                                 disabled={pagination.page === pagination.pages}
//                                                 className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600 ${pagination.page === pagination.pages ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                             >
//                                                 <MdKeyboardArrowRight className="text-xl rtl:rotate-180 rtl:-mt-1" />
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 </nav>
//                             </div>
//                         </div>
                        
//                     </div>
//                 </div>
//             </section>

//             <Footer />
//         </>
//     );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import HeaderBreakdumb from "../components/hearder-breakdumb";
import activityService from '../../services/activityService';

export default function ActivitePage() {
    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, pages: 1 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');
        fetchActivities();
    }, [pagination.page, searchTerm, statusFilter]);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await activityService.getAll({
                page: pagination.page,
                limit: pagination.limit,
                search: searchTerm,
                status: statusFilter,
            });
            setActivities(response.activities);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération des activités :", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.pages) {
            setPagination({ ...pagination, page });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        fetchActivities();
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setPagination({ ...pagination, page: 1 });
    };

    return (
        <>
            <Navbar navClass="nav-light" />
            <HeaderBreakdumb title="Nos Activités" />

            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            {/* Section de filtrage et de recherche */}
            <section className="relative md:py-12 py-8 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h3 className="md:text-2xl text-xl font-semibold mb-4 md:mb-0 text-slate-900 dark:text-white">
                            Filtrer les Activités
                        </h3>
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Rechercher une activité..."
                                className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                className="py-2 px-4 border border-gray-300 rounded-md w-full md:w-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="PUBLISHED">Publié</option>
                                <option value="DRAFT">Brouillon</option>
                                <option value="ARCHIVED">Archivé</option>
                            </select>
                            <button
                                type="submit"
                                className="py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 w-full md:w-auto"
                            >
                                Rechercher
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Section des activités - pleine largeur */}
            <section className="relative md:py-16 py-12">
                <div className="container relative">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-64">
                            <h3 className="text-xl font-semibold text-slate-500 dark:text-slate-400 mb-2">
                                Aucune activité trouvée
                            </h3>
                            <p className="text-slate-400 text-center max-w-md">
                                Aucune activité ne correspond à vos critères de recherche. Essayez avec d'autres termes ou filtres.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                {activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={activity.image || "/activities/default-activity.jpg"}
                                                alt={activity.title_fr}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center mb-3">
                                                <span className="text-indigo-600 text-lg mr-2">{activity.icon}</span>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {new Date(activity.createdAt).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <Link
                                                to={`/activités/${activity.id}/détails`}
                                                className="block mb-3"
                                            >
                                                <h3 className="text-xl font-medium hover:text-indigo-600 transition-colors duration-300">
                                                    {activity.title_fr}
                                                </h3>
                                            </Link>
                                            <div
                                                className="text-slate-500 dark:text-slate-400 mt-3 prose max-w-none line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: activity.description_fr }}
                                            />
                                            <div className="mt-5">
                                                <Link
                                                    to={`/activités/${activity.id}/détails`}
                                                    className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                                >
                                                    Lire la suite
                                                    <FaArrowRight className="ms-2 text-xs" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-12">
                                <div className="flex flex-col sm:flex-row justify-between items-center">
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
                                        Page {pagination.page} sur {pagination.pages} | {pagination.total} activités
                                    </div>
                                    <nav aria-label="Pagination des activités">
                                        <ul className="inline-flex items-center gap-1">
                                            <li>
                                                <button
                                                    onClick={() => handlePageChange(pagination.page - 1)}
                                                    disabled={pagination.page === 1}
                                                    className={`size-10 inline-flex justify-center items-center rounded-lg ${pagination.page === 1
                                                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                                            : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <MdOutlineKeyboardArrowLeft className="text-lg" />
                                                </button>
                                            </li>

                                            {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                                                let pageNumber;
                                                if (pagination.pages <= 5) {
                                                    pageNumber = i + 1;
                                                } else {
                                                    if (pagination.page <= 3) {
                                                        pageNumber = i + 1;
                                                    } else if (pagination.page >= pagination.pages - 2) {
                                                        pageNumber = pagination.pages - 4 + i;
                                                    } else {
                                                        pageNumber = pagination.page - 2 + i;
                                                    }
                                                }
                                                return pageNumber;
                                            }).map((page) => (
                                                <li key={page}>
                                                    <button
                                                        onClick={() => handlePageChange(page)}
                                                        className={`size-10 inline-flex justify-center items-center rounded-lg ${pagination.page === page
                                                                ? 'bg-indigo-600 text-white'
                                                                : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            ))}

                                            {pagination.pages > 5 && pagination.page < pagination.pages - 2 && (
                                                <li>
                                                    <span className="size-10 inline-flex justify-center items-center text-slate-500 dark:text-slate-400">
                                                        ...
                                                    </span>
                                                </li>
                                            )}

                                            <li>
                                                <button
                                                    onClick={() => handlePageChange(pagination.page + 1)}
                                                    disabled={pagination.page === pagination.pages}
                                                    className={`size-10 inline-flex justify-center items-center rounded-lg ${pagination.page === pagination.pages
                                                            ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                                            : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <MdKeyboardArrowRight className="text-lg" />
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
