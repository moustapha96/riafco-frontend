/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import * as Icon from 'react-feather';
import { MdKeyboardArrowRight } from 'react-icons/md';
import teamMemberService from '../../services/teamMemberService';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import HeaderBreakdumb from '../components/hearder-breakdumb';
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import { useTranslation } from 'react-i18next';
import { buildImageUrl } from '../../utils/imageUtils';

export default function EquipePage() {
    const { t } = useTranslation();
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.add('light');
        htmlTag.classList.remove('dark');

        fetchTeamMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTeamMembers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamMemberService.getAll();
            const sortedMembers = (response?.teamMembers ?? [])
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || (a.name ?? '').localeCompare(b.name ?? ''));
            setTeamMembers(sortedMembers);
        } catch (e) {
            console.error("Erreur lors de la récupération des membres:", e);
            setError(t('team.error'));
        } finally {
            setLoading(false);
        }
    };

    // Organisation par rôle (FR/EN robust)
    const teamByRole = useMemo(() => {
        const buckets = { leadership: [], experts: [], tech: [] };
        const includesAny = (text = '', arr = []) => {
            const v = text.toLowerCase();
            return arr.some(k => v.includes(k));
        };

        teamMembers.forEach(member => {
            const pos = (member.position || '').toLowerCase();

            const isLeadership = includesAny(pos, [
                'président', 'vice-président', 'secrétaire', 'president', 'vice president', 'secretary', 'chair', 'director'
            ]);
            const isExpert = includesAny(pos, [
                'expert', 'juriste', 'avocat', 'legal', 'lawyer', 'counsel', 'advisor', 'consultant'
            ]);

            if (isLeadership) buckets.leadership.push(member);
            else if (isExpert) buckets.experts.push(member);
            else buckets.tech.push(member);
        });

        return buckets;
    }, [teamMembers]);

    return (
        <>
            <Navbar navClass="nav-light" />

            <HeaderBreakdumb
                title={t('team.header.title')}
                description={t('team.header.description')}
                // background={riafcoAbout}
            />

            {/* Fil d’Ariane sous le header (optionnel) */}
            <div className="container relative flex flex-col items-center justify-center text-center">
                <div className="mt-6 flex justify-center">
                    <ul className="tracking-[0.5px] mb-0 inline-flex items-center space-x-1 text-slate-500">
                        <li className="inline-block uppercase text-[12px] font-bold">
                            <Link to="/">RIAFCO</Link>
                        </li>
                        <li className="inline-block text-base mx-1">
                            <MdKeyboardArrowRight className="text-xl" />
                        </li>
                        <li className="inline-block uppercase text-[12px] font-bold" aria-current="page">
                            {t('team.breadcrumb.section')}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section présentation */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            {t('team.sections.leadership')}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t('team.header.description')}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--riafco-blue)]"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500">
                            {error}
                            </div>
                        ) : (
                            <>
                                {/* Leadership */}
                                {teamByRole.leadership.length > 0 && (
                                    <div className="mt-10">
                                        <h4 className="text-2xl font-semibold text-[var(--riafco-blue)] mb-8 text-center">
                                            {t('team.sections.leadership')}
                                        </h4>
                                        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                                            {teamByRole.leadership.map((m) => (
                                                <TeamMemberCard key={m.id} member={m} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                    {/* Experts */}
                                    {teamByRole.experts.length > 0 && (
                                        <div className="mt-16">
                                            <h4 className="text-2xl font-semibold text-[var(--riafco-blue)] mb-8 text-center">
                                                {t('team.sections.experts')}
                                            </h4>
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                                                {teamByRole.experts.map((m) => (
                                                    <TeamMemberCard key={m.id} member={m} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tech */}
                                    {teamByRole.tech.length > 0 && (
                                        <div className="mt-16">
                                            <h4 className="text-2xl font-semibold text-[var(--riafco-blue)] mb-8 text-center">
                                                {t('team.sections.tech')}
                                            </h4>
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                                                {teamByRole.tech.map((m) => (
                                                    <TeamMemberCard key={m.id} member={m} />
                                                ))}
                                            </div>
                                        </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Section Valeurs */}
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-[var(--riafco-orange)] text-sm font-bold uppercase mb-2">
                            {t('team.sections.valuesKicker')}
                        </h6>
                        <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-[var(--riafco-blue)]">
                            {t('team.sections.valuesTitle')}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t('team.sections.valuesSubtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-12">
                        {[
                            { key: 'excellence', icon: <Icon.Target className="text-4xl text-[var(--riafco-orange)]" /> },
                            { key: 'collaboration', icon: <Icon.Users className="text-4xl text-[var(--riafco-orange)]" /> },
                            { key: 'innovation', icon: <Icon.Globe className="text-4xl text-[var(--riafco-orange)]" /> },
                            { key: 'integrity', icon: <Icon.Heart className="text-4xl text-[var(--riafco-orange)]" /> },
                            { key: 'sustainability', icon: <Icon.Trello className="text-4xl text-[var(--riafco-orange)]" /> },
                            { key: 'knowledge', icon: <Icon.BookOpen className="text-4xl text-[var(--riafco-orange)]" /> },
                        ].map((v, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md text-center">
                                <div className="mb-4 flex justify-center">{v.icon}</div>
                                <h4 className="font-semibold text-lg mb-2 text-[var(--riafco-blue)]">
                                    {t(`team.values.${v.key}.title`)}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t(`team.values.${v.key}.desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

// -------- Composant Membre --------
const TeamMemberCard = ({ member }) => {
    const email =
        member.email ||
        `${(member.name || '')
            .toLowerCase()
            .replace(/\s+/g, '.')
            .replace(/[^\w.-]/g, '')}@riafco.org`;

    const position = member.position || '';
    const getPositionIcon = () => {
        const p = position.toLowerCase();
        if (p.includes('président') || p.includes('president') || p.includes('chair')) return <Icon.UserCheck className="text-2xl" />;
        if (p.includes('vice-président') || p.includes('vice president')) return <Icon.Users className="text-2xl" />;
        if (p.includes('secrétaire') || p.includes('secretary')) return <Icon.FileText className="text-2xl" />;
        if (p.includes('expert') || p.includes('advisor') || p.includes('consultant')) return <Icon.Target className="text-2xl" />;
        if (p.includes('juriste') || p.includes('avocat') || p.includes('legal') || p.includes('lawyer'))
            return <Icon.Scales className="text-2xl" />;
        return <Icon.User className="text-2xl" />;
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={member.photo ? buildImageUrl(member.photo) : "/teams/default-member.jpg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-md"
                />
                <div className="absolute -top-2 -right-2 bg-[var(--riafco-blue)] text-white p-2 rounded-full">
                    {getPositionIcon()}
                </div>
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-[var(--riafco-blue)]">{member.name}</h3>
                {member.position && (
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{member.position}</p>
                )}
                {member.bio && (
                    <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm line-clamp-3">
                        {member.bio}
                    </p>
                )}

                <div className="mt-4 flex justify-center space-x-2">
                    {(member.socials?.linkedin || member.linkedin) && (
                        <a
                            href={member.socials?.linkedin || member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[var(--riafco-blue)] hover:text-[var(--riafco-orange)] transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="text-xl" />
                        </a>
                    )}
                    {(member.socials?.twitter || member.twitter) && (
                        <a
                            href={member.socials?.twitter || member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[var(--riafco-blue)] hover:text-[var(--riafco-orange)] transition-colors"
                            aria-label="Twitter / X"
                        >
                            <FaTwitter className="text-xl" />
                        </a>
                    )}
                    <a
                        href={`mailto:${email}`}
                        className="p-2 text-[var(--riafco-blue)] hover:text-[var(--riafco-orange)] transition-colors"
                        aria-label="Email"
                    >
                        <Icon.Mail className="text-xl" />
                    </a>
                </div>
            </div>
        </div>
    );
};
