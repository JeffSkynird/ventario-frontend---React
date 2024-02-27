import { Route, Routes } from 'react-router-dom'
import Login from '../../features/Login'

import Users from '../../features/Users'
import UserForm from '../../features/Users/components/Form'

import Pacients from '../../features/Pacients'
import PacientForm from '../../features/Pacients/components/Form'
import Orders from '../../features/Orders'
import OrdersForm from '../../features/Orders/components/Form'
 import Exam from '../../features/Exams'
/*import ExamForm from '../../features/Exams/components/Form' */
import Result from '../../features/Results'
import ResultForm from '../../features/Results/components/Form'
import RequireAuth from '../auth/RequireAuth'
import PacientResults from '../../features/Pacients/components/Results'
import Buscador from '../../features/vendedor/Buscador'
import ProcesosActivos from '../../features/vendedor/ProcesosActivos'
import ProcesosCerrados from '../../features/vendedor/ProcesosCerrados'
import PostVisita from '../../features/vendedor/PostVisita'
import VerPostVisita from '../../features/vendedor/VerPostVisita'

import ProcesosActivosVendedor from '../../features/comprador/ProcesosActivos'
import ProcesosCerradosVendedor from '../../features/comprador/ProcesosCerrados'


import VerProcesoAbierto from '../../features/comprador/VerProcesoAbierto'
import VerProcesoCerrado from '../../features/comprador/VerProcesoCerrado'
import Carga from '../../features/comprador/Carga'
import Productos from '../../features/comprador/Productos'
import VerProductos from '../../features/comprador/VerProductos'


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<RequireAuth><Buscador/></RequireAuth>} />
            <Route path="/usuarios" element={<RequireAuth><Users/></RequireAuth>} />
            <Route path="/usuarios/crear" element={<RequireAuth><UserForm/></RequireAuth>} />
            <Route path="/usuarios/editar" element={<RequireAuth><UserForm/></RequireAuth>} />
          
            <Route path="/pacientes" element={<RequireAuth><ProcesosActivos/></RequireAuth>} /> 
            <Route path="/pacientes/crear" element={<RequireAuth><PacientForm/></RequireAuth>} />
            <Route path="/pacientes/editar" element={<RequireAuth><PacientForm/></RequireAuth>} />

            <Route path="/membresias" element={<RequireAuth><Orders/></RequireAuth>} />
            <Route path="/ordenes/crear" element={<RequireAuth><OrdersForm/></RequireAuth>} />
            <Route path="/ordenes/editar" element={<RequireAuth><OrdersForm/></RequireAuth>} />

            <Route path="/resultados" element={<RequireAuth><ProcesosCerrados/></RequireAuth>} />
            <Route path="/resultados/crear" element={<RequireAuth><ResultForm/></RequireAuth>} />
            <Route path="/resultados/editar" element={<RequireAuth><ResultForm/></RequireAuth>} />
            <Route path="/pacientes/resultados" element={<RequireAuth><PacientResults/></RequireAuth>} />
            <Route path="/buscador" element={<RequireAuth><Buscador /></RequireAuth>} />
            <Route path="/post_visita" element={<RequireAuth><PostVisita /></RequireAuth>} />
            <Route path="/post_visita/:id" element={<RequireAuth><VerPostVisita /></RequireAuth>} />

           <Route path="/buscador/:id" element={<RequireAuth><Exam /></RequireAuth>} /> 

           <Route path="/cerrados" element={<RequireAuth><ProcesosCerradosVendedor/></RequireAuth>} />
           <Route path="/activos" element={<RequireAuth><ProcesosActivosVendedor/></RequireAuth>} />
           <Route path="/carga" element={<RequireAuth><Carga/></RequireAuth>} />

           <Route path="/activos/:id" element={<RequireAuth><VerProcesoAbierto /></RequireAuth>} /> 
           <Route path="/cerrados/:id" element={<RequireAuth><VerProcesoCerrado /></RequireAuth>} /> 

           <Route path="/productos" element={<RequireAuth><Productos /></RequireAuth>} /> 
           <Route path="/productos/:id" element={<RequireAuth><VerProductos /></RequireAuth>} /> 


            <Route path="login" element={<Login />} />
            <Route render={() => <Redirect to="/buscador" />} />
        </Routes>
    )
}
