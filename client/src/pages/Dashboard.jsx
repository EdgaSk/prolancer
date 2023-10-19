import { useContext, useEffect, useState } from "react";
import getAllJobs from "../api/jobs";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { accessToken } = useContext(UserContext); // Gaukite access token iš UserContext

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Naudojame gautą access token iš UserContext
        const jobsData = await getAllJobs(accessToken);
        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error.message);
      }
    };

    fetchJobs();
  }, [accessToken]); // Pasižymime access token kaip priklausomybę

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
