import React, { useState } from 'react';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Floorplan() {
  const dispatch = useDispatch();
  const [floorPlan, setFloorPlan] = useState([
    {
      type: 'Guest',
      count: 1,
    },
    {
      type: 'Bedrooms',
      count: 1,
    },
    {
      type: 'Bathroom',
      count: 1,
    },
    {
      type: 'Beds',
      count: 1,
    },
  ]);

  const navigate = useNavigate();

  const handleNext = () => {
    console.log('Validation succeeded. Proceed to the next step.');
    // Dispatch action and navigate to the next step
    dispatch({ type: 'propertyDetails', payload: { floorPlan: floorPlan } });
    navigate('/host/step-2');
  };

  const handleDecrement = (index) => {
    if (floorPlan[index].count > 0) {
      const updatedFloorPlan = [...floorPlan];
      updatedFloorPlan[index].count--;
      setFloorPlan(updatedFloorPlan);
    }
  };

  const handleIncrement = (index) => {
    const updatedFloorPlan = [...floorPlan];
    updatedFloorPlan[index].count++;
    setFloorPlan(updatedFloorPlan);
  };

  const handleCountChange = (index, newCount) => {
    const updatedFloorPlan = [...floorPlan];
    updatedFloorPlan[index].count = newCount;
    setFloorPlan(updatedFloorPlan);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HostNavbar />
      <div className="flex-grow mx-auto max-w-screen-xl px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Share some basics about your place</h2>
          <p>You can add more details later.</p>
        </div>
        <div className="mt-10 grid gap-6 justify-items-start">
          {floorPlan.map((category, index) => (
            <div key={index} className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <p className="font-medium">{category.type}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleDecrement(index)}>-</button>
                <input
                  type="number"
                  className="px-2 w-12 text-center border border-gray-300 rounded-md"
                  value={category.count}
                  onChange={(e) => handleCountChange(index, e.target.value)}
                />
                <button onClick={() => handleIncrement(index)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default Floorplan;
