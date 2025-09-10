import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TinySlider from 'tiny-slider-react';
import 'tiny-slider/dist/tiny-slider.css';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import CookieModal from '../../component/cookieModal';
import HeaderBreakdumb from '../components/hearder-breakdumb';
import ifclService from '../../services/ifclService';

// Correction des icônes par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const settings = {
  container: '.tiny-two-item',
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
  responsive: {
    768: {
      items: 2
    },
  },
};

export default function MembrePage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await ifclService.getAll();
      if (response.data && response.data.datas) {
        setCountries(response.data.datas.filter(country => country.status === "ACTIVE"));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des pays :", error);
    } finally {
      setLoading(false);
    }
  };

  // Position centrale de la carte (Afrique)
  const africaCenter = [8.7832, 17.8735];

  return (
    <div>
      <Navbar />
      <HeaderBreakdumb title="PAYS MEMBRES" />

      {/* Section Carte Interactive */}
      <section className="relative md:py-16 py-10 bg-gray-50">
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h6 className="mb-4 text-base font-medium text-[--riafco-orange]">Nos pays membres</h6>
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Découvrez les pays <span className="text-[--riafco-blue]">actifs</span> au sein de RIAFCO
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              RIAFCO connecte les acteurs du développement à travers l'Afrique et au-delà.
              Explorez nos pays membres et leurs engagements.
            </p>
          </div>

          {/* Carte Leaflet */}
          <div className="relative h-[500px] w-full rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <MapContainer
              center={africaCenter}
              zoom={3}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {countries.map((country) => (
                <Marker
                  key={country.id}
                  position={[country.latitude, country.longitude]}
                  title={country.name}
                >
                  <Popup>
                    <div className="text-center">
                      {country.flag && typeof country.flag === 'string' && country.flag.startsWith('/') ? (
                        <img
                          src={country.flag}
                          alt={`Drapeau ${country.name}`}
                          className="w-12 h-8 mx-auto mb-2 object-contain"
                        />
                      ) : (
                        <span className="text-2xl mb-2 block">{country.flag}</span>
                      )}
                      <h3 className="font-semibold text-[--riafco-blue]">{country.name}</h3>
                      {country.description && (
                        <div
                          className="text-slate-600 text-sm mt-2"
                          dangerouslySetInnerHTML={{ __html: country.description }}
                        />
                      )}
                      {country._count.criteria > 0 && (
                        <p className="text-[--riafco-orange] text-xs mt-2">
                          {country._count.criteria} critère{s} d'adhésion rempli{s}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Section Liste des Pays (Slider) */}
      <section className="relative md:py-16 py-10">
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h6 className="mb-4 text-base font-medium text-[--riafco-orange]">Nos partenaires</h6>
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Pays membres <span className="text-[--riafco-blue]">actifs</span>
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              Découvrez les pays qui s'engagent avec RIAFCO pour un développement durable en Afrique.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-slate-600">Chargement des pays membres...</p>
          ) : (
            <div className="grid relative grid-cols-1 mt-8">
              <div className="tiny-two-item">
                <TinySlider settings={settings}>
                  {countries.map((country, index) => (
                    <div className="tiny-slide" key={index}>
                      <div className="lg:flex p-6 lg:p-0 relative rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden m-2 bg-white">
                        <div className="flex justify-center items-center p-4">
                          {country.flag && typeof country.flag === 'string' && country.flag.startsWith('/') ? (
                            <img
                              src={country.flag}
                              alt={`Drapeau ${country.name}`}
                              className="w-24 h-16 object-contain"
                            />
                          ) : (
                            <span className="text-5xl">{country.flag}</span>
                          )}
                        </div>
                        <div className="pt-4 lg:p-6 text-center lg:text-start space-y-2">
                          <h4 className="text-xl font-semibold text-[--riafco-blue]">{country.name}</h4>
                          {country.description && (
                            <div
                              className="text-slate-600 text-sm"
                              dangerouslySetInnerHTML={{ __html: country.description }}
                            />
                          )}
                          <div className="mt-3">
                            <span className="text-[--riafco-orange] text-xs font-medium">
                              {country._count.criteria} critère{s} d'adhésion
                            </span>
                          </div>
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

      <Footer />
      <CookieModal />
    </div>
  );
}
