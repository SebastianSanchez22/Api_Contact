import { useState } from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSignature, faCalendarAlt, faFolderOpen, faReplyAll } from '@fortawesome/free-solid-svg-icons'

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
      
      

      {msg && <Alerta alerta={alerta}/>}

      <form
        className="bg-white py-4 px-5 mb-2 lg:mb-0 shadow-md rounded-md"
        onSubmit={enviarDatos}
      >

        <p className="text-lg text-center mb-5 font-bold">
          Nos gustaría brindarte más 
          <span className="text-indigo-600 font-bold uppercase"> Información</span> 
        </p>

        <div className="mb-1">
          <FontAwesomeIcon icon={faSignature}/>
          <label htmlFor="nombreAsesorado" className="text-gray-700 font-bold ml-2">Nombre</label>
          <input 
            type="text"
            placeholder="Nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange} 
            name="nombreAsesorado"
          />
        </div>

        <div className="mb-1">
          <FontAwesomeIcon icon={faPhone}/>
          <label htmlFor="celular" className="text-gray-700 font-bold ml-2">Celular</label>
          <input 
            type="number"
            placeholder="Celular"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange} 
            name="celular"
          />
        </div>

        <div className="mb-1">
        <FontAwesomeIcon icon={faFolderOpen}/>
          <label htmlFor="categoria" className="text-gray-700 font-bold ml-2">Categoría</label>
          <input 
            type="text" 
            placeholder="Categoría"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange} 
            name="categoria"
          />
        </div>

        <div className="mb-1">
        <FontAwesomeIcon icon={faReplyAll}/>
          <label htmlFor="plataforma" className="text-gray-700 font-bold ml-2">Plataforma</label>
          <select name="plataforma" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange}>
            <option value="" >Escoja una plataforma</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Llamada">Llamada</option>
          </select>
        </div>

        <div className="mb-5">
          <FontAwesomeIcon icon={faCalendarAlt}/>
          <label htmlFor="fechaAsesoria" className="text-gray-700 font-bold ml-2">Fecha de la asesoría</label>
          <input 
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange}
            name="fechaAsesoria"
          />
        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-full"
          value="Pedir Asesoría"
        
        />
      </form>
    </div>
        
    </>
  )
}

export default Formulario