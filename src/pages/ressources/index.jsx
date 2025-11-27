
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";

import Navbar from "../../component/Navbar/navbar";
import CookieModal from "../../component/cookieModal";
import * as Icon from "react-feather";
import { FaDownload, FaEye, FaTag, FaCalendar, FaFolder } from "react-icons/fa";
import { BiFile, BiFileBlank } from "react-icons/bi";
import { MdPictureAsPdf, MdImage, MdVideoLibrary, MdDescription } from "react-icons/md";
import resourceService from "../../services/resourceService";
import { buildImageUrl } from "../../utils/imageUtils";
import HeaderBreakdumb from "../components/hearder-breakdumb";
import { useTranslation } from "react-i18next";

import riafcoAbout from "../../assets/images/riafco-about.jpg";
import Footer from "../../component/Footer/footer";

export default function RessourcePage() {
  const { t, i18n } = useTranslation();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const locale = i18n.language === "fr" ? "fr-FR" : "en-US";

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory, searchTerm]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await resourceService.getAll({
        page: currentPage,
        limit: 10,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: searchTerm || undefined,
      });

      if (response.success) {
        setResources(response.data);
        setTotalPages(response.pagination.pages);
        setTotalItems(response.pagination.total);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des ressources :", error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes("pdf")) return <MdPictureAsPdf className="text-red-500 text-2xl" />;
    if (fileType?.includes("image")) return <MdImage className="text-blue-500 text-2xl" />;
    if (fileType?.includes("video")) return <MdVideoLibrary className="text-purple-500 text-2xl" />;
    if (fileType?.includes("document") || fileType?.includes("word"))
      return <MdDescription className="text-[var('--riafco-orange')] text-2xl" />;
    return <BiFile className="text-gray-500 text-2xl" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return `0 ${t("resources.size.units.0")}`;
    const k = 1024;
    const units = t("resources.size.units", { returnObjects: true }) || ["bytes", "KB", "MB", "GB"];
    const i = Math.min(units.length - 1, Math.max(0, Math.floor(Math.log(bytes) / Math.log(k))));
    const value = Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${value} ${units[i]}`;
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });

  const handleDownload = (resource) => {
    const link = document.createElement("a");
    link.href = buildImageUrl(resource.url);
    link.download = resource.fileName || resource.title || "resource";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = [...new Set(resources.map((r) => r.category?.name).filter(Boolean))];

  return (
    <div>
      <Navbar navClass="nav-light" />

      <HeaderBreakdumb
        title={t("resources.header.title")}
        description={t("resources.header.description")}
        // background={riafcoAbout}
      />

      <section className="relative md:py-24 py-16">
        {/* Search + (optionnel) filtre catégorie */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative">
              <Icon.Search className="absolute left-3 top-3 h-5 w-10 text-gray-400" />
              <input
                type="text"
                placeholder={t("resources.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--riafco-blue)] focus:border-transparent"
                aria-label={t("resources.searchPlaceholder")}
              />
            </div>

            <div className="md:col-span-1">
              <select
                className="w-full py-3 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--riafco-blue)] focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSelectedCategory(e.target.value);
                }}
              >
                <option value="all">{t("resources.labels.category")}: All</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--riafco-blue)] mb-4"></div>
              <span>{t("resources.loading")}</span>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      {resource.couverture && (
                        <img
                          src={buildImageUrl(resource.couverture) || "/activities/default-activity.jpg"}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          alt={resource.title}
                        />
                      )}

                    </div>

                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(resource.fileType)}
                          <div>
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white line-clamp-2 group-hover:text-[var(--riafco-blue)] transition-colors">
                              {resource.title}
                            </h3>
                            {typeof resource.fileSize === "number" && (
                              <p className="text-sm text-gray-500 mt-1">{formatFileSize(resource.fileSize)}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {resource.description && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
                          {resource.description}
                        </p>
                      )}
                      {resource.lien && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
                          <a
                            href={buildImageUrl(resource.lien)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline break-all"
                            title={resource.lien}
                          >
                            {resource.lien}
                          </a>
                        </p>
                      )}


                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <FaFolder className="h-3 w-3" />
                          <span>{resource.category?.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaCalendar className="h-3 w-3" />
                          <span>{formatDate(resource.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {resource.tags && resource.tags.length > 0 && (
                      <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[var(--riafco-orange)]/10 text-[var(--riafco-orange)] border border-[var(--riafco-orange)]/20"
                            >
                              <FaTag className="h-2 w-2 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleDownload(resource)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 ant-btn-primary text-white text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                          <FaDownload className="h-4 w-4 mr-2" />
                          {t("resources.actions.download")}
                        </button>

                        {resource.fileType?.includes("image") || resource.fileType?.includes("pdf") ? (
                          <button
                            onClick={() => window.open(resource.url, "_blank")}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
                          >
                            <FaEye className="h-4 w-4 mr-2" />
                            {t("resources.actions.preview")}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("resources.pagination.prev")}
                  </button>

                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                            ? "bg-[var(--riafco-blue)] text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("resources.pagination.next")}
                  </button>
                </div>
              )}

              {/* Empty state */}
              {resources.length === 0 && !loading && (
                <div className="text-center py-20">
                  <BiFileBlank className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t("resources.empty.title")}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{t("resources.empty.subtitle")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <CookieModal />
    </div>
  );
}
