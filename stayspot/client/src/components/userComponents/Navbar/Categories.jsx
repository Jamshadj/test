
import Container from '../Container';
import CategoryBox from './CategoryBox'; // Make sure you have the correct path to CategoryBox
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation instead of useParams and useSearchParams
import categoriess from '../../hostComponents/AddProperty/StructureData';
const Categories = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleCategoryClick = (label) => {
    setSelectedLabel(label);
    console.log('Selected category:', label);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const pathname = location.pathname;
  const isMainPage = pathname === '/';

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto">
        {categoriess.map((item) => (
          // Wrap each CategoryBox with a Link component
          <Link
            key={item.label}
            to={{
              pathname: '/', // Specify the destination path
              search: `?category=${item.label}`, // Pass the category as a query parameter
            }}
          >
            <CategoryBox
              label={item.label}
              icon={item.icon}
              selected={selectedLabel === item.label}
              onClick={handleCategoryClick}
            />
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Categories;