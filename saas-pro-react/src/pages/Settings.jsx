import { useState } from 'react';
import SettingsNav from '../../components/Settings/SettingsNav/SettingsNav';
import ProfileForm from '../../components/Settings/ProfileForm/ProfileForm';
import './Settings.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="page settings-page">
      <div className="settings-header">
        <h1>Configurações</h1>
      </div>

      <div className="settings-content">
        <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="settings-panel">
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2>Preferências</h2>
              <p>Configurações de preferências em desenvolvimento</p>
            </div>
          )}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Segurança</h2>
              <p>Configurações de segurança em desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
