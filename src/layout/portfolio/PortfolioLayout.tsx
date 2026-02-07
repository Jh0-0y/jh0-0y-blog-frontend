import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PDFProgressProvider } from '@/feature/portfolio/provider/PDFProgressProvider';
import { usePDFProgress } from '@/feature/portfolio/hooks/usePDFProgress';
import { PDFGenerationOverlay } from './_components/PDFGenerationOverlay';
import styles from './PortfolioLayout.module.css';

// ─── 오버레이 렌더링 컴포넌트 (context 소비) ─────────────────────────────────
// Provider 안에 있어야 usePDFProgress를 호출할 수 있으므로 분리

const PDFOverlayRenderer = () => {
  const { progress } = usePDFProgress();

  return (
    <PDFGenerationOverlay
      progress={progress}
      isVisible={progress.step !== 'idle'}
    />
  );
};

// ─── 레이아웃 ────────────────────────────────────────────────────────────────

export const PortfolioLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'activities', label: 'Activities' },
  ];

  return (
    <PDFProgressProvider>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <a href="/portfolio" className={styles.logo}>
              Portfolio
            </a>

            <nav className={styles.nav}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={styles.navLink}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              className={styles.menuButton}
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </header>

        <div
          className={`${styles.mobileNav} ${
            mobileMenuOpen ? styles.mobileNavOpen : ''
          }`}
        >
          <button
            className={styles.mobileNavClose}
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={styles.mobileNavLink}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <main className={styles.main}>
          <Outlet />  {/* context 전달 제거 */}
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerLeft}>
              <span className={styles.footerName}>정현영</span>
              <span className={styles.footerCopyright}>
                © 2024 All rights reserved.
              </span>
            </div>
            <div className={styles.footerLinks}>
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                GitHub
              </a>
              <a
                href="https://sealog.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                Blog
              </a>
              <a href="mailto:email@example.com" className={styles.footerLink}>
                Email
              </a>
            </div>
          </div>
        </footer>

        <button
          className={`${styles.scrollTopButton} ${
            showScrollTop ? styles.scrollTopButtonVisible : ''
          }`}
          onClick={scrollToTop}
        >
          ↑
        </button>

        {/* PDF 오버레이: context에서 progress를 읽어서 표시 */}
        <PDFOverlayRenderer />
      </div>
    </PDFProgressProvider>
  );
};