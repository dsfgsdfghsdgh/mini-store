import Container from "./components/app-ui/Container"
import Footer from "./components/app-ui/Footer"
import Header from "./components/app-ui/Header"
import { Button } from "./components/ui/button"

function App() {
  return (
    <main>
      <Header/>
      <Container>
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button>Click Me</Button>
      </Container>
      <Footer />
    </main>
  )
}

export default App
