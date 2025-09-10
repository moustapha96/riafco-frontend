import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center px-3 py-1 rounded-md bg-[var(--riafco-blue)] text-white hover:bg-opacity-90 transition-colors"
        >
            {language === 'fr' ? 'FR' : 'EN'}
        </button>
    );
};

export default LanguageSwitcher;
