import { Button, Drawer } from 'antd';
import { useState } from 'react';
import React from 'react';
import '../css/App.css'
import 'xterm/css/xterm.css'; // 引入样式文件


class TermuxShow extends React.Component {
    render() {
        let url="http://172.20.10.2:8080/?#"
        return (
            <div className="App" style={{ height: "100%", width: "100%" }}>
                <iframe src={url} style={{ height: "100%", width: "100%" }} />

            </div>
        );
    }

};


const OpenTermux = () => {
    
    
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                打开远程终端
            </Button>
            <Drawer title="Termux" placement="right" onClose={onClose} open={open} width="90%">
                <TermuxShow />
            </Drawer>
        </div>
    );
};
export default OpenTermux;