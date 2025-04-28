import React from 'react';
import '../components/css/display.css'

const Display = () => {
  // Sample data for the table
  const tableData = [
    { id: 1, fistname: 'John', lastname: 'Doe', department: 'HR', position: 'manager', emailAddress: 'janedoe@gmail.com' },
    { id: 1, fistname: 'John', lastname: 'Doe', department: 'HR', position: 'manager', emailAddress: 'janedoe@gmail.com' },
    { id: 1, fistname: 'John', lastname: 'Doe', department: 'HR', position: 'manager', emailAddress: 'janedoe@gmail.com' },
    { id: 1, fistname: 'John', lastname: 'Doe', department: 'HR', position: 'manager', emailAddress: 'janedoe@gmail.com' },
    { id: 1, fistname: 'John', lastname: 'Doe', department: 'HR', position: 'manager', emailAddress: 'janedoe@gmail.com' },
    { id: 1, fistname: 'John', lastname: 'Doe', department: 'HR', position: 'manager', emailAddress: 'janedoe@gmail.com' },


  ];

  return (
    <div>
      <h2>Equipment Distribution</h2>
      <p>
        User Information
      </p>
      <table border="1">
      {/* border="1" style={{ width: '100%', borderCollapse: 'collapse' }} */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstname}</td>
              <td>{row.lastname}</td>
              <td>{row.department}</td>
              <td>{row.position}</td>
              <td>{row.emailAddress}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
