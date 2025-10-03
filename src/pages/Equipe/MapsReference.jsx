"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Breadcrumb, Button, Modal, Card, Tag, Descriptions } from "antd"
import ifclService from "../../../services/ifclService"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import africaGeo from "../../../data/africa.geo.json"
import { toast } from "sonner"

const MapsIfcl = () => {
    const [ifcls, setIfcls] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCountryData, setSelectedCountryData] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr")
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
        fetchIFCLs()
    }, [])

    const getCountryColor = (countryName) => {
        const countryData = ifcls.find(
            (country) =>
                country.name.toLowerCase() === countryName.toLowerCase() || country.code === getCountryCode(countryName),
        )

        if (selectedCountry === countryName) {
            return "#FF5722" // Orange pour le pays sélectionné
        }

        if (countryData) {
            return "#4CAF50" // Vert pour les pays membres
        }

        return "#E0E0E0" // Gris clair pour les pays non-membres
    }

    const getCountryCode = (countryName) => {
        const countryMapping = {
            senegal: "SN",
            france: "FR",
            canada: "CA",
        }
        return countryMapping[countryName.toLowerCase()]
    }

    const handleCountryClick = (countryName) => {
        const countryData = ifcls.find(
            (country) =>
                country.name.toLowerCase() === countryName.toLowerCase() || country.code === getCountryCode(countryName),
        )

        if (countryData) {
            setSelectedCountry(countryName)
            setSelectedCountryData(countryData)
            setIsModalVisible(true)
            console.log("Pays membre sélectionné :", countryData)
        } else {
            toast.info(`${countryName} n'est pas un pays membre de la RIAFCO`)
        }
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        setSelectedCountry(null)
        setSelectedCountryData(null)
    }

    const fetchIFCLs = async () => {
        setLoading(true)
        try {
            const response = await ifclService.getAllOf()
            console.log("Réponse de l'API:", response)
            setIfcls(response.datas || [])
        } catch (error) {
            console.error("Erreur lors de la récupération des IFCL:", error)
            toast.error("Erreur lors du chargement des IFCL")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="md:flex justify-between items-center mb-6">
                    <h5 className="text-lg font-semibold">Gestion des Pays membres</h5>
                    <Breadcrumb
                        items={[
                            { title: <Link to="/">Dashboard</Link> },
                            { title: <Link to="/admin/ifcl">Pays membres</Link> },
                            { title: "Maps" },
                        ]}
                    />
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h6 className="font-semibold mb-2">Légende:</h6>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span>Pays membres ({ifcls.length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <span>Pays sélectionné</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded"></div>
                            <span>Autres pays</span>
                        </div>
                    </div>
                </div>

                {/* Conteneur de la carte */}
                <div style={{ width: "100%", height: "100vh", marginBottom: "20px" }}>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 380,
                            center: [20, -5],
                            rotate: [0, 0, 0],
                        }}
                        style={{ width: "100%", height: "100%", marginTop: "10%" }}
                    >
                        <Geographies geography={africaGeo}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const countryName = geo.properties.name
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onClick={() => handleCountryClick(countryName)}
                                            style={{
                                                default: {
                                                    fill: getCountryColor(countryName),
                                                    stroke: "#FFFFFF",
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                    cursor: "pointer",
                                                },
                                                hover: {
                                                    fill: "#2196F3",
                                                    stroke: "#FFFFFF",
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: "#E91E63",
                                                    stroke: "#FFFFFF",
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    )
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>

                <Modal
                    title="Détails du Pays Membre"
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    width={600}
                    footer={[
                        <Button key="close" onClick={handleCloseModal}>
                            Fermer
                        </Button>,
                    ]}
                >
                    {selectedCountryData && (
                        <div>
                            <Card>
                                <div className="flex items-center gap-3 mb-4">
                                    {selectedCountryData.flag && (
                                        <img src={selectedCountryData.flag} alt="" className="w-35 h-35 rounded" />
                                    )}

                                    <div>
                                        <h3 className="text-xl font-bold">{selectedCountryData.name}</h3>
                                        <Tag color="green">{selectedCountryData.status}</Tag>
                                    </div>
                                </div>

                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="Code Pays">{selectedCountryData.code}</Descriptions.Item>
                                    <Descriptions.Item label="Coordonnées">
                                        Lat: {selectedCountryData.latitude}, Long: {selectedCountryData.longitude}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Nombre de critères">
                                        {selectedCountryData._count?.criteria || 0}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date d'adhésion">
                                        {new Date(selectedCountryData.createdAt).toLocaleDateString("fr-FR")}
                                    </Descriptions.Item>
                                </Descriptions>

                                {selectedCountryData.description && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">Description:</h4>
                                        <p>{selectedCountryData.description}</p>
                                    </div>
                                )}

                                {selectedCountryData.criteria && selectedCountryData.criteria.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">Critères d'adhésion:</h4>
                                        <div className="space-y-2">
                                            {selectedCountryData.criteria.map((criterion) => (
                                                <Card key={criterion.id} size="small">
                                                    <h5 className="font-medium">{criterion.name}</h5>
                                                    <p className="text-gray-600 text-sm">{criterion.description}</p>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default MapsIfcl
