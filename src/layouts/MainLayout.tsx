import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div className="app-container">
    <nav className="nav">
      <NavLink to="/employees" className={({ isActive }) => isActive ? 'nav__link--active' : 'nav__link'}>
        Employees
      </NavLink>
      <NavLink to="/wizard?role=admin" className="nav__link">
        Add Employee (Admin)
      </NavLink>
      <NavLink to="/style-guide" className="nav__link">
        Style Guide
      </NavLink>
    </nav>
    <main className="content">
      <Outlet /> {/* This renders the child routes */}
    </main>
  </div>
);

export default MainLayout;