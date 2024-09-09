import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ReportDetail.css'; // Import the CSS file

const ReportDetail = () => {
  const { reportId } = useParams();
  const { state } = useLocation();
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = state.token;
        const response = await axios.get(`http://localhost:3002/report/${reportId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReport(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching report');
      }
    };

    fetchReport();
  }, [reportId, state.token]);

  const handleViewAllReports = () => {
    navigate('/all-report');
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="report-detail-container">
        {report ? (
          <>
            <h1>Report Details</h1>
            <p><strong>Score:</strong> {report.score}</p>
            <p><strong>Total Questions:</strong> {report.total}</p>
            <p><strong>Percentage:</strong> {report.percentage}%</p>
            <p><strong>Passing Percentage:</strong> {report.passingPercentage}%</p>
            <p><strong>Result:</strong> {report.resultStatus}</p>
            <button onClick={handleViewAllReports}>View All Reports</button>
           
          </>
        ) : (
          <p>Loading report...</p>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
