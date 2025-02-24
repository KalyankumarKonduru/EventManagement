// src/App.js
import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from './context/UserContext';
import { fetchEventsByLocation } from './utils/api';
import MapContainer from './components/MapContainer';

// Attendee Pages
import Login from './components/Login';
import Register from './components/Register';
import EventDetails from './components/EventDetails';
import Purchase from './components/Purchase';
import Profile from './components/Profile';

// Organizer Pages
import OrganizerAnalytics from './components/OrganizerAnalytics';
import OrganizerEvents from './components/OrganizerEvents';
import OrganizerEventDetails from './components/OrganizerEventDetails';
import CreateEvent from './components/CreateEvent';

// Events Listing Page (for attendees)
import EventsPage from './components/EventsPage';

// Layout and Animation
import MainLayout from './Layouts/MainLayout';
import AnimatedPage from './components/AnimatedPage';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const [viewMode, setViewMode] = useState('list');
  const handleToggleView = (mode) => setViewMode(mode);

  // Location filter state (expects {lat, lng})
  const [locationFilter, setLocationFilter] = useState(null);
  const [events, setEvents] = useState([]);

  // When location filter changes, fetch events from backend.
  useEffect(() => {
    const fetchData = async () => {
      if (locationFilter) {
        const data = await fetchEventsByLocation(locationFilter);
        setEvents(data);
      } else {
        setEvents([]);
      }
    };
    fetchData();
  }, [locationFilter]);

  const handleLocationChange = (newLocation) => {
    setLocationFilter(newLocation);
  };

  const handleSearch = (searchText) => {
    console.log('Search:', searchText);
    // Optionally, trigger a search API call.
  };

  const handleDateRangeChange = (range) => {
    console.log('Date range:', range);
    // Optionally, trigger filtering by date.
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* Root Redirect */}
        <Route path="/" element={user ? <Navigate to="/map" /> : <Navigate to="/login" />} />
        
        {/* Pre-login Routes */}
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />

        {/* Attendee Routes */}
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <MainLayout
                onToggleView={handleToggleView}
                onLocationChange={handleLocationChange}
                onDateRangeChange={handleDateRangeChange}
                onSearch={handleSearch}
              >
                <AnimatedPage>
                  <MapContainer onLocationChange={handleLocationChange} />
                </AnimatedPage>
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="/event/:id" element={
          <PrivateRoute>
            <MainLayout>
              <AnimatedPage>
                <EventDetails />
              </AnimatedPage>
            </MainLayout>
          </PrivateRoute>
        }/>
        <Route path="/purchase/:id" element={
          <PrivateRoute>
            <MainLayout>
              <AnimatedPage>
                <Purchase />
              </AnimatedPage>
            </MainLayout>
          </PrivateRoute>
        }/>
        <Route path="/profile" element={
          <PrivateRoute>
            <MainLayout>
              <AnimatedPage>
                <Profile />
              </AnimatedPage>
            </MainLayout>
          </PrivateRoute>
        }/>
        <Route path="/events" element={
          <PrivateRoute>
            <MainLayout onToggleView={handleToggleView}>
              <AnimatedPage>
                <EventsPage events={events} viewMode={viewMode} />
              </AnimatedPage>
            </MainLayout>
          </PrivateRoute>
        }/>

        {/* Organizer Routes */}
        <Route path="/organizer" element={<Navigate to="/organizer/events" />} />
        <Route path="/organizer/events" element={
          <PrivateRoute>
            {user && user.role === 'organizer' ? (
              <MainLayout>
                <AnimatedPage>
                  <OrganizerEvents />
                </AnimatedPage>
              </MainLayout>
            ) : <Navigate to="/map" />}
          </PrivateRoute>
        }/>
        <Route path="/organizer/analytics" element={
          <PrivateRoute>
            {user && user.role === 'organizer' ? (
              <MainLayout>
                <AnimatedPage>
                  <OrganizerAnalytics />
                </AnimatedPage>
              </MainLayout>
            ) : <Navigate to="/map" />}
          </PrivateRoute>
        }/>
        <Route path="/organizer/event/:id" element={
          <PrivateRoute>
            {user && user.role === 'organizer' ? (
              <MainLayout>
                <AnimatedPage>
                  <OrganizerEventDetails />
                </AnimatedPage>
              </MainLayout>
            ) : <Navigate to="/map" />}
          </PrivateRoute>
        }/>
        <Route path="/organizer/create" element={
          <PrivateRoute>
            {user && user.role === 'organizer' ? (
              <MainLayout>
                <AnimatedPage>
                  <CreateEvent />
                </AnimatedPage>
              </MainLayout>
            ) : <Navigate to="/map" />}
          </PrivateRoute>
        }/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
