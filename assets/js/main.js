/**
 * Randy Minh Portfolio — Main Interactive Client Script
 * Features:
 * 1. Theme Switcher (Dark/Light mode with persistence & system sync)
 * 2. Copy-to-Clipboard (Email copy with visual tooltip & button feedback)
 * 3. Mobile Navigation Menu (Drawer toggle, click outside, Esc key, resize handling)
 * 4. Scroll Spy & Active Navigation (IntersectionObserver + position calculation)
 * 5. Lucide Icons initialization and dynamic update
 */

(function () {
  'use strict';

  // Constants
  const THEME_STORAGE_KEY = 'theme';
  const EMAIL_ADDRESS = 'randyminh90@gmail.com';
  const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'contact'];

  const DESKTOP_ACTIVE = ['text-blue-600', 'dark:text-blue-400', 'bg-blue-500/10', 'dark:bg-blue-500/15', 'font-semibold'];
  const DESKTOP_INACTIVE = ['text-zinc-600', 'dark:text-zinc-400', 'font-medium'];

  const MOBILE_ACTIVE = ['text-blue-600', 'dark:text-blue-400', 'bg-blue-500/10', 'dark:bg-blue-500/15', 'font-semibold'];
  const MOBILE_INACTIVE = ['text-zinc-700', 'dark:text-zinc-300', 'font-medium'];

  /**
   * Helper to re-render Lucide icons safely whenever DOM changes
   */
  function refreshIcons() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  /* =========================================================================
     1. Theme Switcher
     ========================================================================= */
  function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');

    function getPreferredTheme() {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
          return stored;
        }
      } catch (e) {
        console.warn('localStorage is not available:', e);
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      return 'dark'; // Default to dark mode
    }

    function applyTheme(theme, persist = false) {
      const isDark = theme === 'dark';
      const root = document.documentElement;

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Update meta theme-color for mobile browser address bars
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#09090b' : '#fafafa');
      }

      // Render sun icon if dark, moon icon if light
      if (themeToggleIcon) {
        themeToggleIcon.innerHTML = isDark
          ? '<i data-lucide="sun" class="w-5 h-5"></i>'
          : '<i data-lucide="moon" class="w-5 h-5"></i>';
        refreshIcons();
      }

      if (themeToggleBtn) {
        const label = isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
        themeToggleBtn.setAttribute('aria-label', label);
        themeToggleBtn.setAttribute('title', label);
      }

      if (persist) {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
          console.warn('Unable to persist theme to localStorage', e);
        }
      }
    }

    // Initialize with preferred or default theme
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme, false);

    // Toggle button click listener
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        const nextTheme = isCurrentlyDark ? 'light' : 'dark';
        applyTheme(nextTheme, true);
      });
    }

    // Sync with system changes if no explicit user override is stored
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        let hasSavedTheme = false;
        try {
          hasSavedTheme = !!localStorage.getItem(THEME_STORAGE_KEY);
        } catch (_) {}

        if (!hasSavedTheme) {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  }

  /* =========================================================================
     2. Copy Email to Clipboard
     ========================================================================= */
  function initCopyClipboard() {
    const copyBtn = document.getElementById('copy-email-btn');
    const copyTooltip = document.getElementById('copy-tooltip');
    if (!copyBtn) return;

    // Prevent CSS hover selector (.has-tooltip:hover) from prematurely revealing the tooltip
    const tooltipContainer = copyBtn.closest('.has-tooltip');
    if (tooltipContainer) {
      tooltipContainer.classList.remove('has-tooltip');
    }

    let hideTimer = null;

    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (err) {
          console.warn('navigator.clipboard failed, attempting fallback...', err);
        }
      }

      // Fallback using temporary textarea + execCommand
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      } catch (err) {
        console.error('Clipboard copy fallback error:', err);
        return false;
      }
    }

    copyBtn.addEventListener('click', async () => {
      const emailEl = document.getElementById('email-text');
      const textToCopy = (emailEl && emailEl.textContent.trim()) || EMAIL_ADDRESS;

      const copied = await copyText(textToCopy);
      if (!copied) return;

      // Show tooltip with smooth animation
      if (copyTooltip) {
        copyTooltip.classList.add('show', 'tooltip-animate');
        copyTooltip.setAttribute('data-show', 'true');
      }

      // Update button visual feedback
      copyBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Đã chép!</span>';
      copyBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
      copyBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
      refreshIcons();

      // Reset auto-hide timer (2.5 seconds)
      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      hideTimer = setTimeout(() => {
        if (copyTooltip) {
          copyTooltip.classList.remove('show', 'tooltip-animate');
          copyTooltip.removeAttribute('data-show');
        }
        copyBtn.innerHTML = '<i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Sao chép</span>';
        copyBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
        copyBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
        refreshIcons();
        hideTimer = null;
      }, 2500);
    });
  }

  /* =========================================================================
     3. Mobile Navigation Menu Toggle
     ========================================================================= */
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Đóng menu điều hướng');
      menuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      refreshIcons();
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Mở menu điều hướng');
      menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      refreshIcons();
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isClosed = mobileMenu.classList.contains('hidden');
      if (isClosed) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close when clicking any nav link inside mobile drawer
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close when clicking outside of menu and button
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden')) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });

    // Close on resize if expanded to desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    }, { passive: true });
  }

  /* =========================================================================
     4. Scroll Spy & Active Navigation Indicator
     ========================================================================= */
  function initScrollSpy() {
    const desktopLinks = document.querySelectorAll('header nav[aria-label="Điều hướng chính"] a[href^="#"]');
    const mobileLinks = document.querySelectorAll('#mobile-menu nav[aria-label="Điều hướng mobile"] a[href^="#"]');

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    let activeSectionId = null;

    function setActiveLink(sectionId) {
      if (!sectionId || activeSectionId === sectionId) return;
      activeSectionId = sectionId;

      // Update Desktop Navigation Links
      desktopLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const isMatch = href === '#' + sectionId;

        if (isMatch) {
          link.classList.remove(...DESKTOP_INACTIVE);
          link.classList.add(...DESKTOP_ACTIVE);
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove(...DESKTOP_ACTIVE);
          link.classList.add(...DESKTOP_INACTIVE);
          link.removeAttribute('aria-current');
        }
      });

      // Update Mobile Navigation Links
      mobileLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const isMatch = href === '#' + sectionId;

        if (isMatch) {
          link.classList.remove(...MOBILE_INACTIVE);
          link.classList.add(...MOBILE_ACTIVE);
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove(...MOBILE_ACTIVE);
          link.classList.add(...MOBILE_INACTIVE);
          link.removeAttribute('aria-current');
        }
      });
    }

    function calculateActiveSection() {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page -> contact
      if (windowHeight + scrollY >= docHeight - 60) {
        return 'contact';
      }

      // Top of page -> about
      if (scrollY < 80) {
        return 'about';
      }

      // Focal reading line at ~30% from the top of the viewport
      const readingLine = windowHeight * 0.3;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= readingLine && rect.bottom > readingLine) {
          return sections[i].id;
        }
      }

      return null;
    }

    function updateActiveOnScroll() {
      const activeId = calculateActiveSection();
      if (activeId) {
        setActiveLink(activeId);
      }
    }

    // IntersectionObserver observing all target sections
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(() => {
        updateActiveOnScroll();
      }, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
      });

      sections.forEach((sec) => observer.observe(sec));
    }

    // Scroll listener for smooth real-time tracking
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          updateActiveOnScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

    // Initial section activation
    const currentHash = window.location.hash ? window.location.hash.slice(1) : '';
    if (currentHash && SECTION_IDS.includes(currentHash)) {
      setActiveLink(currentHash);
    } else {
      const initialActive = calculateActiveSection() || SECTION_IDS[0];
      setActiveLink(initialActive);
    }
  }

  /* =========================================================================
     5. Lifecycle & Initialization
     ========================================================================= */
  function init() {
    refreshIcons();
    initThemeSwitcher();
    initCopyClipboard();
    initMobileMenu();
    initScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
