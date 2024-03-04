import React, {useEffect, useState} from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import SideBar from '../Sidebar/SideBar';
import NewsLetter from '../components/NewsLetter';


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(()=> {
    setIsLoading(true);
    fetch("jobs.json").then(res =>res.json()).then(data => {
      //console.log(data)
      setJobs(data)
      setJobs(data);
        setIsLoading(false);
    })
  },[])

  const [query,setQuery]= useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const filteredItems =jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLocaleLowerCase()) !==-1)
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };


  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

//main function
  const  filteredData =( jobs,selected,query) => {
    let filteredJobs = jobs
  

  //filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    //category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) === parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      ));
      console.log(filteredJobs);

  }

  const { startIndex, endIndex } = calculatePageRange();
  filteredJobs = filteredJobs.slice(startIndex, endIndex);  
  return filteredJobs.map((data,i) => <Card key={i} data={data}/>)
}

const result = filteredData(jobs, selectedCategory, query);


  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange}/>
     { /* main content*/}
     <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                <div className='bg-white p-4 rounded'>
                  <SideBar handleChange={handleChange} handleClick={handleClick}/>
                </div>
                <div className='col-span-2 bg-white p-4 rounded'>
                {isLoading ? ( // Loading indicator
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
                </div>
                <div className='bg-white p-4 rounded'>
                <NewsLetter />
                </div>
      </div>
    </div>
  
  )
}

export default Home
