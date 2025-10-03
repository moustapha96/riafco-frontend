/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import SEO_SVG from "../../assets/images/illustrator/SEO_SVG.svg";
import "tiny-slider/dist/tiny-slider.css";
import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import CookieModal from "../../component/cookieModal";
import { BsCheckCircle } from "react-icons/bs";
import HeaderBreakdumb from "../components/hearder-breakdumb";
import aboutUsService from "../../services/aboutUsService";
import partnerService from "../../services/partnerService";
import TinySlider from "tiny-slider-react";
import background from "../../assets/images/corporate/1.jpg";
import { useTranslation } from "react-i18next";

import riafcoAbout from "../../assets/images/riafco-about.jpg";


const settings = {
  container: ".tiny-two-item",
  controls: true,
  mouseDrag: true,
  loop: true,
  rewind: true,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 3000,
  navPosition: "bottom",
  controlsText: ['<i className="mdi mdi-chevron-left"></i>', '<i className="mdi mdi-chevron-right"></i>'],
  nav: false,
  speed: 400,
  gutter: 0,
  responsive: { 768: { items: 2 } },
};

export default function AproposPage() {
  const { t, i18n } = useTranslation();
  const [aboutUs, setAboutUs] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    fetchAboutUs();
    fetchPartners();
  }, []);

  const fetchAboutUs = async () => {
    try {
      const response = await aboutUsService.getAboutUs();
      setAboutUs(response.aboutUs);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations 'À propos' :", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await partnerService.getAll();
      setPartners(response.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des partenaires :", error);
    }
  };

  const formatParagraph = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <h4 key={index} className="font-bold text-xl mb-4 mt-6 text-gray-800 dark:text-white">
            {trimmed.slice(2, -2)}
          </h4>
        );
      }
      return (
        <p key={index} className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--riafco-orange)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar navClass="nav-light" />
      <HeaderBreakdumb
        title={t("about.title")}
        description={t("about.cta")}
        background={riafcoAbout}
      />

      {/* Section "Qui Sommes Nous" / "About Us" */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {i18n.language === "fr" ? "Un réseau au service de l’intermédiation financière pour les collectivités territoriales" : "A financial intermediation network for local authorities"}
            </h2>
            <div className="w-20 h-1 bg-[var(--riafco-orange)] mx-auto rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {i18n.language === "fr" ? (
                <>
                  À l’heure où les récents accords internationaux majeurs (Nouvel Agenda Urbain, Objectifs du Développement Durable, l’Accord de Paris, Programme d’Action d’Addis-Abeba) reconnaissent le rôle de premier plan joué par les collectivités locales pour relever les défis du développement, la question de la localisation et de la diversification du financement est au cœur des préoccupations.
                  <br /><br />
                  La décentralisation constitue pour la plupart des pays africains un outil important pour répondre à l’augmentation exponentielle des populations et de leurs besoins, et aux défis liés à l’urbanisation, au changement climatique, au développement économique, à la sécurité ou à la migration grandissante.
                  <br /><br />
                  Cependant, au regard des compétences qui leur sont transférées, les collectivités locales sont confrontées à une insuffisance chronique de leurs ressources financières caractérisée par une faible décentralisation financière, une fiscalité locale peu rentable, des marchés financiers non développés malgré un appétit des investisseurs et des partenaires privés, un manque de ressources humaines propres et compétentes, et enfin une certaine inadaptation des mécanismes et instruments de financement mis en place par les États et les bailleurs multilatéraux.
                </>
              ) : (
                <>
                  At a time when recent major international agreements (the New Urban Agenda, the Sustainable Development Goals, the Paris Agreement, the Addis Ababa Action Agenda) are recognizing the leading role played by local authorities in development challenges, the question of the location and diversification of funding is a matter of pressing concern.
                  <br /><br />
                  Across large parts of Africa, decentralization is an important tool for addressing the needs of a rapidly expanding population – and the challenges posed by urbanization, climate change, economic development, security and the growing issue of migration.
                  <br /><br />
                  Yet local authorities are chronically under-resourced to execute the powers entrusted to them because financial decentralization is limited, local tax-levying raises meagre funds, financial markets are under-developed – even though investors and private partners are willing – and authorities lack the skilled staff they need. Moreover, many of the funding mechanisms and instruments created by governments and multilateral donors are simply not up to the task.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Section "Les IFCL" / "LGFIs" */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {i18n.language === "fr" ? "Les Institutions de Financement des Collectivités Locales (IFCL)" : "Local Governments Financing Institutions (LGFIs)"}
            </h2>
            <div className="w-24 h-1 bg-[var(--riafco-orange)] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <img
                  src={SEO_SVG || "/placeholder.svg"}
                  alt={t("about.missions.imgAlt")}
                  className="w-full h-auto max-w-md mx-auto lg:max-w-full"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {i18n.language === "fr" ? (
                    <>
                      Les Institutions de Financement des Collectivités Locales (IFCL) sont les outils spécifiques de financement des investissements des collectivités locales créés dans la majorité des pays d’Afrique, dans le but de financer le développement local, et d’encourager les investissements réalisés sous maîtrise d’ouvrage des gouvernements locaux et régionaux.
                      <br /><br />
                      S’il est possible de distinguer deux catégories d’IFCL, le Fonds d’Investissement pour les Collectivités qui fait transiter en direction des collectivités des ressources provenant de différents canaux étatiques et des bailleurs de fonds, et l’Institution Financière Spécialisée qui accorde des prêts aux collectivités, ces institutions ont une position clef dans les systèmes nationaux de financement de la décentralisation, et travaillent en règle générale exclusivement pour les collectivités.
                      <br /><br />
                      Les IFCL embrassent ainsi des missions très larges, allant de la péréquation, à l’attribution de subventions, de prêts, au rehaussement de crédit (garanties des prêts locaux), au renforcement de capacités, à l’appui conseil dans le cycle de vie des projets, etc. Pourtant, pour beaucoup, le mandat et les missions donnés peinent à être entièrement mis en œuvre, notamment faute de ressources financières suffisantes entraînant ainsi une faiblesse des effectifs (tant en nombre qu’en compétences) et des services aux bénéficiaires.
                    </>
                  ) : (
                    <>
                      Most African countries have created "Local Governments Financing Institutions" (LGFIs) – special bodies set up to finance local authority investments to spur local development and encourage local and regional government-led investment programmes.
                      <br /><br />
                      There are two types of LGFI. The first are local investment funds, which channel resources from government and donor sources to local authorities. The second are specialized financial institutions, which lend money to local authorities. Both play a key role in national decentralization financing systems and, as a general rule, work exclusively for local authorities.
                      <br /><br />
                      LGFIs have an exceptionally broad remit spanning equalization, grants, loans, credit enhancement (local loan guarantees), capacity building, support and advice throughout the project life cycle, and much more besides. Yet many LGFIs find it hard to fulfil every aspect of their remit, typically because they lack sufficient resources to hire enough well-trained staff and to provide services to their beneficiaries.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Missions du RIAFCO" / "What RIAFCO does" */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {i18n.language === "fr" ? "Missions du RIAFCO" : "What RIAFCO does"}
            </h2>
            <div className="w-24 h-1 bg-[var(--riafco-orange)] mx-auto rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {i18n.language === "fr" ? (
                <>
                  Cadre d’échange et de partage d’expériences entre ces institutions, le RIAFCO se donne ainsi pour objectifs de porter ces questions au plus haut niveau et de trouver, à travers une vaste entreprise de capitalisation d’expériences, d’échanges entre pairs, de formations, et d’assistance technique, des réponses appropriées pour chaque membre.
                  <br /><br />
                  Plus spécifiquement, les 3 missions du RIAFCO sont les suivantes :
                </>
              ) : (
                <>
                  RIAFCO is a forum for LGFIs to exchange ideas and share experiences. Its purpose is to raise issues of concern to LGFIs at the very highest level and to find appropriate solutions for each member by drawing on past experience, fostering peer-to-peer exchange, and providing training and technical assistance.
                  <br /><br />
                  More specifically, RIAFCO has a three-pronged remit:
                </>
              )}
            </p>
            <div className="space-y-4">
              {(i18n.language === "fr"
                ? [
                  "Encourager les échanges entre pairs, à travers le partage d’expériences et d’informations sur le cadre dans lequel évolue chaque membre.",
                  "Renforcer les IFCL, à travers la mise à disposition de ressources documentaires, de formation et d’expertise technique.",
                  "Porter le plaidoyer en faveur des IFCL, en étant une force de proposition et de représentation aux niveaux local, national et international auprès des acteurs de la décentralisation."
                ]
                : [
                  "Fostering peer-to-peer exchange by encouraging members to share their experiences and information about their environment.",
                  "Strengthening LGFIs by providing literature, training and technical expertise.",
                  "Advocating for the cause of LGFIs by lobbying and representing their interests to decentralization partners at the local, national and international levels."
                ]
              ).map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <BsCheckCircle className="text-[var(--riafco-orange)] text-xl mt-1" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section "Partenaires" / "Partners" */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[var(--riafco-orange)] font-semibold text-lg mb-4">
              {t("about.partners.kicker")}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t("about.partners.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("about.partners.desc")}
            </p>
            <div className="w-24 h-1 bg-[var(--riafco-orange)] mx-auto rounded-full mt-6"></div>
          </div>
          {partners && partners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative">
                        <img
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-orange-100 group-hover:border-orange-200 transition-colors"
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                        />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold text-[var(--riafco-orange)]">{partner.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{partner.country}</p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{partner.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-slate-700 rounded-2xl h-64"></div>
              ))}
              </div>
          )}
        </div>
      </section>

      {/* Section "Partenaires (slider)" */}
      {partners.length > 0 && (
        <section className="relative md:py-24 py-16">
          <div className="container relative">
            <div className="grid grid-cols-1 pb-8 text-center">
              <h6 className="mb-4 text-base font-medium text-[var(--riafco-orange)]">
                {t("about.partners.kicker")}
              </h6>
              <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                {t("about.partners.title")}
              </h3>
              <p className="text-slate-400 max-w-xl mx-auto">{t("about.partners.desc")}</p>
            </div>
            <div className="grid relative grid-cols-1 mt-8">
              <div className="tiny-two-item">
                <TinySlider settings={settings}>
                  {partners.map((partner, index) => (
                    <div className="tiny-slide" key={index}>
                      <div className="lg:flex p-6 lg:p-0 relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden m-2">
                        <img
                          className="size-24 lg:w-48 lg:h-auto lg:rounded-none rounded-full mx-auto object-contain"
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                        />
                        <div className="pt-6 lg:p-6 text-center lg:text-start space-y-4">
                          <p className="text-base text-slate-400">{partner.description}</p>
                          <div>
                            <span className="text-[var(--riafco-orange)] block mb-1">{partner.name}</span>
                            <span className="text-slate-400 text-sm dark:text-white/60 block">
                              {partner.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TinySlider>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SVG de séparation */}
      <div className="relative">
        <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-gray-50 dark:text-slate-800">
          <svg
            className="w-full h-auto scale-[2.0] origin-top"
            viewBox="0 0 2880 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M720 125L2160 0H2880V250H0V125H720Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <Footer />
      <CookieModal />
    </div>
  );
}
