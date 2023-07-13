/* Paso 4: importamos las rutas y el match a la ruta */
import Navegar from "./Componentes/Navegar";
import Home from "./Componentes/Home";
import Productos from "./Componentes/Productos";
import Formulario from "./Componentes/Formulario";
import EdicionFormulario from "./Componentes/EdicionFormulario";
import Faq from "./Componentes/faq";
import Update from "./Componentes/Update";
import Footer from "./Componentes/Footer";
import {  Routes,  Route} from 'react-router-dom';


function App() {
  return (
    <>
      <Navegar />
      {/* Paso 5: configuramos las rutas */}
      <Routes>
        <Route index element={ <Home /> }></Route>
        <Route path="/productos" element={ <Productos /> }></Route> 
        <Route path="/formulario" element={ <Formulario /> }></Route> 
        <Route path="/EdicionFormulario" element={ <EdicionFormulario /> }></Route> 
        <Route path="/faq" element={ <Faq /> }></Route> 
        <Route path="/Update" element={ <Update /> }></Route> 
             </Routes>
      <Footer />
    </> 
  );
}

export default App;
