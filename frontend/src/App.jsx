import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Formulario from './paginas/Formulario'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthLayout/>}>
          <Route index element={<Formulario/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
