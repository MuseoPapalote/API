const adminModel = require('../models/adminModel');
const userModel = require('../models/userModel');

async function getAdminOverview(req,res){
  try{
    const overview = await adminModel.getAdminOverview();
    res.json(overview);
  }catch(error){
    console.error('Error getting admin overview:', error);
    res.status(500).json({ message: 'Error getting admin overview' });
  }
}

async function getVisitStats(req,res){
  try{
    const stats = await adminModel.getVisitStats();
    res.json(stats);
  }catch(error){
    console.error('Error getting visit stats:', error);
    res.status(500).json({ message: 'Error getting visit stats' });
  }
}

async function getUserEmails(req,res){
  try{
    const emails = await userModel.getUserEmails();
    res.json(emails);
  }catch(error){
    console.error('Error getting user emails:', error);
    res.status(500).json({ message: 'Error getting user emails' });
  }
}


// Crear Zona
async function createZona(req, res) {
    const { nombre_zona, descripcion } = req.body;
    try {
        const nuevaZona = await adminModel.createZona(nombre_zona, descripcion);
        res.status(201).json({ message: 'Zona creada exitosamente', zona: nuevaZona });
    } catch (error) {
        console.error('Error al crear zona:', error);
        res.status(500).json({ message: 'Error al crear zona' });
    }
}

// Editar Zona
async function editZona(req, res) {
    const { id_zona } = req.params;
    const { nombre_zona, descripcion } = req.body;
    try {
        const zonaEditada = await adminModel.editZona(id_zona, nombre_zona, descripcion);
        res.status(200).json({ message: 'Zona editada exitosamente', zona: zonaEditada });
    } catch (error) {
        console.error('Error al editar zona:', error);
        res.status(500).json({ message: 'Error al editar zona' });
    }
}

// Borrar Zona
async function deleteZona(req, res) {
    const { id_zona } = req.params;
    try {
        await adminModel.deleteZona(id_zona);
        res.status(200).json({ message: 'Zona eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar zona:', error);
        res.status(500).json({ message: 'Error al eliminar zona' });
    }
}

// Crear Exposición
async function createExposicion(req, res) {
    const { id_zona, nombre_exposicion, descripcion, codigo_qr } = req.body;
    try {
        const nuevaExposicion = await adminModel.createExposicion(id_zona, nombre_exposicion, descripcion, codigo_qr);
        res.status(201).json({ message: 'Exposición creada exitosamente', exposicion: nuevaExposicion });
    } catch (error) {
        console.error('Error al crear exposición:', error);
        res.status(500).json({ message: 'Error al crear exposición' });
    }
}

// Editar Exposición
async function editExposicion(req, res) {
    const { id_exposicion } = req.params;
    const { nombre_exposicion, descripcion, codigo_qr, activo } = req.body;
    try {
        const exposicionEditada = await adminModel.editExposicion(id_exposicion, nombre_exposicion, descripcion, codigo_qr, activo);
        res.status(200).json({ message: 'Exposición editada exitosamente', exposicion: exposicionEditada });
    } catch (error) {
        console.error('Error al editar exposición:', error);
        res.status(500).json({ message: 'Error al editar exposición' });
    }
}

// Borrar Exposición
async function deleteExposicion(req, res) {
    const { id_exposicion } = req.params;
    try {
        await adminModel.deleteExposicion(id_exposicion);
        res.status(200).json({ message: 'Exposición eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar exposición:', error);
        res.status(500).json({ message: 'Error al eliminar exposición' });
    }
}

// Crear Pregunta
async function createPregunta(req, res) {
    const { nombre_exposicion,texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta,id_zona } = req.body;
    try {
        const nuevaPregunta = await adminModel.createPregunta(nombre_exposicion,texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta,id_zona);
        res.status(201).json({ message: 'Pregunta creada exitosamente', pregunta: nuevaPregunta });
    } catch (error) {
        console.error('Error al crear pregunta:', error);
        res.status(500).json({ message: 'Error al crear pregunta' });
    }
}

// Editar Pregunta
async function editPregunta(req, res) {
    const { id_pregunta } = req.params;
    const { texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta,id_zona } = req.body;
    try {
        const preguntaEditada = await adminModel.editPregunta(id_pregunta, texto_pregunta, opcion_1,opcion_2,opcion_3,respuesta_correcta,id_zona);
        res.status(200).json({ message: 'Pregunta editada exitosamente', pregunta: preguntaEditada });
    } catch (error) {
        console.error('Error al editar pregunta:', error);
        res.status(500).json({ message: 'Error al editar pregunta' });
    }
}

// Borrar Pregunta
async function deletePregunta(req, res) {
    const { id_pregunta } = req.params;
    try {
        await adminModel.deletePregunta(id_pregunta);
        res.status(200).json({ message: 'Pregunta eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar pregunta:', error);
        res.status(500).json({ message: 'Error al eliminar pregunta' });
    }
}

// Obtener todas las zonas
async function getAllZonas(req, res) {
  try {
    const zonas = await adminModel.getAllZonas();
    res.status(200).json(zonas);
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    res.status(500).json({ message: 'Error al obtener zonas' });
  }
}

// Obtener una zona por ID
async function getZonaById(req, res) {
  const { id_zona } = req.params;
  try {
    const zona = await adminModel.getZonaById(id_zona);
    if (!zona) {
      return res.status(404).json({ message: 'Zona no encontrada' });
    }
    res.status(200).json(zona);
  } catch (error) {
    console.error('Error al obtener zona:', error);
    res.status(500).json({ message: 'Error al obtener zona' });
  }
}

// Obtener todas las exposiciones
async function getAllExposiciones(req, res) {
  try {
    const exposiciones = await adminModel.getAllExposiciones();
    res.status(200).json(exposiciones);
  } catch (error) {
    console.error('Error al obtener exposiciones:', error);
    res.status(500).json({ message: 'Error al obtener exposiciones' });
  }
}

// Obtener una exposición por ID
async function getExposicionById(req, res) {
  const { id_exposicion } = req.params;
  try {
    const exposicion = await adminModel.getExposicionById(id_exposicion);
    if (!exposicion) {
      return res.status(404).json({ message: 'Exposición no encontrada' });
    }
    res.status(200).json(exposicion);
  } catch (error) {
    console.error('Error al obtener exposición:', error);
    res.status(500).json({ message: 'Error al obtener exposición' });
  }
}

// Obtener todas las preguntas
async function getAllPreguntas(req, res) {
  try {
    const preguntas = await adminModel.getAllPreguntas();
    res.status(200).json(preguntas);
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    res.status(500).json({ message: 'Error al obtener preguntas' });
  }
}

// Obtener una pregunta por ID
async function getPreguntaById(req, res) {
  const { id_pregunta } = req.params;
  try {
    const pregunta = await adminModel.getPreguntaById(id_pregunta);
    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.status(200).json(pregunta);
  } catch (error) {
    console.error('Error al obtener pregunta:', error);
    res.status(500).json({ message: 'Error al obtener pregunta' });
  }
}

// Obtener todas las zonas
async function getAllZonas(req, res) {
    try {
      const zonas = await adminModel.getAllZonas();
      res.status(200).json(zonas);
    } catch (error) {
      console.error('Error al obtener zonas:', error);
      res.status(500).json({ message: 'Error al obtener zonas' });
    }
  }
  
  // Obtener una zona por ID
  async function getZonaById(req, res) {
    const { id_zona } = req.params;
    try {
      const zona = await adminModel.getZonaById(id_zona);
      if (!zona) {
        return res.status(404).json({ message: 'Zona no encontrada' });
      }
      res.status(200).json(zona);
    } catch (error) {
      console.error('Error al obtener zona:', error);
      res.status(500).json({ message: 'Error al obtener zona' });
    }
  }
  
  // Obtener todas las exposiciones
  async function getAllExposiciones(req, res) {
    try {
      const exposiciones = await adminModel.getAllExposiciones();
      res.status(200).json(exposiciones);
    } catch (error) {
      console.error('Error al obtener exposiciones:', error);
      res.status(500).json({ message: 'Error al obtener exposiciones' });
    }
  }
  
  // Obtener una exposición por ID
  async function getExposicionById(req, res) {
    const { id_exposicion } = req.params;
    try {
      const exposicion = await adminModel.getExposicionById(id_exposicion);
      if (!exposicion) {
        return res.status(404).json({ message: 'Exposición no encontrada' });
      }
      res.status(200).json(exposicion);
    } catch (error) {
      console.error('Error al obtener exposición:', error);
      res.status(500).json({ message: 'Error al obtener exposición' });
    }
  }
  
  // Obtener todas las preguntas
  async function getAllPreguntas(req, res) {
    try {
      const preguntas = await adminModel.getAllPreguntas();
      res.status(200).json(preguntas);
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
      res.status(500).json({ message: 'Error al obtener preguntas' });
    }
  }
  
  // Obtener una pregunta por ID
  async function getPreguntaById(req, res) {
    const { id_pregunta } = req.params;
    try {
      const pregunta = await adminModel.getPreguntaById(id_pregunta);
      if (!pregunta) {
        return res.status(404).json({ message: 'Pregunta no encontrada' });
      }
      res.status(200).json(pregunta);
    } catch (error) {
      console.error('Error al obtener pregunta:', error);
      res.status(500).json({ message: 'Error al obtener pregunta' });
    }
  }

module.exports = {
    getAdminOverview,
    getVisitStats,
    getUserEmails,
    createZona,
    editZona,
    deleteZona,
    createExposicion,
    editExposicion,
    deleteExposicion,
    createPregunta,
    editPregunta,
    deletePregunta,
    getAllZonas,
    getZonaById,
    getAllExposiciones,
    getExposicionById,
    getAllPreguntas,
    getPreguntaById
};
