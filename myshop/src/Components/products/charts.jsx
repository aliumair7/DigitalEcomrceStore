import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import productService from '../../Service/ProductService';
//import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
function subtotal(items) {
  return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}



 const Chart=()=> {
  const theme = useTheme();
  const[tens,settens]=React.useState([])
  const[tewenty,settewenty]=React.useState([])
  const[thirty,setthirty]=React.useState([])
  const[forty,setforty]=React.useState([])
  const[fifity,setfifty]=React.useState([])
  const[sixety,setsixety]=React.useState([])
  
const data=[
  createData('00:00', 0),
  createData('10', subtotal(tens)),
  createData('20', subtotal(tewenty)),
  createData('30', subtotal(thirty)),
  createData('40', subtotal(forty)),
  createData('50', subtotal(fifity)),
  createData('60', subtotal(sixety)),
  
]

const sixetydays=()=>{
  productService.getsixetydaysdeposit().then(data=>{
  setsixety(data)
  }).catch(err =>console.log(err))
}
const fiftydays=()=>{
  productService.getfiftydaysdeposit().then(data=>{
  setfifty(data)
  }).catch(err =>console.log(err))
}
const fortydays=()=>{
  productService.getfortydaysdeposit().then(data=>{
  setforty(data)
  }).catch(err =>console.log(err))
}
const thirtydays=()=>{
  productService.getthirtydaysdeposit().then(data=>{
  setthirty(data)
  }).catch(err =>console.log(err))
}

  const tewentydays=()=>{
    productService.gettewentydaysdeposit().then(data=>{
    settewenty(data)
    }).catch(err =>console.log(err))
  }
  const getdata=()=>{productService.gettendaysdeposit().then(data=>{
    settens(data)
  }).catch(err=>console.log(err))
}
  React.useEffect(getdata,[])
  React.useEffect(tewentydays,[])
  React.useEffect(thirtydays,[])
  React.useEffect(fortydays,[])
  React.useEffect(fiftydays,[])
  React.useEffect(sixetydays,[])
  return (
    <React.Fragment>
      <h1 style={{color:"blue"}}>Last Few Days</h1>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart;