import React, { useState } from 'react';
import { Card, Input, Typography } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';

function Availability() {
  const [minimumStay, setMinimumStay] = useState('');
  const [maximumStay, setMaximumStay] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  const handleNext = () => {
    const payload = {
      minimumStay,
      maximumStay,
      availability: [startDate, endDate],
    };

    dispatch({ type: 'propertyDetails', payload });
    navigate('/host/setPrice');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <HostNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-28 px-4">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Set up your calendar
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Use availability settings to customize how and when you want to host.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-4">
              <label htmlFor="minimumstay">Minimum Stay</label>
              <Input
                size="lg"
                label="Minimum stay day"
                value={minimumStay}
                onChange={(e) => setMinimumStay(e.target.value)}
              />
              <label htmlFor="maximumstay">Maximum Stay</label>
              <Input
                size="lg"
                label="Maximum stay day"
                value={maximumStay}
                onChange={(e) => setMaximumStay(e.target.value)}
              />
            </div>
            <Typography variant="h6" color="blue-gray">
              Select Dates start and end
            </Typography>
            <Input
              size="lg"
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              size="lg"
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </form>
        </Card>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default Availability;
