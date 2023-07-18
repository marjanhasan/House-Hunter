import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Cards from "../../components/cards/Cards";
const houseData = [
  {
    id: 1,
    city: "New York",
    bedrooms: 3,
    bathrooms: 2,
    roomSize: "Medium",
    availability: "Available",
    rent: 2000,
  },
  {
    id: 2,
    city: "Los Angeles",
    bedrooms: 2,
    bathrooms: 1,
    roomSize: "Small",
    availability: "Available",
    rent: 1500,
  },
  // Add more house data as needed
];
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    bedrooms: "",
    bathrooms: "",
    roomSize: "",
    availability: "",
    rentRange: 5000, // Default rent range
  });

  const handleSearch = () => {
    // Perform search logic with the searchQuery and filters
    const filteredHouses = houseData.filter((house) => {
      // Apply filters
      const { city, bedrooms, bathrooms, roomSize, availability, rentRange } =
        filters;

      return (
        (city === "" || house.city === city) &&
        (bedrooms === "" || house.bedrooms === parseInt(bedrooms, 10)) &&
        (bathrooms === "" || house.bathrooms === parseInt(bathrooms, 10)) &&
        (roomSize === "" || house.roomSize === roomSize) &&
        (availability === "" || house.availability === availability) &&
        house.rent <= rentRange
      );
    });

    console.log("Search query:", searchQuery);
    console.log("Filters:", filters);
    console.log("Filtered houses:", filteredHouses);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="lg:flex gap-4">
      {/* desktop sidebar */}
      <div className="basis-[30%] bg-gray-100 hidden lg:block ">
        <div className="flex ml-10 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        <div className="ml-10">
          <div className="my-4">
            <label className="block mb-1 font-bold">City:</label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select city...</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Bedrooms:</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select bedrooms...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Bathrooms:</label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select bathrooms...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Room Size:</label>
            <select
              value={filters.roomSize}
              onChange={(e) => handleFilterChange("roomSize", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select room size...</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Availability:</label>
            <select
              value={filters.availability}
              onChange={(e) =>
                handleFilterChange("availability", e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select availability...</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Rent Range:</label>
            <input
              type="range"
              min={0}
              max={20000}
              step={1000}
              value={filters.rentRange}
              onChange={(e) =>
                handleFilterChange("rentRange", parseInt(e.target.value, 10))
              }
              className="w-40"
            />
            <div className="flex justify-between">
              <span>From 0 To {filters.rentRange}</span>
            </div>
          </div>
        </div>
      </div>
      {/* mobile dropdown */}
      <div className="lg:hidden block">
        <div className="w-full flex justify-center">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsSearchOpen(true)}
            className="btn my-6"
          >
            Search
          </button>
        </div>
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full z-10 bg-gray-300 space-x-10">
            <div className="flex justify-around items-center my-4">
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-2 py-1 lg:px-4 lg:py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
                <button
                  onClick={handleSearch}
                  className="px-2 py-1 lg:px-4 lg:py-2 bg-blue-500 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Search
                </button>
              </div>
              <button
                aria-label="Close Menu"
                title="Close Menu"
                onClick={() => setIsSearchOpen(false)}
                className="w-6 h-6"
              >
                <FaWindowClose className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">City:</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
              >
                <option value="">Select city...</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Bedrooms:</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select bedrooms...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Bathrooms:</label>
              <select
                value={filters.bathrooms}
                onChange={(e) =>
                  handleFilterChange("bathrooms", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select bathrooms...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Room Size:</label>
              <select
                value={filters.roomSize}
                onChange={(e) => handleFilterChange("roomSize", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select room size...</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Availability:</label>
              <select
                value={filters.availability}
                onChange={(e) =>
                  handleFilterChange("availability", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select availability...</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Rent Range:</label>
              <input
                type="range"
                min={0}
                max={20000}
                step={1000}
                value={filters.rentRange}
                onChange={(e) =>
                  handleFilterChange("rentRange", parseInt(e.target.value, 10))
                }
                className="w-40"
              />
              <div className="flex justify-between">
                <span>From 0 To {filters.rentRange}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* home page content  */}
      <div className="basis-[70%] bg-gray-50">
        <h1 className="text-center font-semibold text-4xl my-12">
          Welcome To House Hunting!
        </h1>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((s) => (
            <Cards key={s} />
          ))}
        </div>
        {/* pagination */}
        <div className="flex justify-center my-6">
          <div className="join mx-auto">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 22</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
