import { React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import EpisodeList from '../EpisodeList/EpisodeList.js';
import CharachterDetail from '../CharachterDetail/CharachterDetail.js';
import LocationContext from '../LocationContext/LocationContext.js';

import * as LocationService from '../../services/Location.service.js';
import * as locationActions from '../../store/actions/location.action.js';

import logo from '../../content/img/logo.jpg';

function App(props) {
  useEffect(() => {
    
    var subscription = LocationService.getLocationList().subscribe((data) => {
      props.addLocations(data);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <header>
        <img alt="logo" src={logo} />
        <p>RaMDB</p>
      </header>
      <main className="content" >
        <div className="content-inner" >
          {/* <LocationContext.Provider value={props.locations} > */}
            <Routes>
              <Route path="/" element={<EpisodeList />} />
              <Route path="/episode/:id" element={<EpisodeList />} />
              <Route path="/character/:id" element={<CharachterDetail />} />
            </Routes>
          {/* </LocationContext.Provider> */}
        </div>
      </main>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
      addLocations: (locations) => dispatch(locationActions.addLocations(locations))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
