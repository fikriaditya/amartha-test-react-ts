import { NavLink, Outlet } from 'react-router-dom';
import logoUrl from '../assets/images/logo-amartha.png';

const MainLayout = () => (
  <div className="app-container">
    <nav className="nav">
      <img src={logoUrl} alt="App Logo" className="nav__logo" />
      <div className="nav__links">
        <NavLink to="/employees" className={({ isActive }) => isActive ? 'nav__link--active' : 'nav__link'}>
          Employees
        </NavLink>
        <NavLink to="/wizard?role=admin" className="nav__link">
          Add Employee (Admin)
        </NavLink>
        <NavLink to="/wizard?role=ops" className="nav__link">
          Add Employee (Ops)
        </NavLink>
        <NavLink to="/style-guide" className="nav__link">
          Style Guide
        </NavLink>
      </div>
    </nav>
    <main className="content">
      <Outlet /> {/* This renders the child routes */}
    </main>
  </div>
);

export default MainLayout;