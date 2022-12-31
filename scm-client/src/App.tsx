import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import AboutContainer from './containers/AboutContainer';
import HomeContainer from './containers/HomeContainer';
import LocationContainer from './containers/LocationContainer';
import TruckContainer from './containers/TruckContainer';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import DepoContainer from './containers/DepoContainer';
import DepartureContainer from './containers/DepartureContainer';
import CusOrderContainer from './containers/CusOrderContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                <Button color="inherit" style={{fontWeight: "bold", marginRight: "30px"}}><Link to={`/`} style={{textDecoration: 'none', color: 'white'}}>Nhat Truong SCM</Link>{" "}</Button>
              </Typography>
              <Button color="inherit"><Link to={`/location`} style={{textDecoration: 'none', color: 'white'}}>Location</Link>{" "}</Button>
              <Button color="inherit"><Link to={`/truck`} style={{textDecoration: 'none', color: 'white'}}>Truck</Link>{" "}</Button>
              <Button color="inherit"><Link to={`/depo`} style={{textDecoration: 'none', color: 'white'}}>Depo</Link>{" "}</Button>
              <Button color="inherit"><Link to={`/departure`} style={{textDecoration: 'none', color: 'white'}}>Departure</Link>{" "}</Button>
              <Button color="inherit"><Link to={`/cusorder`} style={{textDecoration: 'none', color: 'white'}}>Order</Link></Button>
              <Button color="inherit"><Link to={`/about`} style={{textDecoration: 'none', color: 'white'}}>About</Link></Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<HomeContainer/>}/>
          <Route path="/location" element={<LocationContainer/>}/>
          <Route path="/truck" element={<TruckContainer/>}/>
          <Route path="/depo" element={<DepoContainer/>}/>
          <Route path="/departure" element={<DepartureContainer/>}/>
          <Route path="/cusorder" element={<CusOrderContainer/>}/>
          <Route path="/about" element={<AboutContainer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
