import { Button, Drawer } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const App = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    };
    const shutdown = () => {
        let message = 'shutdown'
        axios.post(`http://172.20.10.2:8080/isShutDownPc`, message);
    }
    const canNotShutDown = () => {
        axios.post(`http://172.20.10.2:8080/isShutDownPc`, "suibian");
    }

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                控制操作
            </Button>
            <Drawer title="控制操作" placement="right" onClose={onClose} open={open} width="80%">
                <Button type="primary"  onClick={shutdown}>关机</Button>
                <br></br><br></br>
                <Button type="primary"  onClick={canNotShutDown}>取消关机</Button>
            </Drawer>
        </>
    );
};
export default App;