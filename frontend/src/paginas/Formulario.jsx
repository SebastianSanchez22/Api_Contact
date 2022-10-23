import { useState } from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'

const Formulario = () => {

  const [datos, setDatos] = useState({
    nombreAsesorado: '',
    celular: '',
    categoria: '',
    plataforma: '',
    fechaAsesoria: Date.now()
  })

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [alerta, setAlerta] = useState({})

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  const enviarDatos = async (event) => {
    event.preventDefault();

    if ([datos.nombreAsesorado, datos.celular,datos.categoria, datos.plataforma, datos.fechaAsesoria].includes('')){

      setAlerta({msg: 'Hay campos vacios', error:true})
      return;
    }

    setAlerta({});

    // Crear asesoría en BD.

    try {
      const url = "http://localhost:3000"
      await axios.post(url, {datos})
      setAlerta({
          msg: 'Asesoría pedida correctamente',
          error: false
      })
    } catch (error) {  
      setAlerta({
          msg: error.response.data.msg,
          error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
    <button 
      type='button'
      className='fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300'
      onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
      &#9993;
    </button>
    <div className={`${mostrarFormulario ? 'block' : 'hidden'} flex flex-col justify-center items-center`}>
      
      <p className="text-lg text-center mt-10 mb-5">
          Queremos brindarte más 
          <span className="text-indigo-600 font-bold uppercase"> Información</span> 
      </p>

      {msg && <Alerta alerta={alerta}/>}

      <form
        className="bg-white py-4 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={enviarDatos}
      >
        <div className="mb-5">
          <label htmlFor="nombreAsesorado" className="text-gray-700 uppercase font-bold">Nombre</label>
          <input 
            type="text"
            placeholder="Nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleInputChange} 
            name="nombreAsesorado"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="celular" className="text-gray-700 uppercase font-bold">Celular</label>
          <input 
            type="number"
            placeholder="Celular"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleInputChange} 
            name="celular"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="categoria" className="text-gray-700 uppercase font-bold">Categoría</label>
          <input 
            type="text" 
            placeholder="Categoría"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleInputChange} 
            name="categoria"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="plataforma" className="text-gray-700 uppercase font-bold">Plataforma</label>
          <input 
            type="text"
            placeholder="Plataforma"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleInputChange} 
            name="plataforma"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fechaAsesoria" className="text-gray-700 uppercase font-bold">Fecha Asesoria</label>
          <input 
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleInputChange}
            name="fechaAsesoria"
          />
        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Pedir Asesoría"
        
        />
      </form>
    </div>
        
    </>
  )
}

export default Formulario