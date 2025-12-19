import { useEffect, useState } from 'react';
import { EmployeeService } from '../services/employee.service';
import type { BasicInfoEntity, EmployeeDetailsEntity, EmployeeListEntity } from '../core/types/employee';
import EmployeeTable from '../components/listing/EmployeeTable';
import Pagination from '../components/listing/pagination';

const EmployeeListPage = () => {
  // State
  const [employees, setEmployees] = useState<EmployeeListEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Data Fetching & Merging
  useEffect(() => {
    const fetchAndMergeData = async () => {
      setLoading(true);
      try {
        // Parallel fetching
        const [basicRes, detailsRes] = await Promise.all([
          EmployeeService.getAllBasicInfo(1, 1000),
          EmployeeService.getAllDetails(1, 1000)
        ]);

        const basicData: BasicInfoEntity[] = basicRes.data;
        const detailsData: EmployeeDetailsEntity[] = detailsRes.data;

        // Merge logic using employeeId
        const merged = detailsData.map(detail => {
          // Find the corresponding basic info
          const basicInfo = basicData.find(b => b.employee_id === detail.employee_id);
          return {
            ...detail,
            ...basicInfo,
          };
        });

        setEmployees(merged);
      } catch (error) {
        console.error("Failed to fetch employee directory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeData();
  }, []);
  

  //State for Pagination
  const totalPages = Math.ceil(employees.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = employees.slice(startIndex, startIndex + pageSize);

  // Handle page size
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  };

  if (loading) {
    return <div className="loading-state">Syncing Employee Directory</div>;
  }

  return (
    <div className="employee-list-page">
      <EmployeeTable data={currentItems} />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default EmployeeListPage;