import './App.css'
import MainWrapper from './components/layout/MainWrapper'
import Panel from './components/layout/Panel'

function App() {

  return (
    <MainWrapper theme='dark'>
      <Panel panelType='nav'>
      </Panel>
      
      <Panel panelType='side'>
      </Panel>
      
      <Panel panelType='main'>
      </Panel>

      <Panel panelType='side'>
      </Panel>

    </MainWrapper>
  )
}

export default App
