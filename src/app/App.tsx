import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from '@app/providers/theme'
import Header from '@widgets/header'
import List from '@pages/list'
import Form from '@pages/form'
import Item from '@pages/item'
import { Container } from '@chakra-ui/react'
import { Toaster } from '@app/providers/components/ui/toaster'

function App() {

    return (
        <ThemeProvider defaultTheme='light'>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <Header />
                <Routes>
                    <Route path='/' element={<Navigate to="/list" replace />} />
                    <Route path='/form' element={<Form />} />
                    <Route path='/list' element={<List />} />
                    <Route path='/item/:id' element={<Item />} />
                </Routes>
            </Container>
            <Toaster />
        </ThemeProvider>
    )
}

export default App
