import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LiaTimesSolid} from "react-icons/lia"

const CookieModal = () => {
    const { t } = useTranslation();
    const [display, setDisplay] = useState(true);

    return <div className="cookie-popup fixed max-w-lg bottom-3 end-3 start-3 sm:start-0 mx-auto bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md py-5 px-6 z-50" style={{display: display ? 'block' :'none'}}>
        <p className="text-slate-400">
            {t("cookie.message")}{" "}
            <Link 
                to="/confidentialité" 
                className="text-emerald-600 dark:text-emerald-500 font-semibold"
            >
                {t("cookie.linkText")}
            </Link>
        </p>
        <div className="cookie-popup-actions text-end">
            <button 
                onClick={() => setDisplay(false)} 
                className="absolute border-none bg-none p-0 cursor-pointer font-semibold top-2 end-2"
                aria-label={t("cookie.close")}
            >
                <LiaTimesSolid className="text-dark dark:text-slate-200 text-xl"/>
            </button>
        </div>
    </div>
}

export default CookieModal;