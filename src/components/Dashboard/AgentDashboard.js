import './AgentDashboard.scss';
import { useState } from 'react';
import Navbar from './Navbar';
import Orders from './Orders';
import Users from './Users.js';
import Agents from './Agents';
import ProductionStatistics from './ProductionStatistics';

export default function AgentDashboard() {
  const [currentComponent, setCurrentComponent] = useState('Welcome');

  const currentSelection = (sal) => {
    setCurrentComponent(sal);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'orders list':
        return <Orders />;
      case 'Agents List':
        return <Agents />;
      case 'users list':
        return <Users />;
      default:
        return <ProductionStatistics />;
    }
  };

  return (
    <div>
      <Navbar currentMenuSelection={currentSelection}></Navbar>
      <div className="AgentDashboard__main-container">{renderComponent()}</div>
    </div>
  );
}
