// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

// import imageP from '../../assets/images/event/1.jpg';
// import image1 from '../../assets/images/event/2.jpg';

// import Navbar from '../../component/Navbar/navbar'
// import Footer from '../../component/Footer/footer';
// import Blog2 from '../../component/blog2';
// import CookieModal from '../../component/cookieModal';

// import * as Icon from 'react-feather'

// import { team } from '../../data/data';
// import { eventOne,eventTwo, eventThree } from '../../data/dataThree';
// import { FaArrowRight, FaRegEnvelope } from 'react-icons/fa';
// import { PiMapPinLight } from 'react-icons/pi';
// import { GoClock } from 'react-icons/go';
// import { BsCheckCircle } from 'react-icons/bs';
// import HeaderBreakdumb from "../components/hearder-breakdumb";
// import eventService from '../../services/eventService';
// export default function EvenementPage() {
//     const [isOpen, setOpen] = useState(false);
//     let [days,setDays] = useState();
//     let [hours,setHours] = useState();
//     let [minutes,setMinutes] = useState();
//     let [seconds,setSeconds] = useState();

//     let deadline = "December, 31, 2025";
  
//     let getTime = () => {
//       let time = Date.parse(deadline) - Date.now();
  
//       setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
//       setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
//       setMinutes(Math.floor((time / 1000 / 60) % 60));
//       setSeconds(Math.floor((time / 1000) % 60));
//     };

//     useEffect(() => {
//     let interval = setInterval(() => getTime(deadline), 1000);
//       return () => clearInterval(interval);
//       }, []);
//      const [isOpenTab, setisOpen] = useState(0);

//     const handleTabClick = (index) => {
//         setisOpen(index);
//     };

//     useEffect(() => {
//         document.documentElement.setAttribute("dir", "ltr");
//         document.documentElement.classList.add('light')
//         document.documentElement.classList.remove('dark')

//         fetchEvenement()
//     }, []);
    
//     const fetchEvenement = async () => {
//         try {
//             const response = await eventService.getAll();
//             console.log(response)
            
//         } catch (error) {
//             console.error("Erreur lors de la récupération des pays :", error);
//         }
//     }
//     return (
//         <>
//             <Navbar navClass="nav-light" />

//               <HeaderBreakdumb title="Evenements" />

      

         

            

//             <section className="relative table w-full py-36 bg-[url('../../assets/images/event/bg3.jpg')] bg-no-repeat bg-bottom bg-cover">
//                 <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/90 to-fuchsia-600/90"></div>
//                 <div className="container relative">
//                     <div className="grid grid-cols-1 text-center">
                      
//                         <div id="countdown">
//                             <ul className="count-down list-none inline-block text-white text-center mt-8">
//                                 <li id="days" className="text-[40px] leading-[110px] size-[130px] rounded-full shadow-md bg-white/10 backdrop-opacity-30 inline-block m-2">{days} <p className="count-head">Days</p></li>
//                                 <li id="hours" className="text-[40px] leading-[110px] size-[130px] rounded-full shadow-md bg-white/10 backdrop-opacity-30 inline-block m-2">{hours}<p className="count-head">Hours</p></li>
//                                 <li id="mins" className="text-[40px] leading-[110px] size-[130px] rounded-full shadow-md bg-white/10 backdrop-opacity-30 inline-block m-2">{minutes}<p className="count-head">Mins</p></li>
//                                 <li id="secs" className="text-[40px] leading-[110px] size-[130px] rounded-full shadow-md bg-white/10 backdrop-opacity-30 inline-block m-2">{seconds}<p className="count-head">Secs</p></li>
//                                 <li id="end" className="h1"></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </section>

            


//             <section className="relative md:py-24 py-16">
//                 <div className="container relative">
//                     <div className="grid grid-cols-1 pb-8 text-center">
//                         <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Event Schedules</h3>
//                         <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect.</p>
//                     </div>

//                     <div className="grid grid-cols-1 mt-8">
//                         <ul className="md:w-fit w-full mx-auto flex-wrap justify-center text-center p-3 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
//                             <li role="presentation" className="md:inline-block block md:w-fit w-full">
//                                 <button onClick={() => handleTabClick(0)} className={`${isOpenTab === 0 ?'text-white bg-indigo-600 hover:text-white' : ''} px-4 py-2 text-center font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Tuesday</button>
//                             </li>
//                             <li role="presentation" className="md:inline-block block md:w-fit w-full">
//                                 <button onClick={() => handleTabClick(1)} className={`${isOpenTab === 1 ?'text-white bg-indigo-600 hover:text-white' : ''} px-4 py-2 text-center font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Wednesday</button>
//                             </li>
//                             <li role="presentation" className="md:inline-block block md:w-fit w-full">
//                                 <button onClick={() => handleTabClick(2)} className={`${isOpenTab === 2 ?'text-white bg-indigo-600 hover:text-white' : ''} px-4 py-2 text-center font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Thursday</button>
//                             </li>
//                             <li role="presentation" className="md:inline-block block md:w-fit w-full">
//                                 <button onClick={() => handleTabClick(3)} className={`${isOpenTab === 3 ?'text-white bg-indigo-600 hover:text-white' : ''} px-4 py-2 text-center font-semibold rounded-md w-full mt-3 hover:text-indigo-600 transition-all duration-500 ease-in-out`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Friday</button>
//                             </li>
//                         </ul>

//                         <div id="StarterContent" className="mt-1">
//                             {isOpenTab === 0 ?
//                                 <div>
//                                     <div className="grid grid-cols-1">
//                                         <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900">
//                                             <table className="w-full text-start">
//                                                 <tbody>
//                                                     {eventOne.map((item,index)=>{
//                                                         return(
//                                                         <tr key={index}>
//                                                             <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[200px] text-slate-400">{item.time}</td>
//                                                             <td className="p-3 border-b border-gray-100 dark:border-gray-700 min-w-[540px] py-12 px-5">
//                                                                 <div className="flex items-center">
//                                                                     <img src={item.image} width={96} height={96} className="rounded-full size-24 shadow-md dark:shadow-gray-700" alt="" />
//                                                                     <div className="ms-4">
//                                                                         <Link to="#" className="hover:text-indigo-600 text-lg font-semibold">{item.title}</Link>
//                                                                         <p className="text-slate-400 mt-2">{item.desc}</p>
//                                                                     </div>
//                                                                 </div>
//                                                             </td>
//                                                             <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px] text-slate-400">
//                                                                 <span className="block">Speaker</span>
//                                                                 <span className="block text-black dark:text-white text-md mt-1">{item.speaker}</span>
//                                                             </td>
//                                                             <td className="text-end border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px]">
//                                                                 <Link to="#" className="relative inline-flex items-center tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 font-medium hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">Buy Ticket <FaArrowRight className='ms-2 text-xs'/></Link>
//                                                             </td>
//                                                         </tr>
//                                                         )
//                                                     })}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>:""
//                             }
//                             {isOpenTab === 1 ?
//                                 <div>
//                                     <div className="grid grid-cols-1">
//                                         <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900">
//                                             <table className="w-full text-start">
//                                                 <tbody>
//                                                     {eventTwo.map((item,index)=>{
//                                                             return(
//                                                             <tr key={index}>
//                                                                 <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[200px] text-slate-400">{item.time}</td>
//                                                                 <td className="p-3 border-b border-gray-100 dark:border-gray-700 min-w-[540px] py-12 px-5">
//                                                                     <div className="flex items-center">
//                                                                         <img src={item.image} width={96} height={96} className="rounded-full size-24 shadow-md dark:shadow-gray-700" alt="" />
//                                                                         <div className="ms-4">
//                                                                             <Link to="#" className="hover:text-indigo-600 text-lg font-semibold">{item.title}</Link>
//                                                                             <p className="text-slate-400 mt-2">{item.desc}</p>
//                                                                         </div>
//                                                                     </div>
//                                                                 </td>
//                                                                 <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px] text-slate-400">
//                                                                     <span className="block">Speaker</span>
//                                                                     <span className="block text-black dark:text-white text-md mt-1">{item.speaker}</span>
//                                                                 </td>
//                                                                 <td className="text-end border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px]">
//                                                                     <Link to="#" className="relative inline-flex items-center tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 font-medium hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">Buy Ticket <FaArrowRight className='ms-2 text-xs'/></Link>
//                                                                 </td>
//                                                             </tr>
//                                                             )
//                                                         })}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>:""
//                             }
//                             {isOpenTab === 2 ?
//                                 <div>
//                                     <div className="grid grid-cols-1">
//                                         <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900">
//                                             <table className="w-full text-start">
//                                                 <tbody>
//                                                     {eventThree.map((item,index)=>{
//                                                             return(
//                                                             <tr key={index}>
//                                                                 <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[200px] text-slate-400">{item.time}</td>
//                                                                 <td className="p-3 border-b border-gray-100 dark:border-gray-700 min-w-[540px] py-12 px-5">
//                                                                     <div className="flex items-center">
//                                                                         <img src={item.image} width={96} height={96} className="rounded-full size-24 shadow-md dark:shadow-gray-700" alt="" />
//                                                                         <div className="ms-4">
//                                                                             <Link to="#" className="hover:text-indigo-600 text-lg font-semibold">{item.title}</Link>
//                                                                             <p className="text-slate-400 mt-2">{item.desc}</p>
//                                                                         </div>
//                                                                     </div>
//                                                                 </td>
//                                                                 <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px] text-slate-400">
//                                                                     <span className="block">Speaker</span>
//                                                                     <span className="block text-black dark:text-white text-md mt-1">{item.speaker}</span>
//                                                                 </td>
//                                                                 <td className="text-end border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px]">
//                                                                     <Link to="#" className="relative inline-flex items-center tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 font-medium hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">Buy Ticket <FaArrowRight/></Link>
//                                                                 </td>
//                                                             </tr>
//                                                             )
//                                                         })}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>:""
//                             }
//                             {isOpenTab === 3 ?
//                                 <div>
//                                     <div className="grid grid-cols-1">
//                                         <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900">
//                                             <table className="w-full text-start">
//                                                 <tbody>
//                                                 {eventTwo.map((item,index)=>{
//                                                     return(
//                                                     <tr key={index}>
//                                                         <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[200px] text-slate-400">{item.time}</td>
//                                                         <td className="p-3 border-b border-gray-100 dark:border-gray-700 min-w-[540px] py-12 px-5">
//                                                             <div className="flex items-center">
//                                                                 <img src={item.image} width={96} height={96} className="rounded-full size-24 shadow-md dark:shadow-gray-700" alt="" />
//                                                                 <div className="ms-4">
//                                                                     <Link to="#" className="hover:text-indigo-600 text-lg font-semibold">{item.title}</Link>
//                                                                     <p className="text-slate-400 mt-2">{item.desc}</p>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                         <td className="text-center border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px] text-slate-400">
//                                                             <span className="block">Speaker</span>
//                                                             <span className="block text-black dark:text-white text-md mt-1">{item.speaker}</span>
//                                                         </td>
//                                                         <td className="text-end border-b border-gray-100 dark:border-gray-700 py-12 px-5 min-w-[180px]">
//                                                             <Link to="#" className="relative inline-flex items-center tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 font-medium hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">Buy Ticket <FaArrowRight/></Link>
//                                                         </td>
//                                                     </tr>
//                                                     )
//                                                 })}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>:""
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </section>



       

            

         

//             <Footer />
//             <CookieModal />
//         </>
//     )
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import CookieModal from '../../component/cookieModal';
import HeaderBreakdumb from "../components/hearder-breakdumb";
import eventService from '../../services/eventService';
import { FaArrowRight } from 'react-icons/fa';
import { PiMapPinLight } from 'react-icons/pi';
import { GoClock } from 'react-icons/go';
import { BsCheckCircle } from 'react-icons/bs';

export default function EvenementPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpenTab, setIsOpenTab] = useState(0);

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventService.getAll();
            console.log(response)
            if (response && response.events) {
                setEvents(response.events.filter(event => event.status === "PUBLISHED"));
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des événements :", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabClick = (index) => {
        setIsOpenTab(index);
    };

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Fonction pour formater l'heure
    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('fr-FR', options);
    };

    // Grouper les événements par jour
    const eventsByDay = events.reduce((acc, event) => {
        const day = new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'long' });
        if (!acc[day]) acc[day] = [];
        acc[day].push(event);
        return acc;
    }, {});

    // Jours de la semaine en français
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    return (
        <>
            <Navbar navClass="nav-light" />
            <HeaderBreakdumb title="Événements" />

            {/* Section Hero avec compte à rebours (optionnel) */}
            {events.length > 0 && (
                <section className="relative table w-full py-36 bg-[url('../../assets/images/event/bg3.jpg')] bg-no-repeat bg-bottom bg-cover">
                    <div className="absolute inset-0 bg-gradient-to-t from-[--riafco-blue]/90 to-[--riafco-orange]/90"></div>
                    <div className="container relative">
                        <div className="grid grid-cols-1 text-center">
                            <h1 className="text-white font-bold text-4xl mb-4">Prochain événement</h1>
                            <h2 className="text-white text-2xl mb-8">{events[0].title}</h2>
                            <div className="text-white text-lg mb-4">
                                <p className="flex items-center justify-center mb-2">
                                    <PiMapPinLight className="mr-2" /> {events[0].location}
                                </p>
                                <p className="flex items-center justify-center">
                                    <GoClock className="mr-2" />
                                    {formatDate(events[0].startDate)} • {formatTime(events[0].startDate)} - {formatTime(events[0].endDate)}
                                </p>
                            </div>
                            {events[0].registrationLink && (
                                <Link
                                    to={events[0].registrationLink}
                                    target="_blank"
                                    className="py-3 px-6 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-[--riafco-orange] hover:bg-[--riafco-orange-hover] border-[--riafco-orange] text-white rounded-md mt-6"
                                >
                                    S'inscrire <FaArrowRight className="ms-2 text-[10px]" />
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Section Planning des Événements */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="mb-4 text-base font-medium text-[--riafco-orange]">Calendrier RIAFCO</h6>
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                            Planning des <span className="text-[--riafco-blue]">Événements</span>
                        </h3>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Découvrez nos événements à venir et participez aux initiatives de RIAFCO pour le développement en Afrique.
                        </p>
                    </div>

                    {/* Onglets par jour */}
                    <div className="grid grid-cols-1 mt-8">
                        <ul className="md:w-fit w-full mx-auto flex-wrap justify-center text-center p-3 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                            {daysOfWeek.map((day, index) => (
                                <li role="presentation" className="md:inline-block block md:w-fit w-full" key={index}>
                                    <button
                                        onClick={() => handleTabClick(index)}
                                        className={`${isOpenTab === index ? 'text-white bg-[--riafco-blue] hover:text-white' : ''}
                                            px-4 py-2 text-center font-semibold rounded-md w-full mt-3 hover:text-[--riafco-blue] transition-all duration-500 ease-in-out`}
                                    >
                                        {day}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Contenu des onglets */}
                        <div className="mt-6">
                            {daysOfWeek.map((day, dayIndex) => (
                                <div key={dayIndex} className={isOpenTab === dayIndex ? 'block' : 'hidden'}>
                                    {eventsByDay[day] && eventsByDay[day].length > 0 ? (
                                        <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                                            <table className="w-full text-start">
                                                <tbody>
                                                    {eventsByDay[day].map((event, eventIndex) => (
                                                        <tr key={eventIndex} className="border-b border-gray-100 dark:border-gray-700">
                                                            <td className="text-center py-6 px-5 min-w-[180px]">
                                                                <div className="text-[--riafco-orange] font-medium">
                                                                    {formatTime(event.startDate)} - {formatTime(event.endDate)}
                                                                </div>
                                                                <div className="text-slate-600 text-sm mt-1">
                                                                    {formatDate(event.startDate)}
                                                                </div>
                                                            </td>
                                                            <td className="py-6 px-5 min-w-[400px]">
                                                                <div className="flex items-start">
                                                                    <div className="hidden md:block w-20 h-20 bg-[--riafco-blue]/10 rounded-full flex-shrink-0 flex items-center justify-center text-[--riafco-blue] font-bold text-xl">
                                                                        {new Date(event.startDate).getDate()}
                                                                        <span className="block text-xs font-normal">
                                                                            {new Date(event.startDate).toLocaleDateString('fr-FR', { month: 'short' })}
                                                                        </span>
                                                                    </div>
                                                                    <div className="ms-0 md:ms-4">
                                                                        <Link
                                                                            to={`/events/${event.id}`}
                                                                            className="hover:text-[--riafco-blue] text-lg font-semibold block"
                                                                        >
                                                                            {event.title}
                                                                        </Link>
                                                                        <p className="text-slate-600 mt-2">{event.description}</p>
                                                                        <div className="flex flex-wrap items-center mt-3 text-sm text-slate-500">
                                                                            <span className="flex items-center mr-4">
                                                                                <PiMapPinLight className="mr-1 text-[--riafco-orange]" /> {event.location}
                                                                            </span>
                                                                            {event.isVirtual && (
                                                                                <span className="flex items-center text-[--riafco-blue]">
                                                                                    <BsCheckCircle className="mr-1" /> Événement en ligne
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center py-6 px-5 min-w-[180px]">
                                                                <div className="flex items-center justify-center">
                                                                    {event.author?.profilePic && (
                                                                        <img
                                                                            src={event.author.profilePic}
                                                                            alt={event.author.firstName}
                                                                            className="size-12 rounded-full mr-2"
                                                                        />
                                                                    )}
                                                                    <div className="text-start">
                                                                        <span className="block text-black dark:text-white font-medium">
                                                                            {event.author?.firstName} {event.author?.lastName}
                                                                        </span>
                                                                        <span className="text-slate-500 text-xs">Organisateur</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center py-6 px-5 min-w-[180px]">
                                                                {event.registrationLink ? (
                                                                    <Link
                                                                        to={event.registrationLink}
                                                                        target="_blank"
                                                                        className="relative inline-flex items-center font-medium tracking-wide align-middle text-base text-center border-none
                                    after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto
                                    after:bottom-0 after:start-0 after:transition-all after:duration-500
                                    text-[--riafco-blue] hover:text-[--riafco-blue] after:bg-[--riafco-blue] duration-500 ease-in-out"
                                                                    >
                                                                        S'inscrire <FaArrowRight className="ms-2 text-[10px]" />
                                                                    </Link>
                                                                ) : (
                                                                    <span className="text-slate-500">Inscription fermée</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-center text-slate-600 py-8">Aucun événement prévu ce {day}.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <CookieModal />
        </>
    );
}
