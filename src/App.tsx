import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { History } from './pages/history'
import { AppLayout } from './layout/app'

export function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/history' element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
