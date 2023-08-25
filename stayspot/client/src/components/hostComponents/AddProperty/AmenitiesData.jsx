import { PiTelevisionFill } from 'react-icons/pi';
import { MdOutlineSoupKitchen, MdOutlinePaid, MdOutlineLocalParking } from 'react-icons/md';
import { GiWashingMachine } from 'react-icons/gi'
import { TbAirConditioning } from 'react-icons/tb';
import { BsPersonWorkspace } from 'react-icons/bs';
import { GrWifi } from 'react-icons/gr';

const amenities = [
  {
    label: 'Wifi',
    icon: GrWifi ,
    description: "Enjoy seamless internet connectivity with high-speed WiFi available throughout the property. Stay connected and surf the web effortlessly.",
  },
  {
    label: 'TV',
    icon: PiTelevisionFill,
    description: "Relax and unwind with a variety of entertainment options. Watch your favorite shows and movies on a TV provided for your enjoyment.",
  },
  {
    label: 'Kitchen',
    icon: MdOutlineSoupKitchen ,
    description: "Access to a fully-equipped kitchen with all the necessary amenities to prepare delicious meals. Cook like a chef during your stay.",
  },
  {
    label: 'Washing Machine',
    icon: GiWashingMachine ,
    description: "Stay clean and fresh during your trip with access to a washing machine. Laundry facilities are available for your convenience.",
  },
  {
    label: 'Free parking on premises',
    icon: MdOutlineLocalParking ,
    description: "Travel with ease and park your vehicle without any additional charges. Take advantage of complimentary parking facilities.",
  },
  {
    label: 'Paid parking on premises',
    icon: MdOutlinePaid ,
    description: "For those who prefer added convenience, paid parking options are available on the property. Park securely and hassle-free.",
  },
  {
    label: 'Air conditioning',
    icon: TbAirConditioning ,
    description: "Beat the heat with air-conditioned rooms. Enjoy a comfortable and cool environment during your stay.",
  },
  {
    label: 'Dedicated Work space',
    icon: BsPersonWorkspace ,
    description: "Ideal for business travelers or remote workers, this property offers a dedicated workspace for your productivity needs. Focus and get work done efficiently.",
  },
  // Add more categories as needed
  // ...
];

export default amenities;
