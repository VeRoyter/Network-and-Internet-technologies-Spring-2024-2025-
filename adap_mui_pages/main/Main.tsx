import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import CityGallery from "./components/CityGalery";
import Content from "./components/Content";
import CityContent from "./components/CityContent";
import Footer from "../components/Footer"
function Main() {
 return (
 <div>
    <Navbar active="1"/>
    {/* <Gallery/> */}
    <CityGallery/>
    {/* <Content/> */}
    <CityContent />
    <Footer/>

 </div>
 );
}
export default Main;