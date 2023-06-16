const Table = ({tableHeaders}) => {
    return (
        <>
            <RenderTable tableHeaders={tableHeaders}/>
        </>
    )
}



const RenderTable = ({ tableHeaders,  loading }) => {
    return (
      <table className="w-full">
        <thead className="bg-primary-light">
            {
                tableHeaders.map((header, index) => (
                    <th className="whitespace-nowrap py-4 w-40 text-sm text-primary" key={index}>{header}</th>
                ))
            }
        </thead>
        {/* {loading ? (
          'loading ....'
        ) : tableData.length == 0 ? (
          'No Result found'
        ) : (
          <tbody>
            {tableData.map((tableCol, index) => {
              return (
                <tr key={index}>
                  {
                    tableData.map((tableCol, index) => (
                        <td className="whitespace-nowrap" key={index}>{tableCol.data}</td>
                    ))
                  }
                </tr>
              );
            })}
          </tbody>
        )} */}
      </table>
    );
  };

export default Table 