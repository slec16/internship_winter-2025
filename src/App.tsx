import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import List from './list/List'
import Form from './form/Form'
import Item from './item/Item'

function App() {

    return (
        <ThemeProvider defaultTheme='light'>
            <div className='flex flex-col px-2 md:px-40'>
                <Header />
                <Routes>
                    <Route path='/' element={<Navigate to="/list" replace />} />
                    <Route path='/form' element={<Form />} />
                    <Route path='/list' element={<List />} />
                    <Route path='/item/:id' element={<Item />} />
                </Routes>
            </div>
        </ThemeProvider>
    )
}

export default App
