import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ServiceHistory = () => {
    const [completedBookings, setCompletedBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data: bookingsData } = await axios.get('http://localhost:8080/api/bookings/get', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                const userCompleted = bookingsData.filter(booking => booking.email === user.email && booking.status === 'Completed');
                setCompletedBookings(userCompleted);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to load service history');
                setLoading(false);
            }
        };

        if (user?.email) fetchBookings();
    }, [user.email]);

    const handleDownloadInvoice = async (booking) => {
        // Retrieve service cost
        const storedServices = JSON.parse(localStorage.getItem('services')) || [];
        const serviceDetails = storedServices.find(s => s.title === booking.service);
        const cost = serviceDetails ? serviceDetails.cost : 'N/A';

        const doc = new jsPDF();
        
        let logoBottomY = 10;

        try {
            const img = new Image();
            img.src = '/logo.jpg';
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/jpeg');
            
            const ratio = img.width / img.height;
            const imgWidth = 35;
            const imgHeight = imgWidth / ratio;
            
            doc.addImage(imgData, 'JPEG', 14, 10, imgWidth, imgHeight);
            logoBottomY = 10 + imgHeight;
        } catch (e) {
            console.error("Failed to load logo", e);
        }

        // Header - placed to the right of the logo
        doc.setFontSize(22);
        doc.setTextColor(37, 99, 235); // Blue
        doc.text('VHUB Vehicle Service', 55, 20);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('123 Auto Repair Lane', 55, 28);
        doc.text('City, State, ZIP', 55, 33);
        doc.text('Phone: (555) 123-4567', 55, 38);

        // Invoice Info - top right
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text('INVOICE', 150, 20);
        doc.setFontSize(10);
        doc.text(`Invoice Number: INV-${booking.id}-${Math.floor(Math.random() * 1000)}`, 150, 28);
        doc.text(`Date: ${booking.date}`, 150, 33);

        const contentStartY = Math.max(logoBottomY + 15, 55);

        // Customer Info
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('Bill To:', 14, contentStartY);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Name: ${booking.name}`, 14, contentStartY + 7);
        doc.text(`Email: ${booking.email}`, 14, contentStartY + 12);
        doc.text(`Phone: ${booking.phone}`, 14, contentStartY + 17);
        doc.text(`Vehicle: ${booking.vehicleNumber}`, 14, contentStartY + 22);

        // Table
        autoTable(doc, {
            startY: contentStartY + 35,
            head: [['Description', 'Technician', 'Amount']],
            body: [
                [`${booking.service}\n\nProblem: ${booking.problemDescription}`, booking.mechanicName || 'Assigned Technician', `INR ${cost}`]
            ],
            theme: 'striped',
            headStyles: { fillColor: [37, 99, 235] }
        });

        // Total
        const finalY = doc.lastAutoTable.finalY || (contentStartY + 70);
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Total Due: INR ${cost}`, 150, finalY + 10);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Thank you for choosing VHUB Vehicle Services!', 14, finalY + 30);

        doc.save(`VHUB_Invoice_${booking.id}.pdf`);
    };

    if (loading) return <p>Loading service history...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="booking-management">
            <h3>
                <FontAwesomeIcon icon={faFileInvoiceDollar} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
                Service History & Invoices
            </h3>
            {completedBookings.length === 0 ? (
                <p>No completed services found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Vehicle Number</th>
                                <th>Service</th>
                                <th>Date Completed</th>
                                <th>Mechanic</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td><span className="badge">{booking.vehicleNumber}</span></td>
                                    <td>{booking.service}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.mechanicName || 'N/A'}</td>
                                    <td>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            onClick={() => handleDownloadInvoice(booking)}
                                            sx={{ bgcolor: 'var(--primary-color)' }}
                                            startIcon={<FontAwesomeIcon icon={faDownload} />}
                                        >
                                            PDF
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ServiceHistory;
