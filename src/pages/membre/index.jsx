/* eslint-disable react/no-unknown-property */

"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { feature } from "topojson-client";
import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";
import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import CookieModal from "../../component/cookieModal";
import HeaderBreakdumb from "../components/hearder-breakdumb";
import ifclService from "../../services/ifclService";
import africaTopology from "../../data/africa.geo.json";
import { toast } from "react-toastify";
import { Home, Minus, Plus } from "react-feather";
import { useTranslation } from "react-i18next";

const africaGeoData = feature(africaTopology, africaTopology.objects.africa);
import riafcoAbout from "../../assets/images/riafco-about.jpg";
import { buildImageUrl } from "../../utils/imageUtils";

const settings = {
  container: ".tiny-two-item",
  controls: true,
  mouseDrag: true,
  loop: true,
  rewind: true,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 4000,
  navPosition: "bottom",
  controlsText: ['<i className="mdi mdi-chevron-left"></i>', '<i className="mdi mdi-chevron-right"></i>'],
  nav: false,
  speed: 400,
  gutter: 20,
  responsive: { 640: { items: 1 }, 768: { items: 2 }, 1024: { items: 3 } },
};

export default function MembrePage() {
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // === Nouveau : états liés au regroupement par pays ===
  const [selectedCountryName, setSelectedCountryName] = useState(null); // string (nom pays cliqué)
  const [countryMembers, setCountryMembers] = useState([]);            // tous les membres de ce pays
  const [activeMember, setActiveMember] = useState(null);              // membre actuellement ouvert dans le popup
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({ totalMembers: 0, activeMembers: 0, observers: 0, totalCriteria: 0 });
  const [mapPosition, setMapPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const mapRef = useRef(null);

  // Mappage FR/EN -> code (conservé)
  const africanCountryMapping = {
    "sénégal": { code: "SN", en: "Senegal" },
    "côte d'ivoire": { code: "CI", en: "Ivory Coast" },
    "burkina faso": { code: "BF", en: "Burkina Faso" },
    "mali": { code: "ML", en: "Mali" },
    "guinée": { code: "GN", en: "Guinea" },
    "niger": { code: "NE", en: "Niger" },
    "togo": { code: "TG", en: "Togo" },
    "bénin": { code: "BJ", en: "Benin" },
    "cameroun": { code: "CM", en: "Cameroon" },
    "république démocratique du congo": { code: "CD", en: "Democratic Republic of the Congo" },
    "république du congo": { code: "CG", en: "Republic of the Congo" },
    "gabon": { code: "GA", en: "Gabon" },
    "tchad": { code: "TD", en: "Chad" },
    "centrafrique": { code: "CF", en: "Central African Republic" },
    "madagascar": { code: "MG", en: "Madagascar" },
    "maroc": { code: "MA", en: "Morocco" },
    "algérie": { code: "DZ", en: "Algeria" },
    "tunisie": { code: "TN", en: "Tunisia" },
    "libye": { code: "LY", en: "Libya" },
    "égypte": { code: "EG", en: "Egypt" },
    "soudan": { code: "SD", en: "Sudan" },
    "éthiopie": { code: "ET", en: "Ethiopia" },
    "érythrée": { code: "ER", en: "Eritrea" },
    "djibouti": { code: "DJ", en: "Djibouti" },
    "somalie": { code: "SO", en: "Somalia" },
    "kenya": { code: "KE", en: "Kenya" },
    "uganda": { code: "UG", en: "Uganda" },
    "tanzanie": { code: "TZ", en: "Tanzania" },
    "mozambique": { code: "MZ", en: "Mozambique" },
    "zambie": { code: "ZM", en: "Zambia" },
    "malawi": { code: "MW", en: "Malawi" },
    "zimbabwe": { code: "ZW", en: "Zimbabwe" },
    "botswana": { code: "BW", en: "Botswana" },
    "namibie": { code: "NA", en: "Namibia" },
    "afrique du sud": { code: "ZA", en: "South Africa" },
    "lesotho": { code: "LS", en: "Lesotho" },
    "eswatini": { code: "SZ", en: "Eswatini" },
    "angola": { code: "AO", en: "Angola" },
    "guinée équatoriale": { code: "GQ", en: "Equatorial Guinea" },
    "guinée-bissau": { code: "GW", en: "Guinea-Bissau" },
    "liberia": { code: "LR", en: "Liberia" },
    "sierra leone": { code: "SL", en: "Sierra Leone" },
    "ghana": { code: "GH", en: "Ghana" },
    "nigeria": { code: "NG", en: "Nigeria" },
    "cap-vert": { code: "CV", en: "Cape Verde" },
    "sao tomé-et-principe": { code: "ST", en: "Sao Tome and Principe" },
    "seychelles": { code: "SC", en: "Seychelles" },
    "comores": { code: "KM", en: "Comoros" },
    "mauritanie": { code: "MR", en: "Mauritania" },
    "maurice": { code: "MU", en: "Mauritius" },
    "senegal": { code: "SN", en: "Senegal" },
    "ivory coast": { code: "CI", en: "Ivory Coast" },
    "cote d'ivoire": { code: "CI", en: "Ivory Coast" },
    "democratic republic of congo": { code: "CD", en: "Democratic Republic of the Congo" },
    "central african republic": { code: "CF", en: "Central African Republic" },
    "south africa": { code: "ZA", en: "South Africa" },
    "equatorial guinea": { code: "GQ", en: "Equatorial Guinea" },
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    fetchCountries();
  }, []);

  const normalizeString = (str) =>
    str?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

  const getCountryCode = (countryName) => {
    const normalizedName = normalizeString(countryName);
    for (const [key, value] of Object.entries(africanCountryMapping)) {
      if (normalizeString(key) === normalizedName) return value.code;
    }
    return null;
  };

  // === Nouveau : indexation par code & noms normalisés pour regroupement rapide
  const { indexByKey, keysFor } = useMemo(() => {
    const map = new Map(); // key -> [entries]
    const keysFor = (entry) => {
      const arr = [];
      const code = (entry.code || "").toUpperCase();
      const fr = normalizeString(entry.name_fr || "");
      const en = normalizeString(entry.name_en || "");
      if (code) arr.push(code);
      if (fr) arr.push(fr);
      if (en) arr.push(en);
      return Array.from(new Set(arr));
    };
    return {
      indexByKey: {
        build(list) {
          map.clear();
          (list || []).forEach((e) => {
            keysFor(e).forEach((k) => {
              if (!map.has(k)) map.set(k, []);
              map.get(k).push(e);
            });
          });
          return map;
        },
        getMap: () => map,
      },
      keysFor,
    };
  }, []);

  useEffect(() => {
    // à chaque chargement, construire l’index
    indexByKey.build(countries);
  }, [countries, indexByKey]);

  const fetchCountries = async () => {
    try {
      const response = await ifclService.getAll();
      if (response.datas) {
        const africanMembers = response.datas;
        setCountries(africanMembers);

        const activeMembers = africanMembers.filter((c) => c.status === "ACTIVE").length;
        const totalCriteria = africanMembers.reduce((sum, c) => sum + (c._count?.criteria || 0), 0);
        setStats({
          totalMembers: africanMembers.length,
          activeMembers,
          observers: africanMembers.length - activeMembers,
          totalCriteria,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des pays :", error);
    } finally {
      setLoading(false);
    }
  };

  // Retourne tous les membres correspondant à un nom de pays (par code / FR / EN)
  const findMembersForCountryName = (name) => {
    const kCode = (getCountryCode(name) || "").toUpperCase();
    const kNorm = normalizeString(name);
    const map = indexByKey.getMap();
    const res = new Set();
    if (kCode && map.has(kCode)) map.get(kCode).forEach((e) => res.add(e));
    if (kNorm && map.has(kNorm)) map.get(kNorm).forEach((e) => res.add(e));
    return Array.from(res);
  };

  const anyMemberForGeo = (geo) => {
    const geoName = geo.properties.name;
    return findMembersForCountryName(geoName).length > 0;
  };

  const getCountryColor = (geo) => {
    const geoName = geo.properties.name;
    const has = anyMemberForGeo(geo);
    if (selectedCountryName && normalizeString(selectedCountryName) === normalizeString(geoName)) return "#FF5722";
    if (has) {
      // s'il y a au moins un actif -> vert, sinon jaune
      const members = findMembersForCountryName(geoName);
      const hasActive = members.some((m) => m.status === "ACTIVE");
      return hasActive ? "#4CAF50" : "#FFC107";
    }
    return "#E0E0E0";
  };

  // === CLIC CARTE : regroupe tous les membres du pays cliqué
  const handleMapCountryClick = (geo) => {
    const geoName = geo.properties.name;
    const members = findMembersForCountryName(geoName);
    if (members.length === 0) {
      toast.info(
        t("members.mapSection.toast.notMember", { country: geoName })
      );
      return;
    }
    setSelectedCountryName(geoName);
    setCountryMembers(members);
    setActiveMember(members.length === 1 ? members[0] : null);
    setShowModal(true);
  };

  // === CLIC CARTE DU SLIDER : même logique -> regrouper par pays de cet élément
  const handleCardClick = (countryEntry) => {
    // on cherche tous les membres qui partagent code / nom FR / nom EN
    const keys = keysFor(countryEntry);
    const map = indexByKey.getMap();
    const bag = new Set();
    keys.forEach((k) => {
      if (map.has(k)) map.get(k).forEach((e) => bag.add(e));
    });
    const members = Array.from(bag);
    const countryLabel =
      countryEntry?.name_fr || countryEntry?.name_en || countryEntry?.pays_fr || countryEntry?.pays_en || countryEntry?.code || "Pays";

    setSelectedCountryName(countryLabel);
    setCountryMembers(members);
    setActiveMember(members.length === 1 ? members[0] : null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCountryName(null);
    setCountryMembers([]);
    setActiveMember(null);
  };

  const handleZoomIn = () => setMapPosition({ ...mapPosition, zoom: mapPosition.zoom * 1.5 });
  const handleZoomOut = () => setMapPosition({ ...mapPosition, zoom: Math.max(1, mapPosition.zoom / 1.5) });
  const handleResetView = () => setMapPosition({ coordinates: [0, 0], zoom: 1 });

  const nameByLang = (obj) => (i18n.language === "fr" ? obj?.name_fr || obj?.name_en : obj?.name_en || obj?.name_fr);
  const descByLang = (obj) =>
    i18n.language === "fr" ? obj?.description_fr || obj?.description_en || "" : obj?.description_en || obj?.description_fr || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar navClass="nav-light" />

      <HeaderBreakdumb
        title={t("members.header.title")}
        description={t("members.header.description")}
        background={riafcoAbout}
      />



      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-[var(--riafco-blue)] to-[var(--riafco-orange)] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--riafco-blue)]/20 to-transparent"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 text-center text-white">
            <h1 className="mb-6 text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: t("members.hero.title") }} />
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              {t("members.hero.subtitle")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stats.totalMembers}</div>
                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.totalMembers")}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-green-400">{stats.activeMembers}</div>
                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.activeMembers")}</div>
              </div>
              {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-orange-400">{stats.observers}</div>
                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.observers")}</div>
              </div> */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">{stats.totalCriteria}</div>
                <div className="text-sm md:text-base text-blue-100">{t("members.hero.stats.totalCriteria")}</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>{t("members.hero.legend.active")}</span>
              </div>

              {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>{t("members.hero.legend.observer")}</span>
              </div> */}

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>{t("members.hero.legend.others")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>{t("members.hero.legend.selected")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Carte */}
      <section className="relative py-12 md:py-20 bg-white">
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 pb-8 md:pb-12 text-center">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
              dangerouslySetInnerHTML={{ __html: t("members.mapSection.title") }} />
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("members.mapSection.description")}
            </p>
          </div>

          <div className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] w-full rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden border-2 md:border-4 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white/90 p-2 rounded-lg shadow-md">
              <button onClick={handleZoomIn} className="p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors" title={t("members.mapSection.controls.zoomIn")}>
                <Plus className="text-[var(--riafco-blue)]" />
              </button>
              <button onClick={handleZoomOut} className="p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors" title={t("members.mapSection.controls.zoomOut")}>
                <Minus className="text-[var(--riafco-blue)]" />
              </button>
              <button onClick={handleResetView} className="p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors" title={t("members.mapSection.controls.reset")}>
                <Home className="text-[var(--riafco-blue)]" />
              </button>
            </div>

            <ComposableMap ref={mapRef} projection="geoMercator" projectionConfig={{ scale: 400, center: [20, 0], rotate: [0, 0, 0] }} style={{ width: "100%", height: "100%" }}>
              <ZoomableGroup zoom={mapPosition.zoom} center={mapPosition.coordinates} onMoveEnd={(position) => setMapPosition(position)}>
                <Geographies geography={africaGeoData}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleMapCountryClick(geo)}
                        style={{
                          default: { fill: getCountryColor(geo), stroke: "#FFFFFF", strokeWidth: 0.5, outline: "none", cursor: "pointer", transition: "fill 0.3s ease" },
                          hover: { fill: "#2196F3", stroke: "#FFFFFF", strokeWidth: 0.5, outline: "none" },
                          pressed: { fill: "#E91E63", stroke: "#FFFFFF", strokeWidth: 0.5, outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Légende */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>{t("members.hero.legend.active")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>{t("members.hero.legend.observer")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>{t("members.hero.legend.others")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>{t("members.hero.legend.selected")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pays membres (carrousel). Clic -> ouvre le regroupement pour ce pays */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 pb-8 md:pb-12 text-center">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
              dangerouslySetInnerHTML={{ __html: t("members.listSection.title") }} />
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("members.listSection.description")}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--riafco-blue)] mb-4"></div>
              <p className="text-gray-600">{t("members.listSection.loading")}</p>
            </div>
          ) : countries.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("members.listSection.emptyTitle")}</h3>
              <p className="text-gray-600">{t("members.listSection.emptyDescription")}</p>
            </div>
          ) : (
            <div className="grid relative grid-cols-1 mt-8">
              <div className="tiny-two-item">
                <TinySlider settings={settings}>
                  {countries.map((country, index) => (
                    <div className="tiny-slide" key={index}>
                      <div
                        className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden m-2 md:m-3 cursor-pointer transform hover:-translate-y-2 border border-gray-100 group"
                        onClick={() => handleCardClick(country)}
                      >
                        <div className="p-4 md:p-6">
                          <div className="flex justify-center mb-4">
                            {country.flag && typeof country.flag === "string" && country.flag.startsWith("/") ? (
                              <img
                                src={buildImageUrl(country.flag) || "/placeholder.svg"}
                                alt={`Flag ${nameByLang(country)}`}
                                className="w-16 md:w-20 h-10 md:h-12 object-contain border border-gray-200 rounded shadow-sm group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform">
                                {country.flag || "🏳️"}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-1">
                            {nameByLang(country)}
                          </h3>

                          {country.name_en && country.name_en !== country.name_fr && i18n.language === "fr" && (
                            <p className="text-sm text-gray-500 text-center mb-3">{country.name_en}</p>
                          )}

                          {descByLang(country) && (
                            <div
                              className="text-gray-600 text-sm text-center mb-4 line-clamp-3"
                              dangerouslySetInnerHTML={{ __html: descByLang(country) }}
                            />
                          )}

                          <div className="flex justify-center mb-4">
                            <span
                              className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium ${country._count?.criteria > 0 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                            >
                              {t("members.listSection.criteriaBadge", {
                                count: country._count?.criteria || 0
                              })}
                            </span>
                          </div>

                          <button className="w-full ant-btn-primary text-white py-2 px-4 rounded-lg font-medium transition-colors group-hover:bg-[var(--riafco-blue)]">
                            {t("members.listSection.details")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TinySlider>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popup regroupé par pays */}
      {showModal && selectedCountryName && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl md:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center rounded-t-xl md:rounded-t-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {selectedCountryName} — {countryMembers.length} {countryMembers.length > 1 ? t("members.modal.members") : t("members.modal.member")}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <div className="p-4 md:p-6">
              {/* Si plusieurs membres : grille + sélection d’un actif */}
              {countryMembers.length > 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {countryMembers.map((m) => (
                      <div key={m.id} className={`border rounded-lg p-4 hover:shadow ${activeMember?.id === m.id ? "ring-2 ring-[var(--riafco-blue)]" : "border-gray-200"}`}>
                        <div className="flex items-center gap-3">
                          {m.flag && typeof m.flag === "string" && m.flag.startsWith("/") ? (
                            <img src={buildImageUrl(m.flag)} alt={`Flag ${nameByLang(m)}`} className="w-12 h-8 object-contain border border-gray-200 rounded" />
                          ) : (
                            <span className="text-2xl">{m.flag || "🏳️"}</span>
                          )}
                          <div className="flex-1">
                            <div className="font-semibold">{nameByLang(m)}</div>
                            <div className="text-xs text-gray-500">{m.name_en && m.name_en !== m.name_fr ? m.name_en : ""}</div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${m.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {m.status === "ACTIVE" ? t("members.modal.status.active") : t("members.modal.status.observer")}
                          </span>
                        </div>
                        {m.description_fr && (
                          <div className="text-gray-600 text-sm mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: descByLang(m) }} />
                        )}
                        <div className="mt-3 text-right">
                          <button
                            onClick={() => setActiveMember(m)}
                            className="text-sm px-3 py-1 rounded ant-btn-primary hover:opacity-90"
                          >
                            {t("members.listSection.details")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="my-4" />
                </>
              )}

              {/* Détail (unique ou sélectionné) */}
              {(countryMembers.length === 1 ? countryMembers[0] : activeMember) && (() => {
                const c = countryMembers.length === 1 ? countryMembers[0] : activeMember;
                return (
                  <div>
                    <div className="text-center mb-6">
                      {c.flag && typeof c.flag === "string" && c.flag.startsWith("/") ? (
                        <img
                          src={buildImageUrl(c.flag) || "/placeholder.svg"}
                          alt={`Flag ${nameByLang(c)}`}
                          className="w-20 md:w-24 h-12 md:h-16 mx-auto object-contain border border-gray-200 rounded shadow-sm mb-4"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl block mb-4">{c.flag || "🏳️"}</span>
                      )}
                      <h3 className="text-2xl font-bold text-[var(--riafco-bleu)] mb-1">{nameByLang(c)}</h3>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${c.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {c.status === "ACTIVE" ? t("members.modal.status.active") : t("members.modal.status.observer")}
                      </span>
                    </div>

                    {(c.pays_fr || c.pays_en) && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">{t("members.modal.officialNames")}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {c.pays_fr && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <span className="text-sm text-[var(--riafco-blue)] font-medium">{t("members.modal.lang.fr")}</span>
                              <p className="text-lg font-semibold text-[var(--riafco-orange)]">{c.pays_fr}</p>
                            </div>
                          )}
                          {c.pays_en && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <span className="text-sm text-[var(--riafco-blue)] font-medium">{t("members.modal.lang.en")}</span>
                              <p className="text-lg font-semibold text-[var(--riafco-orange)]">{c.pays_en}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{t("members.modal.generalInfo")}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {c.code && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <span className="text-sm text-[var(--riafco-blue)] font-medium">{t("members.modal.countryCode")}</span>
                            <p className="text-lg font-semibold text-[var(--riafco-orange)]">{c.code}</p>
                          </div>
                        )}
                        {c.coordonnees && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <span className="text-sm text-[var(--riafco-blue)] font-medium">{t("members.modal.coordinates")}</span>
                            <p className="text-lg font-semibold text-[var(--riafco-orange)]">{c.coordonnees}</p>
                          </div>
                        )}
                        <div className="bg-green-50 p-4 rounded-lg">
                          <span className="text-sm text-green-600 font-medium">{t("members.modal.criteriaCount")}</span>
                          <p className="text-lg font-semibold text-green-800">{c._count?.criteria || 0}</p>
                        </div>
                        {c.createdAt && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <span className="text-sm text-purple-600 font-medium">{t("members.modal.joinDate")}</span>
                            <p className="text-lg font-semibold text-purple-800">
                              {new Date(c.createdAt).toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {c.description_fr && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">{t("members.modal.descriptionFr")}</h4>
                        <div className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: c.description_fr }} />
                      </div>
                    )}
                    {c.description_en && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">{t("members.modal.descriptionEn")}</h4>
                        <div className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: c.description_en }} />
                      </div>
                    )}

                    {Array.isArray(c.criteria) && c.criteria.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">{t("members.modal.filledCriteria")}</h4>
                        <div className="space-y-3">
                          {c.criteria.map((criterion) => (
                            <div key={criterion.id || criterion.name} className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                              <h5 className="font-semibold text-blue-700 mb-1">{criterion.name}</h5>
                              <p className="text-gray-600 text-sm">{criterion.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="flex justify-center pt-4 gap-2">
                {countryMembers.length > 1 && activeMember && (
                  <button
                    onClick={() => setActiveMember(null)}
                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    {t("members.modal.backToList") || "Retour à la liste"}
                  </button>
                )}
                <button onClick={closeModal} className="ant-btn-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium transition-colors">
                  {t("members.modal.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CookieModal />

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }
      `}</style>
    </div>
  );
}
