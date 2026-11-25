'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function RouteAnalyticsTracker() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!pathname) return;

    // Initial hard page load is already tracked by gtm.js
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const isArticleDetail =
      pathname.startsWith('/articles/') && pathname !== '/articles';
    const contentGroup = isArticleDetail
      ? 'article_detail'
      : pathname === '/articles'
        ? 'articles_index'
        : 'portfolio_home';

    trackEvent('virtual_pageview', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      content_group: contentGroup,
    });
  }, [pathname]);

  return null;
}
