import { Button, Drawer } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';

const App = () => {

    const [hostname , setHostname] =useState('未赋值')
    const [bitNess , setBitNess] =useState('未赋值')
    const [processCount , setProcessCount] =useState('未赋值')
    const [osVersion , setOsVersion] =useState('未赋值')
    const [propertyVersion , setPropertyVersion] =useState('未赋值')
    const [fileOS ,setFileOS ] =useState('未赋值')
    const [threadCount , setThreadCount] =useState('未赋值')
    const [propertyArch , setPropertyArch] =useState('未赋值')
    const [gateWay , setGateWay] =useState('未赋值')

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
        var urlApi = 'http://172.20.10.2:8080/getSysInfo';
        axios.get(urlApi)
            .then(function (response) {
                //console.log(response.data);
                setHostname(response.data.hostname)
                setBitNess(response.data.bitNess)
                setProcessCount(response.data.processCount)
                setOsVersion(response.data.osVersion)
                setPropertyVersion(response.data.propertyVersion)
                setFileOS(response.data.fileOS)
                setThreadCount(response.data.threadCount)
                setPropertyArch(response.data.propertyArch)
                setGateWay(response.data.gateWay)
            }).catch(err => console.log(err));

    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                获取系统信息
            </Button>
            <Drawer title="系统信息" placement="right" onClose={onClose} open={open} width="80%">
                <Descriptions
                    bordered="true"
                    column={{ xxl: 1, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="主机名">{hostname}</Descriptions.Item>
                    <Descriptions.Item label="系统版本">{osVersion}</Descriptions.Item>
                    <Descriptions.Item label="系统版本">{propertyVersion}</Descriptions.Item>
                    <Descriptions.Item label="系统支持位数">{bitNess}</Descriptions.Item>
                    <Descriptions.Item label="系统位数">{propertyArch}</Descriptions.Item>
                    <Descriptions.Item label="文件系统">{fileOS}</Descriptions.Item>
                    <Descriptions.Item label="进程运行数">{processCount}</Descriptions.Item>
                    <Descriptions.Item label="线程运行数量">{threadCount}</Descriptions.Item>
                    <Descriptions.Item label="网关">{gateWay}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};
export default App;