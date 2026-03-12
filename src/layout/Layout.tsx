import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, FloatButton  } from 'antd';
import '../assets/css/Layout.css';
import { MailOutlined, ArrowUpOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

const menuItems = [
  { key: '/', label: 'Beranda' },
  { key: '/mapset', label: 'Peta Interaktif' }
];

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // enerate bradcrumb item
  // const breadcrumbItems = [
  //   { title: 'Home' },
  //   { 
  //     title: menuItems.find(item => item.key === location.pathname)?.label || 'Beranda' 
  //   }
  // ];

  return (
    <>
      <Header className="app-header">
        <img
          src="/Logo.png"
          alt="DIGISPATIA logo"
          className="app-logo"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onSelect={(e) => navigate(e.key)}
          items={menuItems}
          className="app-menu"
        />
      </Header>
      <Layout style={{ minHeight: '100vh' }} className='app-layout'>

        <Content className='app-content'>
            {children}
        </Content>

        <Footer className="app-footer">
          <div className="footer-container">
            {/* KIRI */}
            <div className="footer-left">
              <div className="footer-brand">
                <img src="/Logo.png" alt="DigiSpatia" className="footer-logo" />
                <span className="footer-title">
                  DIGI<span className="highlight">SPATIA</span>
                </span>
              </div>

              <p className="footer-desc">
                DigiSpatia adalah konsultan digital dan geospasial yang menyediakan
                layanan pengembangan website, WebGIS, serta analisis spasial dan data
                digital untuk mendukung perencanaan dan pengambilan keputusan.
              </p>
            </div>

            {/* TENGAH */}
            <div className="footer-center">
              <h4>Informasi Kontak</h4>

              <div className="footer-contact">
                <div className="contact-item">
                  <span className="contact-icon email"></span>
                  <span>digispatia@gmail.com</span>
                </div>

                <div className="contact-item">
                  <span className="contact-icon linkedin"></span>
                  <span>DigiSpatia Solution</span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING ACTION */}
          {/* <div className="footer-fab">
            <button
              className="fab email"
              onClick={() => {
                window.location.href = 'mailto:digispatia@gmail.com';
              }}
            ></button>
            <button
              className="fab up"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            ></button>
          </div> */}
          <FloatButton.Group shape="circle" style={{ right: 24 }}>
            <FloatButton
              icon={<MailOutlined style={{ color: 'white' }}/>}
              tooltip="Email DigiSpatia"
              style={{background: "#ff9800"}}
              onClick={() => {
                window.location.href = 'mailto:digispatia@gmail.com';
              }}
            />

            <FloatButton.BackTop
              style={{ background: '#2f6bff' }}
              icon={<ArrowUpOutlined style={{ color: 'white' }}/>}
              tooltip="Kembali ke atas"
            />
          </FloatButton.Group>
        </Footer>

      </Layout>
    </>
  );
};

export default AppLayout;
