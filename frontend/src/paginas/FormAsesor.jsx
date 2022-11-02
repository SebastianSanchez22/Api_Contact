import { useState } from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSignature, faCalendarAlt, faFolderOpen, faReplyAll } from '@fortawesome/free-solid-svg-icons'
import { guardar_asesores } from '../../../Backend/controllers/asesoresController'

const FormAsesor = () => {

  const [datos, setDatos] = useState({
    nombreAsesor: '',
    celular: '',
    telegram_id: '',
  })

  const [mostrarFormularioAsesor, setMostrarFormularioAsesor] = useState(false)

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

    if ([datos.nombreAsesor, datos.celular,datos.telegram_id].includes('')){

      setAlerta({msg: 'Hay campos vacios', error:true})
      return;
    }

    if (datos.celular.length < 10 || datos.celular.length > 10){
      setAlerta({msg: 'El número debe tener 10 dígitos', error: true})
      return;
    }

    setAlerta({});

    // Crear asesoría en BD.

    try {
      const url = "http://localhost:3000"
      await guardar_asesores({datos})
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
   
    
      

      {msg && <Alerta alerta={alerta}/>}

      <form
        className="bg-white py-4 px-5 mb-2 lg:mb-0 shadow-md rounded-md"
        onSubmit={enviarDatos}
      >

        <p className="text-lg text-center mb-5 font-bold">
          Agrega un nuevo  
          <span className="text-indigo-600 font-bold uppercase"> Asesor</span> 
        </p>

        <div className="mb-1">
          <FontAwesomeIcon icon={faSignature}/>
          <label htmlFor="nombreAsesorado" className="text-gray-700 font-bold ml-2">Nombre</label>
          <input 
            type="text"
            placeholder="Nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange} 
            name="nombreAsesor"
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
          <label htmlFor="telegram_id" className="text-gray-700 font-bold ml-2">Telegram_id</label>
          <input 
            type="text" 
            placeholder="Telegram_id"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600"
            onChange={handleInputChange} 
            name="telegram_id"
          />
        </div>

        

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-full"
          value="Agregar Nuevo Asesor"
        
        />
      </form>
    
        
    </>
  )
}

export default FormAsesor