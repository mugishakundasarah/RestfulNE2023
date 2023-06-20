import { Pagination } from "@mui/material";
import { useEffect } from "react";


const Table = ({tableHeaders, tableData, page, fetchEmployees, totalPages}) => {
  const camelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ""; // Handle special case for "0"
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };
  const camelCaseHeaders = tableHeaders.map((header) => camelCase(header));

    return (
        <div className="mx-auto w-full flex flex-col items-center">
          <RenderTable tableHeaders={tableHeaders} camelCaseHeaders={camelCaseHeaders} tableData={tableData}/>
          <Pagination count={totalPages} className="mt-12" onChange={(e) => fetchEmployees(e.target.textContent)}/>
        </div>
    )
}



const RenderTable = ({ tableHeaders, camelCaseHeaders, loading, tableData }) => {
  console.log(tableData)
    return (
      <table className="w-full">
        <thead className="bg-primary-light">
            {
                tableHeaders.map((header, index) => (
                    <th className="whitespace-nowrap py-4 w-40 text-sm text-primary px-6" key={index}>{header}</th>
                ))
            }
        </thead>
        {loading ? (
          'loading ....'
        ) : tableData.length == 0 ? (
          'No Result found'
        ) : (
          <tbody>
        {loading ? (
          <tr>
            <td colSpan={tableHeaders.length} className="text-center">Loading...</td>
          </tr>
        ) : tableData.length === 0 ? (
          <tr> 
            <td colSpan={tableHeaders.length} className="text-center">No Results Found</td>
          </tr>
        ) : (
          tableData.map((rowData, index) => (
            <tr key={index} >
              {camelCaseHeaders.map((header, index) => (
                <td className="whitespace-nowrap text-center py-3 text-secondary" key={index}>
                  {rowData[header]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
        )}
      </table>
    );
  };

export default Table 