import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';

interface crudState {
    id:number,
    name:string,
    account: string,
    password: string,
    email: string,
    // remark: '',
}

interface snackBar{
    open:boolean,
    autoHideDuration:number,
    message:string,
    status:string
}

const DataBar = (props) => {
    console.log('DataBar');
    console.log(props);
    const initialState = {
        id:0,
        name:'',
        account: '',
        password: '',
        email: '',
    };

    const snackBarState = {
        open:false,
        autoHideDuration:5000,
        message:'',
        status:'success'
    }

    const [state,setState] = useState<crudState>(initialState);
    const [allData,setAllData] = useState<any[]>([]);
    const [hideAllData,setHideAllData] = useState<boolean>(false);
    const [snackBarMessage,setSnackBarMessage] = useState<snackBar>(snackBarState);

    const handleInputOnChange = (name:string) => (e)=>{
        setState({...state,[name]:e.target.value});
    }

    const handleAllDataChange = (name:string,id:number) =>(e)=>{
        console.log(`handleAllDataChange:${name}, ${id}`);
        console.log(e);
        const data = allData.map(element=>element.id === id ? {...element,[name]:e.target.value} : element)
        console.log(data);
        setAllData(data);
    }

    const handleSnackBar = (message:string) =>{
        console.log(`handleSnackBar:${message}`);
        const status = message.includes('成功') ? 'success' : 'error';
        setSnackBarMessage({open:true,autoHideDuration:5000,message,status});
    }

    const handleClear = () =>{
        setAllData([]);
        setHideAllData(false);
        setState(initialState);
    }

    const handleSearchAllDataClick = async () =>{
        try{
            const response = await Axios.get('http://localhost:8080/firstApi/get');
            console.log(response.data);
            setAllData(response.data);
            setHideAllData(true);
        }catch(e){
            console.log(e);
        }
    }

    const handleButtonOnClick = async (e) =>{
        console.log('handleButtonOnClick');

        try{
            const response = await Axios.post('http://localhost:8080/firstApi/'+'insert',{
                // id:state.id,
                name:state.name,
                account:state.account,
                password:state.password,
                email:state.email
                
            });
            console.log(response);
            handleSnackBar(response.data);

            const response3 = await Axios.get('http://localhost:8080/firstApi/getDataByAccount',{
                params:{
                    account:state.account,
                }
            })
            console.log(response3.data);
            handleSearchAllDataClick();
            setState({...state,id:state.id+1});
        }catch(e){
            console.log(e);
        }
    }

    const handleUpdateClick = (element:crudState) => async(e) =>{
        if(window.confirm('確定修改嗎?')){
            try{
                const response = await Axios.post('http://localhost:8080/firstApi/update',{
                    id:element.id,
                    name:element.name,
                    account:element.account,
                    password:element.password,
                    email:element.email
                    
                })
                console.log(response);
                handleSnackBar(response.data);
                handleSearchAllDataClick();
            }catch(e){
                console.log(e);
            }
        }
    }

    const handleDelete = (element:crudState) => async (e) =>{
        if(window.confirm('確定刪除嗎')){
            try{
                const response = await Axios.delete('http://localhost:8080/firstApi/delete',{
                    params:{
                        id:element.id
                    }
                })
                handleSnackBar(response.data);
                const newData = allData.map(data=>data.id !== element.id);
                setAllData(newData);
                handleSearchAllDataClick();
            }catch(e){
                console.log(e);
            }
        }
        
    }
    return(
        <>
            <div className='grid justify-items-center p-50'>
                <div className='p-1'>
                    <Button
                        color='success'
                        onClick={handleSearchAllDataClick}
                        variant='outlined'
                    >查詢所有資料</Button>
                    <Button color='warning' style={{float:'right'}} onClick={handleClear} variant='outlined'>清除</Button>
                    <Button color='info' style={{float:'right'}} onClick={()=>setHideAllData(!hideAllData)} variant='outlined'>隱藏</Button>
                </div>
                <TextField
                    className='w-2/6'
                    color='secondary'
                    label='姓名'
                    name='name'
                    onChange={handleInputOnChange('name')}
                    value={state.name}
                    variant='outlined'
                />
                <TextField
                    className='w-2/6'
                    color='primary'
                    label='帳號'
                    name='account'
                    onChange={handleInputOnChange('account')}
                    value={state.account}
                    variant='outlined'
                />
                <TextField
                    className='w-2/6'
                    color='success'
                    label='密碼'
                    name='password'
                    type='password'
                    onChange={handleInputOnChange('password')}
                    value={state.password}
                    variant='outlined'
                />
                <TextField
                    className='w-2/6'
                    color='info'
                    label='電子郵件'
                    name='email'
                    onChange={handleInputOnChange('email')}
                    value={state.email}
                    variant='outlined'
                />
                <Button
                    className='w-1/12'
                    color='error'
                    onClick={handleButtonOnClick}
                    variant='outlined'
                >送出</Button>
            </div>
            <div className={`${hideAllData ? 'flex' : 'hidden'} text-center font-bold text-3xl justify-center m-5`}>所有資料</div>

            {allData.map(e=>
                <div className={hideAllData?'detailDiv':'detailDivHide'}>
                    <TextField
                        color='secondary'
                        label='姓名'
                        name='name'
                        variant='outlined'
                        value={e.name}
                        style={{width:'30%'}}
                    />
                    <TextField
                        color='primary'
                        label='帳號'
                        name='account'
                        variant='outlined'
                        value={e.account}
                        disabled={true}
                    />
                    <TextField
                        color='success'
                        label='密碼'
                        name='password'
                        onChange={handleAllDataChange('password',e.id)}
                        variant='outlined'
                        value={e.password}
                    />
                    <TextField
                        color='info'
                        label='電子郵件'
                        name='email'
                        variant='outlined'
                        value={e.email}
                        style={{width:'60%'}}
                    />
                    <Button 
                        color='secondary'
                        onClick={handleUpdateClick(e)}
                        variant='outlined'
                    >修改</Button>
                    <Button 
                        color='error'
                        onClick={handleDelete(e)}
                        variant='outlined'
                    >刪除</Button>

                    <p style={{backgroundColor:'black'}}></p>
                </div>    
            )}

            <Snackbar 
                open={snackBarMessage.open}
                autoHideDuration={snackBarMessage.autoHideDuration}
            >
                <Alert severity={snackBarMessage.status} sx={{ width: '100%' }}>
                    {snackBarMessage.message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default DataBar;

export async function getServerSideProps(){
    
    return{
        props:{method:'getServerSideProps'}
    }
}