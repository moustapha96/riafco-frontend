import {useEffect , useState} from 'react'
import { Link } from "react-scroll";
import { animateScroll as scroll } from 'react-scroll';

import { FiArrowUp } from 'react-icons/fi';

export default function Switcher() {
    let [scrollToTops, setScrollToTops] = useState(false); 
    useEffect(()=>{
        function scrollHandler() {
            setScrollToTops(window.scrollY >= 500)
          }
      if (typeof window !== "undefined") {
        window.addEventListener('scroll', scrollHandler);
        }
        window.scrollTo(0, 0)

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    },[])
      let scrollToTop = () => {
          scroll.scrollToTop({
              duration: 500,
              smooth: true,
          });
      }

    function changeMode(mode, event) {
        switch (mode) {
            case 'mode':
                if (document.documentElement.className.includes("dark")) {
                    document.documentElement.className = 'light'
                } else {
                    document.documentElement.className = 'dark'
                }
                break;
            case 'layout':
                if (event.target?.innerText === "LTR") {
                    document.documentElement.dir = "ltr"
                }
                else {
                    document.documentElement.dir = "rtl"
                }
                break;
            default:
                break;
        }
    }
    return (
        <>
            <div className="fixed top-[40%] -right-3 z-50">
                <Link to="#" id="switchRtl" className="cursor-pointer">
                    <span className="py-1 px-3 relative inline-block rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 font-semibold rtl:block ltr:hidden" onClick={(event) => changeMode('layout', event)}>LTR</span>
                    <span className="py-1 px-3 relative inline-block rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 font-semibold ltr:block rtl:hidden" onClick={(event) => changeMode('layout', event)}>RTL</span>
                </Link>
            </div>

            <Link  to="#" onClick={scrollToTop}
                id="back-to-top" className={`${!scrollToTops ? "hidden" : "back-to-top fixed  text-lg rounded-full z-10 bottom-5 end-2 size-9 text-center bg-[var(--riafco-blue)] text-white leading-9 flex items-center justify-center"}`}><FiArrowUp width={18} /></Link>
         
        </>
    )
};