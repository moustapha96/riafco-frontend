import { Route, Routes } from 'react-router';
import Index from './pages/index/index'
import UserSocial from './pages/accounts/user-social'
import ShopAccount from './pages/ecommerce/shop-account'
import ShopCart from './pages/ecommerce/shop-cart'
import ShopCheckOut from './pages/ecommerce/shop-checkout'
import ShopGrid from './pages/ecommerce/shop-grid'
import ShopGridTwo from './pages/ecommerce/shop-grid-two'
import ShopItemDetail from './pages/ecommerce/shop-item-detail'
import UserBilling from './pages/accounts/user-billing'
import UserInvoice from './pages/accounts/user-invoice';
import UserNotification from './pages/accounts/user-notification';
import UserPayment from './pages/accounts/user-payment';
import UserProfile from './pages/accounts/user-profile';
import UserSetting from './pages/accounts/user-setting';
import ShopAbout from './pages/ecommerce/shop-about';
import PortfolioDetailTwo from './pages/portfolio/portfolio-detail-two';
import PortfolioDetailThree from './pages/portfolio/portfolio-detail-three';
import PortfolioDetailOne from './pages/portfolio/portfolio-detail-one';
import PortfolioDetailFour from './pages/portfolio/portfolio-detail-four';
import PortfolioCreativeTwo from './pages/portfolio/portfolio-creative-two';
import PortfolioCreativeThree from './pages/portfolio/portfolio-creative-three';
import PortfolioCreativeSix from './pages/portfolio/portfolio-creative-six';
import PortfolioCreativeFour from './pages/portfolio/portfolio-creative-four';
import PortfolioCreativeFive from './pages/portfolio/portfolio-creative-five';
import PortfolioClassicTwo from './pages/portfolio/portfolio-classic-two';
import PortfolioClassicThree from './pages/portfolio/portfolio-classic-three';
import PhotographyPortfolio from './pages/photography/photography-portfolio'
import PhotographyAbout from './pages/photography/photography-about';
import PageThankyou from './pages/special/page-thankyou';
import PageTestimonial from './pages/company/page-testimonial';
import PageTerms from './pages/utility/page-terms';
import PageTeam from './pages/company/page-team';
import PortfolioClassicSix from './pages/portfolio/portfolio-classic-six';
import PortfolioClassicFour from './pages/portfolio/portfolio-classic-four';
import PortfolioClassicFive from './pages/portfolio/Portfolio-classic-five';
import PageServices from './pages/company/page-services';
import PagePrivacy from './pages/utility/page-privacy';
import PagePricing from './pages/company/page-pricing';
import PageMaintenance from './pages/special/page-maintenance';
import PageJobPost from './pages/jobs/page-job-post';
import PageJobGrid from './pages/jobs/page-job-grid';
import PageJobDetail from './pages/jobs/page-job-detail';
import PageJobCompanyDetail from './pages/jobs/page-job-company-detail';
import PageJobCompanies from './pages/jobs/page-job-companies';
import PageJobCareer from './pages/jobs/page-job-career';
import PageJobCandidates from './pages/jobs/page-job-candidates';
import PageJobCandidateDetail from './pages/jobs/page-job-candidate-detail';
import PageJobApply from './pages/jobs/page-job-apply';
import PageError from './pages/special/page-error';
import PageComingsoon from './pages/special/page-comingsoon';
import PageAboutus from './pages/company/page-aboutus';
import IndexYoga from './pages/index/index-yoga';
import IndexVideo from './pages/index/index-video';
import IndexStudio from './pages/index/index-studio';
import IndexStartup from './pages/index/index-startup';
import IndexSpa from './pages/index/index-spa';
import IndexSoftware from './pages/index/index-software';
import IndexSmartwatch from './pages/index/index-smartwatch';
import IndexShop from './pages/index/index-shop';
import IndexService from './pages/index/index-service';
import IndexSeo from './pages/index/index-seo';
import IndexSaas from './pages/index/index-saas';
import VideoPortfolio from './pages/video-portfolio';
import IndexRestaurent from './pages/index/index-restaurent';
import IndexRealEstate from './pages/index/index-real-estate';
import IndexPhotography from './pages/index/index-photography';
import IndexPhoneNumber from './pages/index/index-phone-number';
import IndexPersonal from './pages/index/index-personal';
import IndexPayment from './pages/index/index-payment';
import IndexNft from './pages/index/index-nft';
import IndexModernSaas from './pages/index/index-modern-saas';
import IndexLaw from './pages/index/index-law';
import IndexLandingTwo from './pages/index/index-landing-two';
import IndexLandingThree from './pages/index/index-landing-three';
import IndexLandingOne from './pages/index/index-landing-one';
import IndexLandingFour from './pages/index/index-landing-four';
import IndexLandingFive from './pages/index/index-landing-five';
import IndexItSolutionTwo from './pages/index/index-it-solution-two';
import IndexInsurance from './pages/index/index-insurance';
import IndexHotel from './pages/index/index-hotel';
import IndexHosting from './pages/index/index-hosting';
import IndexHospital from './pages/index/index-hospital';
import IndexGym from './pages/index/index-gym';
import IndexFurniture from './pages/index/index-furniture';
import IndexForums from './pages/index/index-forums';
import IndexFoodBlog from './pages/index/index-food-blog';
import IndexEvent from './pages/index/index-event';
import IndexDigitalAgency from './pages/index/index-digital-agency';
import IndexCharity from './pages/index/index-charity';
import IndexCoworking from './pages/index/index-coworking';
import IndexCourse from './pages/index/index-course';
import IndexCorporate from './pages/index/index-corporate';
import IndexCorporateTwo from './pages/index/index-corporateTwo';
import IndexConsulting from './pages/index/index-consulting';
import IndexConstruction from './pages/index/index-construction';
import IndexClassicSaas from './pages/index/index-classic-saas';
import IndexClassicApp from './pages/index/index-classic-app';
import IndexCafe from './pages/index/index-cafe';
import IndexBusiness from './pages/index/index-business';
import IndexBlog from './pages/index/index-blog';
import IndexApps from './pages/index/index-apps';
import Helpcenter from './pages/helpcenter/helpcenter';
import HelpcenterSupport from './pages/helpcenter/helpcenter-support';
import HelpcenterFaqs from './pages/helpcenter/helpcenter-faqs';
import ForumsTopic from './pages/forums/forums-topic';
import ForumsComments from './pages/forums/forums-comments';
import FoodRecipe from './pages/food-recipe';
import EmailPasswordReset from './pages/email-template/email-password-reset';
import EmailInvoice from './pages/email-template/email-invoice';
import EmailConfirmation from './pages/email-template/email-confirmation';
import EmailAlert from './pages/email-template/email-alert';
import Documentation from './pages/documentation';
import CourseDetail from './pages/courses/course-detail';
import ContactTwo from './pages/contact/contact-two';
import ContactOne from './pages/contact/contact-one';
import ContactDetail from './pages/contact/contact-detail';
import Changelog from './pages/changelog';
import Blog from './pages/blog/blog';
import BlogYoutubePost from './pages/blog/blog-youtube-post';
import BlogVimeoPost from './pages/blog/blog-vimeo-post';
import BlogStandardPost from './pages/blog/blog-standard-post';
import BlogSliderPost from './pages/blog/blog-slider-post';
import BlogSidebar from './pages/blog/blog-sidebar';
import BlogLeftSidebarPost from './pages/blog/blog-left-sidebar-post';
import BlogGalleryPost from './pages/blog/blog-gallery-post';
import BlogDetail from './pages/blog/blog-detail';
import BlogBlockquotePost from './pages/blog/blog-blockquote-post';
import BlogAudioPost from './pages/blog/blog-audio-post';
import AuthSignup from './pages/auth/auth-signup';
import AuthSignupSuccess from './pages/auth/auth-signup-success';
import AuthRePassword from './pages/auth/auth-re-password';
import AuthLogin from './pages/auth/auth-login';
import AuthLockScreen from './pages/auth/auth-lock-screen';
import PropertyListing from './pages/real-estate/property-listing';
import PropertyDetail from './pages/real-estate/property-detail';
import PortfolioModernTwo from './pages/portfolio/portfolio-modern-two';
import PortfolioModernThree from './pages/portfolio/portfolio-modern-three';
import PortfolioModernSix from './pages/portfolio/portfolio-modern-six';
import PortfolioModernFour from './pages/portfolio/portfolio-modern-four';
import PortfolioModernFive from './pages/portfolio/portfolio-modern-five';
import PortfolioMasonryTwo from './pages/portfolio/portfolio-masonry-two';
import PortfolioMasonryThree from './pages/portfolio/portfolio-masonry-three';
import PortfolioMasonrySix from './pages/portfolio/portfolio-masonry-six';
import PortfolioMasonryFour from './pages/portfolio/portfolio-masonry-four';
import PortfolioMasonryFive from './pages/portfolio/portfolio-masonry-five';
import IndexCrypto from './pages/index/index-crypto';
import IndexJob from './pages/index/index-job';
import IndexPortfolio from './pages/index/index-portfolio';
import HelpcenterGuides from './pages/helpcenter/helpcenter-guides';
import CourseListing from './pages/courses/course-listing';
import NftAuction from './pages/nft/nft-auction';
import NftCollection from './pages/nft/nft-collection';
import NftCreateItem from './pages/nft/nft-createItem';
import NftCreatorProfile from './pages/nft/nft-creatorProfile';
import NftCreatorProfileEdit from './pages/nft/nft-creatorProfileEdit';
import IndexMarketing from './pages/index/index-marketing';
import NftCreators from './pages/nft/nft-creators';
import NftDetail from './pages/nft/nft-detail';
import NftExplore from './pages/nft/nft-explore';
import NftWallet from './pages/nft/nft-wallet';
import Switch from './component/Switch';
import IndexAi from './pages/index/index-ai';
import IndexTravel from './pages/index/index-travel';
import IndexPodcast from './pages/index/index-podcast';
import UiComponents from './pages/ui-components';
import IndexChristmas from './pages/index/index-christmas';
import IndexClassicBusiness from './pages/index/index-classic-business';
import LifeCoach from './pages/index/index-life-coach';
import LandingSix from './pages/index/index-landing-six';
import IndexWebProgramming from './pages/index/index-web-programming';
import IndexCleaner from './pages/index/index-cleaner';
import PageServiceDetail from './pages/company/page-service-detail';
import IndexSolar from './pages/index/index-solar';
import IndexItSolution from './pages/index/index-it-solution';


function App() {

    return (
        <>
            <Switch/>
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/user-social" element={<UserSocial />} />
                <Route exact path="/shop-account" element={<ShopAccount/>} />
                <Route exact path="/shop-cart" element={<ShopCart/>} />
                <Route exact path="/shop-checkOut" element={<ShopCheckOut/>} />
                <Route exact path="/shop-grid" element={<ShopGrid />} />
                <Route exact path="/shop-grid-two" element={<ShopGridTwo />} />
                <Route exact path="/shop-item-detail" element={<ShopItemDetail/>} />
                <Route exact path="/shop-item-detail/:id" element={<ShopItemDetail />} />
                <Route exact path="/shop-about" element={<ShopAbout />} />
                <Route exact path="/user-billing" element={<UserBilling/>} />
                <Route exact path="/user-invoice" element={<UserInvoice />} />
                <Route exact path="/user-notification" element={<UserNotification />} />
                <Route exact path="/user-payment" element={<UserPayment />} />
                <Route exact path="/user-profile" element={<UserProfile />} />
                <Route exact path="/user-setting" element={<UserSetting />} />
                <Route exact path="/portfolio-detail-two" element={<PortfolioDetailTwo />} />
                <Route exact path="/portfolio-detail-three" element={<PortfolioDetailThree />} />
                <Route exact path="/portfolio-detail-one" element={<PortfolioDetailOne />} />
                <Route exact path="/portfolio-detail-four" element={<PortfolioDetailFour />} />
                <Route exact path="/portfolio-creative-two" element={<PortfolioCreativeTwo />} />
                <Route exact path="/portfolio-creative-three" element={<PortfolioCreativeThree />} />
                <Route exact path="/portfolio-creative-six" element={<PortfolioCreativeSix />} />
                <Route exact path="/portfolio-creative-four" element={<PortfolioCreativeFour />} />
                <Route exact path="/portfolio-creative-five" element={<PortfolioCreativeFive />} />
                <Route exact path="/portfolio-classic-two" element={<PortfolioClassicTwo />} />
                <Route exact path="/portfolio-classic-three" element={<PortfolioClassicThree />} />
                <Route exact path="/photography-portfolio" element={<PhotographyPortfolio />} />
                <Route exact path="/photography-about" element={<PhotographyAbout />} />
                <Route exact path="/page-thankyou" element={<PageThankyou />} />
                <Route exact path="/page-testimonial" element={<PageTestimonial />} />
                <Route exact path="/page-terms" element={<PageTerms />} />
                <Route exact path="/page-team" element={<PageTeam />} />
                <Route exact path="/portfolio-classic-six" element={<PortfolioClassicSix />} />
                <Route exact path="/portfolio-classic-four" element={<PortfolioClassicFour />} />
                <Route exact path="/portfolio-classic-five" element={<PortfolioClassicFive />} />
                <Route exact path="/page-services" element={<PageServices />} />
                <Route exact path="/page-privacy" element={<PagePrivacy/>} />
                <Route exact path="/page-pricing" element={<PagePricing/>} />
                <Route exact path="/page-maintenance" element={<PageMaintenance />} />
                <Route exact path="/page-job-post" element={<PageJobPost />} />
                <Route exact path="/page-job-grid" element={<PageJobGrid />} />
                <Route exact path="/page-job-detail" element={<PageJobDetail />} />
                <Route exact path="/page-job-detail/:id" element={<PageJobDetail />} />
                <Route exact path="/page-job-company-detail" element={<PageJobCompanyDetail />} />
                <Route exact path="/page-job-company-detail/:id" element={<PageJobCompanyDetail />} />
                <Route exact path="/page-job-companies" element={<PageJobCompanies />} />
                <Route exact path="/page-job-career" element={<PageJobCareer />} />
                <Route exact path="/page-job-candidates" element={<PageJobCandidates />} />
                <Route exact path="/page-job-candidate-detail" element={<PageJobCandidateDetail />} />
                <Route exact path="/page-job-candidate-detail/:id" element={<PageJobCandidateDetail />} />
                <Route exact path="/page-job-apply" element={<PageJobApply />} />
                <Route exact path="/page-error" element={<PageError/>} />
                <Route exact path="/page-comingsoon" element={<PageComingsoon />} />
                <Route exact path="/page-aboutus" element={<PageAboutus />} />
                <Route exact path="/index-yoga" element={<IndexYoga />} />
                <Route exact path="/index-video" element={<IndexVideo />} />
                <Route exact path="/index-studio" element={<IndexStudio />} />
                <Route exact path="/index-startup" element={<IndexStartup />} />
                <Route exact path="/index-spa" element={<IndexSpa />} />
                <Route exact path="/index-software" element={<IndexSoftware />} />
                <Route exact path="/index-web-programming" element={<IndexWebProgramming />} />
                <Route exact path="/index-smartwatch" element={<IndexSmartwatch />} />
                <Route exact path="/index-shop" element={<IndexShop />} />
                <Route exact path="/index-service" element={<IndexService />} />
                <Route exact path="/index-seo" element={<IndexSeo />} />
                <Route exact path="/index-cafe" element={<IndexCafe />} />
                <Route exact path="/index-saas" element={<IndexSaas />} />
                <Route exact path="/index-charity" element={<IndexCharity />} />
                <Route exact path='/video-portfolio' element={<VideoPortfolio />} />
                <Route exact path="/index-restaurent" element={<IndexRestaurent />} />
                <Route exact path="/index-real-estate" element={<IndexRealEstate />} />
                <Route exact path="/index-photography" element={<IndexPhotography />} />
                <Route exact path="/index-phone-number" element={<IndexPhoneNumber />} />
                <Route exact path="/index-personal" element={<IndexPersonal />} />
                <Route exact path="/index-payment" element={<IndexPayment />} />
                <Route exact path="/index-nft" element={<IndexNft />} />
                <Route exact path="/index-modern-saas" element={<IndexModernSaas />} />
                <Route exact path="/index-marketing" element={<IndexMarketing />} />
                <Route exact path="/index-law" element={<IndexLaw />} />
                <Route exact path="/index-landing-two" element={<IndexLandingTwo />} />
                <Route exact path="/index-landing-three" element={<IndexLandingThree />} />
                <Route exact path="/index-landing-one" element={<IndexLandingOne />} />
                <Route exact path="/index-landing-four" element={<IndexLandingFour />} />
                <Route exact path="/index-landing-five" element={<IndexLandingFive />} />
                <Route exact path="/index-it-solution" element={<IndexItSolution />} />
                <Route exact path="/index-it-solution-two" element={<IndexItSolutionTwo />} />
                <Route exact path="/index-insurance" element={<IndexInsurance />} />
                <Route exact path="/index-hotel" element={<IndexHotel />} />
                <Route exact path="/index-hosting" element={<IndexHosting />} />
                <Route exact path="/index-hospital" element={<IndexHospital />} />
                <Route exact path="/index-gym" element={<IndexGym />} />
                <Route exact path="/index-furniture" element={<IndexFurniture />} />
                <Route exact path="/index-forums" element={<IndexForums />} />
                <Route exact path="/index-food-blog" element={<IndexFoodBlog />} />
                <Route exact path="/index-event" element={<IndexEvent />} />
                <Route exact path="/index-digital-agency" element={<IndexDigitalAgency />} />
                <Route exact path="/index-coworking" element={<IndexCoworking />} />
                <Route exact path="/index-course" element={<IndexCourse />} />
                <Route exact path="/index-corporate" element={<IndexCorporate />} />
                <Route exact path="/index-corporate-two" element={<IndexCorporateTwo />} />
                <Route exact path="/index-consulting" element={<IndexConsulting />} />
                <Route exact path="//index-solar" element={<IndexSolar />} />
                <Route exact path="/index-construction" element={<IndexConstruction />} />
                <Route exact path="/index-classic-saas" element={<IndexClassicSaas />} />
                <Route exact path="/index-classic-app" element={<IndexClassicApp />} />
                <Route exact path="/index-cafe" element={<IndexCafe />} />
                <Route exact path="/index-business" element={<IndexBusiness />} />
                <Route exact path="/index-blog" element={<IndexBlog />} />
                <Route exact path="/index-apps" element={<IndexApps/>} />
                <Route exact path="/helpcenter-overview" element={<Helpcenter />} />
                <Route exact path="/helpcenter-support" element={<HelpcenterSupport />} />
                <Route exact path="/helpcenter-faqs" element={<HelpcenterFaqs />} />
                <Route exact path="/helpcenter-guides" element={<HelpcenterGuides />} />
                <Route exact path="/forums-topic" element={<ForumsTopic />} />
                <Route exact path="/forums-comments" element={<ForumsComments />} />
                <Route exact path="/food-recipe" element={<FoodRecipe />} />
                <Route exact path="/food-recipe/:id" element={<FoodRecipe />} />
                <Route exact path="/email-password-reset" element={<EmailPasswordReset />} />
                <Route exact path="/email-invoice" element={<EmailInvoice />} />
                <Route exact path="/email-confirmation" element={<EmailConfirmation />} />
                <Route exact path="/email-alert" element={<EmailAlert />} />
                <Route exact path="/documentation" element={<Documentation />} />
                <Route exact path="/course-detail" element={<CourseDetail />} />
                <Route exact path="/course-detail/:id" element={<CourseDetail />} />
                <Route exact path="/contact-two" element={<ContactTwo />} />
                <Route exact path="/contact-one" element={<ContactOne />} />
                <Route exact path="/contact-detail" element={<ContactDetail />} />
                <Route exact path="/contact-detail/:id" element={<ContactDetail />} />
                <Route exact path="/changelog" element={<Changelog />} />
                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/blog-youtube-post" element={<BlogYoutubePost />} />
                <Route exact path="/blog-vimeo-post" element={<BlogVimeoPost />} />
                <Route exact path="/blog-standard-post" element={<BlogStandardPost />} />
                <Route exact path="/blog-slider-post" element={<BlogSliderPost />} />
                <Route exact path="/blog-sidebar" element={<BlogSidebar />} />
                <Route exact path="/blog-left-sidebar-post" element={<BlogLeftSidebarPost />} />
                <Route exact path="/blog-gallery-post" element={<BlogGalleryPost />} />
                <Route exact path="/blog-detail" element={<BlogDetail />} />
                <Route exact path="/blog-detail/:id" element={<BlogDetail />} />
                <Route exact path="/blog-blockquote-post" element={<BlogBlockquotePost />} />
                <Route exact path="/blog-audio-post" element={<BlogAudioPost />} />
                <Route exact path="/auth-signup" element={<AuthSignup />} />
                <Route exact path="/auth-signup-success" element={<AuthSignupSuccess />} />
                <Route exact path="/auth-re-password" element={<AuthRePassword />} />
                <Route exact path="/auth-login" element={<AuthLogin />} />
                <Route exact path="/auth-lock-screen" element={<AuthLockScreen />} />
                <Route exact path="/property-listing" element={<PropertyListing />} />
                <Route exact path="/property-detail" element={<PropertyDetail />} />
                <Route exact path="/property-detail/:id" element={<PropertyDetail />} />
                <Route exact path="/portfolio-modern-two" element={<PortfolioModernTwo />} />
                <Route exact path="/portfolio-modern-three" element={<PortfolioModernThree />} />
                <Route exact path="/portfolio-modern-six" element={<PortfolioModernSix />} />
                <Route exact path="/portfolio-modern-four" element={<PortfolioModernFour />} />
                <Route exact path="/portfolio-modern-five" element={<PortfolioModernFive />} />
                <Route exact path="/portfolio-masonry-two" element={<PortfolioMasonryTwo />} />
                <Route exact path="/portfolio-masonry-three" element={<PortfolioMasonryThree />} />
                <Route exact path="/portfolio-masonry-six" element={<PortfolioMasonrySix />} />
                <Route exact path="/portfolio-masonry-four" element={<PortfolioMasonryFour />} />
                <Route exact path="/portfolio-masonry-five" element={<PortfolioMasonryFive />} />
                <Route exact path="/index-crypto" element={<IndexCrypto />} />
                <Route exact path="/index-job" element={<IndexJob />} />
                <Route exact path="/index-portfolio" element={<IndexPortfolio />} />
                <Route exact path="/course-listing" element={<CourseListing />} />
                <Route exact path="/nft-auction" element={<NftAuction />} />
                <Route exact path="/nft-collection" element={<NftCollection />} />
                <Route exact path="/nft-create-item" element={<NftCreateItem />} />
                <Route exact path="/nft-create-item" element={<NftCreateItem />} />
                <Route exact path="/nft-creator-profile/:id" element={<NftCreatorProfile />} />
                <Route exact path="/nft-creator-profile" element={<NftCreatorProfile />} />
                <Route exact path="/nft-creator-profile-edit" element={<NftCreatorProfileEdit />} />
                <Route exact path="/nft-creators" element={<NftCreators />} />
                <Route exact path="/nft-detail" element={<NftDetail />} />
                <Route exact path="/nft-detail/:id" element={<NftDetail />} />
                <Route exact path="/nft-explore" element={<NftExplore />} />
                <Route exact path="/nft-wallet" element={<NftWallet />} />
                <Route exact path="/index-ai" element={<IndexAi/>} />
                <Route exact path="/index-travel" element={<IndexTravel/>} />
                <Route exact path="/index-podcast" element={<IndexPodcast/>} />
                <Route exact path="/ui-components" element={<UiComponents/>} />
                <Route exact path="/index-christmas" element={<IndexChristmas/>} />
                <Route exact path="/index-classic-business" element={<IndexClassicBusiness/>} />
                <Route exact path="/index-life-coach" element={<LifeCoach/>} />
                <Route exact path="/index-landing-six" element={<LandingSix/>} />
                <Route exact path="/index-cleaner" element={<IndexCleaner/>} />
                <Route exact path="/page-service-detail" element={<PageServiceDetail/>} />
            </Routes>
        </>
    )
}

export default App