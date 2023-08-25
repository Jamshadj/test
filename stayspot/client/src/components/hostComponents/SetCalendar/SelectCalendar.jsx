import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function SelectCalendar() {
  const navigate = useNavigate();

  return (
    <div className="ml-32 mt-12">
      <Card className="mt-6 w-80">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 text-4xl">
            <AiOutlineCalendar />
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2 text-xl">
            Setup your calendar
          </Typography>
          <Typography>Change which dates are available</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={() => navigate('/host/set-avaliblity')}>change</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SelectCalendar;
