import React from 'react';
import './css/App.css'
import StatusShowGetSysInfo from './pages/statusShowGetSysInfo.jsx'
import StatusShowGetCpuInfo from './pages/statusShowGetCpuInfo.jsx'
import Controlfunction from './pages/Controlfunction'
import ShowTermux from './pages/termux'
import GetPidAndName from './pages/getPidAndName'



class App extends React.Component {


  render() {

    return (
      <div style={{width:'100%',height:'100%'}}>
        <div className="AppDiv">
          <h1 >个人PC远程监控与操作</h1>
          <StatusShowGetSysInfo  />
          {/* 回车换行 */}
          <br></br><br></br>
          <StatusShowGetCpuInfo  />
          <br></br><br></br>
          <GetPidAndName />
          <br></br><br></br>
          <ShowTermux  />
          <br></br>
          <Controlfunction />



        </div>

      </div>
    );
  }
}

export default App;
