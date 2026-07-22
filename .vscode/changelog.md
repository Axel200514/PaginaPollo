CHANGELOG

[2026-07-22] QoL & Performance

- Reestructured project by moving index.html to root for SEO indexing.
- Implemented skeleton loading (shimmer) animation for heavy gallery images.
- Added decoding="async" and fetchpriority="high" to optimize main thread.
- Applied content-visibility: auto and CSS containment to gallery cards.
- Integrated SEO metadata (keywords, Open Graph tags) and Favicon.
- Added GitHub developer attribution tags and footer credits.

[2026-07-21] UI/UX & QoL

- Implemented continuous breathing animations across primary and social buttons.
- Expanded contact modal layout to 650px and scaled internal typography.
- Migrated contact modal to Gallery module to prevent navigation backtracking.
- Relocated Lightbox titles to top-left viewport to prevent image obstruction.
- Synchronized Lightbox title entry with delayed fade-and-slide transition.
- Updated Lightbox typography contrast to pure white with golden aura.
- Engineered global hover pause trigger to lock staggered animation sync.
- Decoupled transform keyframes from top hover effects to prevent timeline resets.
- Integrated Web Audio API for high-fidelity click feedback.

[2026-07-21] Performance & Security

- Executed codebase-wide comment stripping for minification.
- Implemented DocumentFragment batch DOM injections to minimize reflows.
- Enforced strict textContent data binding to mitigate DOM-based XSS.
- Applied lazy loading threshold logic for off-screen grid items.

[2026-07-21] Core Fixes

- Patched WebKit sub-pixel jitter on image scaling using mask-image.
- Forced hardware-accelerated GPU compositing to resolve border clipping bugs.
- Implemented global prefers-reduced-motion query for accessibility compliance.
- Fixed animation desynchronization by isolating keyframe targets.
