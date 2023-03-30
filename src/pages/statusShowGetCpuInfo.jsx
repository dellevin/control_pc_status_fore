import { Button, Drawer } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';

const App = () => {

    const [CPUXingHao , setCPUXingHao] =useState('未赋值')
    const [ZhuBanXingHao , setZhuBanXingHao] =useState('未赋值')
    const [CPUHeXin , setCPUHeXin] =useState('未赋值')
    const [ZhuBanPinPai , setZhuBanPinPai] =useState('未赋值')
    const [ZhuBanUUID , setZhuBanUUID] =useState('未赋值')
    const [CPUXuLieHao ,setCPUXuLieHao ] =useState('未赋值')
    const [ZhuBanXuLieHao , setZhuBanXuLieHao] =useState('未赋值')
    
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
        var urlApi = 'http://172.20.10.2:8080/getCpuInfo';
        axios.get(urlApi)
            .then(function (response) {
                //console.log(response.data);
                setCPUXingHao(response.data.CPUXingHao)
                setZhuBanXingHao(response.data.ZhuBanXingHao)
                setCPUHeXin(response.data.CPUHeXin)
                setZhuBanPinPai(response.data.ZhuBanPinPai)
                setZhuBanUUID(response.data.ZhuBanUUID)
                setCPUXuLieHao(response.data.CPUXuLieHao)
                setZhuBanXuLieHao(response.data.ZhuBanXuLieHao)
            }).catch(err => console.log(err));

    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                获取CPU信息
            </Button>
            <Drawer title="CPU信息" placement="right" onClose={onClose} open={open} width="80%">
                <Descriptions
                    bordered="true"
                    column={{ xxl: 1, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="CPU型号">{CPUXingHao}</Descriptions.Item>
                    <Descriptions.Item label="主板型号">{ZhuBanXingHao}</Descriptions.Item>
                    <Descriptions.Item label="CPU核心">{CPUHeXin}</Descriptions.Item>
                    <Descriptions.Item label="主板品牌">{ZhuBanPinPai}</Descriptions.Item>
                    <Descriptions.Item label="主板UUID">{ZhuBanUUID}</Descriptions.Item>
                    <Descriptions.Item label="CPU序列号">{CPUXuLieHao}</Descriptions.Item>
                    <Descriptions.Item label="主板序列号">{ZhuBanXuLieHao}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    );
};
export default App;