import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Home from './pages/Home'
import Tim from './pages/Tim'
import Usluge from './pages/Usluge'
import Novosti from './pages/Novosti'
import NovostiPost from './pages/NovostiPost'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tim" element={<Tim />} />
          <Route path="/usluge" element={<Usluge />} />
          <Route path="/novosti" element={<Novosti />} />
          <Route path="/novosti/:slug" element={<NovostiPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
