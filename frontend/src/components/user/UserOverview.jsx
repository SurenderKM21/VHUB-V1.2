import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const UserOverview = () => (
    <div className="dashboard-overview">
        <h3>
            <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: '12px', color: 'var(--primary-color)' }} />
            User Overview
        </h3>
        <p>Welcome to your VHUB dashboard. Here you can track your service bookings and manage your profile.</p>
    </div>
);

export default UserOverview;
