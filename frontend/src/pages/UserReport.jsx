import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/Savindi/api/usersre');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const generateReport = async () => {
    try {
      const response = await axios.get('/Savindi/api/users/reports');
      const reportData = response.data;
      console.log(reportData); // Log the report data
      setMessage('Report generated successfully');
    } catch (error) {
      setError('Failed to generate report');
    }
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const UserReportDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Name</Text>
          {users.map(user => (
            <Text key={user._id}>{user.name}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Email</Text>
          {users.map(user => (
            <Text key={user._id}>{user.email}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Contact</Text>
          {users.map(user => (
            <Text key={user._id}>{user.contact}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Registered User Report</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="mt-4">
        <table className="table-auto w-full bg-green-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border border-gray-200">
                <td className="px-4 py-2 font-semibold">{user.name}</td>
                <td className="px-4 py-2 text-gray-600">{user.email}</td>
                <td className="px-4 py-2 text-gray-600">{user.contact}</td>
                <td className="px-4 py-2 text-gray-600">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PDFDownloadLink document={UserReportDocument} fileName="user_report.pdf">
        {({ blob, url, loading, error }) => (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow mt-4"
            disabled={loading}
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default UserReport;
