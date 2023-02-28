import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Componentes
import { Login } from './components/Login';
import { Register } from './components/Register';
import { UserProfile} from './components/UserProfile';
import { PedirFavor} from './components/actions/PedirFavor';
import { OtherMandado } from './components/OtherMandados';
import { SeeDetails } from './components/actions/SeeDetails'

function App({ Component }) {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/sigin' element={<Register/>}></Route>
          <Route path='/UserProfile' element={<UserProfile/>}></Route>
          <Route path='/RequestFavor' element={<PedirFavor/>}></Route>
          <Route path='/DoFavor' element={<OtherMandado/>}></Route>
          <Route path='/SeeDetail/:id' element={<SeeDetails/>} ></Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
