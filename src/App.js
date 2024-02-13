import './App.css'
import Header from './Components/Header'
import DrawingBoard from './Pages/DrawingBoard'
import { Provider, observer } from "mobx-react"
import Store from './Store'

function App() {
  return (
    <div>
      <Provider {...Store}>
        <Header label="Simple Drawing Board" />
        <DrawingBoard />
      </Provider>
    </div>
  );
}

export default observer(App);
