import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Formulario from './paginas/Formulario'
import FormAsesor from './paginas/FormAsesor'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthLayout/>}>
          <Route index element={<FormAsesor/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
//<Route index element={<Formulario/>}/>