import { Button, Drawer, Table, Space, Popconfirm,Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useRef,useState } from 'react';
import axios from 'axios';

const App = () => {
    const [open, setOpen] = useState(false);
    const [GetPidAndNameInfo, setGetPidAndNameInfo] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: 'PID',
            dataIndex: 'PID',
            key: 'PID',
        },
        {
            title: '进程名',
            dataIndex: 'processName',
            key: 'processName',
            ...getColumnSearchProps('processName'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>
                GetPidAndNameInfo.length >= 1 ? (
                    <Popconfirm title="Sure to kill this process?" onConfirm={() => handleDelete(record.PID)}>
                        <a>杀死进程</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleDelete = (key) => {
        console.log(key)
        axios.post(`http://172.20.10.2:8080/killPid`, key);
        //console.log(GetPidAndNameInfo.filter((item) => item.key !== key))
        
        setGetPidAndNameInfo(GetPidAndNameInfo.filter((item) => item.key !== key));
    };

    const showDrawer = () => {
        setOpen(true);
        var urlApi = 'http://172.20.10.2:8080/getPidAndName';
        axios.get(urlApi)
            .then(function (response) {
                //console.log(response.data);
                setGetPidAndNameInfo(response.data)
            }).catch(err => console.log(err));

    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                获取进程信息
            </Button>
            <Drawer title="进程信息" placement="right" onClose={onClose} open={open} width="80%">
                <Table columns={columns} dataSource={GetPidAndNameInfo} />
            </Drawer>
        </>
    );
};
export default App;