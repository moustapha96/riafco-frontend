import { Route, Routes } from 'react-router';

import Switch from './component/Switch';
import Accueil from './pages/accueil';
import RessourcePage from './pages/ressources';

import MembrePage from './pages/membre';
import EvenementPage from './pages/evenement';
import AproposPage from './pages/a-propos';
import ActivitePage from './pages/activites';
import ActiviteDetailPage from './pages/activites/details';
import ActualitesPage from './pages/actualite';
import ActualitesDetails from './pages/actualite/details';
import ContactPage from './pages/contact';
import HistoriquePage from './pages/historique';
import EquipePage from './pages/Equipe';
import ReglementInterieurPage from './pages/reglement-interieur';
import ConditionGeneralConfidentialitePage from './pages/condition-general-confidentialite';
import RapportGouvernance from './pages/raport-gouvernance';
import TermeUtilisationPage from './pages/term-utilisation';


function App() {

    return (
        <>
            <Switch/>
            <Routes>
                {/* <Route exact path="/" element={<Index />} /> */}
                <Route exact path="/" element={<Accueil />} />
                <Route exact path="/ressources" element={<RessourcePage />} />
                <Route exact path="/membres" element={<MembrePage />} />
                <Route exact path="/évènements" element={<EvenementPage />} />
                <Route exact path="/a-propos" element={<AproposPage />} />
                <Route exact path="/activités" element={<ActivitePage />} />
                <Route exact path="/activités/:id/détails" element={<ActiviteDetailPage />} />
                <Route exact path="/actualités" element={<ActualitesPage />} />
                <Route exact path="/actualités/:id/détails" element={<ActualitesDetails />} />
                <Route exact path="/contact" element={<ContactPage />} />
                <Route exact path="/historique" element={<HistoriquePage />} />
                <Route exact path="/notre-équipe" element={<EquipePage />} />
                <Route exact path="/réglement-interieur" element={<ReglementInterieurPage />} />

                <Route exact path="/confidentialité" element={<ConditionGeneralConfidentialitePage />} />
                <Route exact path="/rapport-gouvernance" element={<RapportGouvernance />} />
                <Route exact path="/terme-et-condition" element={<TermeUtilisationPage />} />

                
            </Routes>
        </>
    )
}

export default App