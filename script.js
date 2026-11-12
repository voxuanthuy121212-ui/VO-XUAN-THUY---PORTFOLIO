document.addEventListener("DOMContentLoaded", () => {

    const lockscreen = document.getElementById("lockscreen");
    const desktop = document.getElementById("desktop");
    const desktopCatBtn = document.getElementById("desktop-cat-btn");

    const DESIGN_WIDTH = 1920;
    const DESIGN_HEIGHT = 1080;

    let isUnlocked = false;

    function resizeScreen() {
        const scaleX = window.innerWidth / DESIGN_WIDTH;
        const scaleY = window.innerHeight / DESIGN_HEIGHT;
        const scale = Math.min(scaleX, scaleY);

        lockscreen.style.setProperty("--scale", scale);
        desktop.style.setProperty("--scale", scale);
    }

    resizeScreen();
    window.addEventListener("resize", resizeScreen);

    setTimeout(() => {
        if (!isUnlocked) lockscreen.classList.add("year-changed");
    }, 1200);

    setTimeout(() => {
        if (!isUnlocked) lockscreen.classList.add("name-typed");
    }, 1200);

    function unlockScreen() {
        if (isUnlocked) return;
        isUnlocked = true;
        lockscreen.classList.add("unlocking");
        desktop.classList.add("active");
        setTimeout(() => { lockscreen.style.display = "none"; }, 700);
    }

    function lockScreen() {
        if (!isUnlocked) return;
        isUnlocked = false;
        lockscreen.style.display = "block";
        setTimeout(() => {
            lockscreen.classList.remove("unlocking");
            desktop.classList.remove("active");
        }, 10);
    }

    lockscreen.addEventListener("click", () => { unlockScreen(); });

    if (desktopCatBtn) {
        desktopCatBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            lockScreen();
        });
    }

    function updateDesktopTopbarState() {
        const isAboutOpen = windowAbout && windowAbout.classList.contains('active');
        const isDesignOpen = windowDesign && windowDesign.classList.contains('active');
        const isIllOpen = windowIllustration && windowIllustration.classList.contains('active');
        const isPhotoOpen = windowPhotography && windowPhotography.classList.contains('active');
        if (isAboutOpen || isDesignOpen || isIllOpen || isPhotoOpen) {
            desktop.classList.add('window-opened');
        } else {
            desktop.classList.remove('window-opened');
        }
    }

    /* ABOUT ME WINDOW */
    const folderAboutBtn = document.getElementById('folder-about-btn');
    const windowAbout = document.getElementById('window-about');
    const btnCloseAbout = document.getElementById('btn-close-about');
    const activeBg = document.getElementById('menu-active-bg');

    const avatarCard = document.getElementById('avatar-card');
    const catWrapper = document.getElementById('cat-wrapper');
    const btnCloseAvatar = document.getElementById('btn-close-avatar');

    const tabAbout = document.getElementById('tab-about-content');
    const tabExperience = document.getElementById('tab-experience-content');
    const tabEduAwards = document.getElementById('tab-education-awards-content');

    const scrollArea = document.getElementById('experience-scroll-area');
    const customScrollbar = document.getElementById('custom-scrollbar');

    if (folderAboutBtn && windowAbout) {
        folderAboutBtn.addEventListener('click', () => {
            windowAbout.classList.add('active');
            updateDesktopTopbarState();
            if (avatarCard) avatarCard.classList.remove('hidden');
            if (catWrapper) catWrapper.classList.remove('active');
            switchTab('menu-item-about');
        });
    }

    if (btnCloseAbout && windowAbout) {
        btnCloseAbout.addEventListener('click', (e) => {
            e.stopPropagation();
            windowAbout.classList.remove('active');
            updateDesktopTopbarState();
        });
    }

    if (btnCloseAvatar && avatarCard && catWrapper) {
        btnCloseAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            avatarCard.classList.add('hidden');
            catWrapper.classList.add('active');
        });
    }

    function switchTab(menuId) {
        if (tabAbout) tabAbout.classList.remove('active');
        if (tabExperience) tabExperience.classList.remove('active');
        if (tabEduAwards) tabEduAwards.classList.remove('active');

        if (menuId === 'menu-item-about') {
            if (tabAbout) tabAbout.classList.add('active');
        } else if (menuId === 'menu-item-experience') {
            if (tabExperience) tabExperience.classList.add('active');
        } else if (menuId === 'menu-item-education' || menuId === 'menu-item-awards') {
            if (tabEduAwards) tabEduAwards.classList.add('active');
        }
    }

    if (scrollArea && customScrollbar) {
        scrollArea.addEventListener('scroll', () => {
            const scrollTop = scrollArea.scrollTop;
            const scrollHeight = scrollArea.scrollHeight - scrollArea.clientHeight;
            const scrollPercent = scrollTop / (scrollHeight || 1);
            const maxTopOffset = 390; 
            customScrollbar.style.top = `${146 + (scrollPercent * maxTopOffset)}px`;
        });
    }

    const menuItems = [
        { id: 'menu-item-about', top: '146px' },
        { id: 'menu-item-experience', top: '315px' },
        { id: 'menu-item-education', top: '490px' },
        { id: 'menu-item-awards', top: '644px' }
    ];

    menuItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (activeBg) activeBg.style.top = item.top;
                menuItems.forEach(i => {
                    const menuItemEl = document.getElementById(i.id);
                    if (menuItemEl) menuItemEl.classList.remove('active');
                });
                el.classList.add('active');
                switchTab(item.id);
                if (item.id === 'menu-item-about') {
                    if (avatarCard) avatarCard.classList.remove('hidden');
                    if (catWrapper) catWrapper.classList.add('active');
                }
            });
        }
    });


    /* DESIGN LIBRARY WINDOW */
    const folderDesignBtn = document.getElementById('folder-design-btn');
    const windowDesign = document.getElementById('window-design');
    const btnCloseDesign = document.getElementById('btn-close-design');
    const menuStarIcon = document.getElementById('menu-star-icon');
    const designGridArea = document.getElementById('design-grid-area');

    const designProducts = [
        { sub: 'poster', tag: 'Poster', title: 'To Her With Every Bloom', img: './assets/social-6.png' },
        { sub: 'poster', tag: 'Poster', title: 'Tasty of Stillness', img: './assets/social-7.png' },
        { sub: 'poster', tag: 'Poster', title: 'La Pergolata - Flavors of Italy', type: 'video', img: './assets/social-8.png', src: './assets/social-8.mp4' },
        { sub: 'poster', tag: 'Poster', title: 'VLU - Khối ngành nghệ thuật', img: './assets/nghethuat.png' },
        { sub: 'poster', tag: 'KV', title: 'SGC Backdrop Design', img: './assets/sgc.jpg' },
        { sub: 'poster', tag: 'Backdrop', title: 'VLU - TCNH', img: './assets/tcnh.jpg' },
        { sub: 'poster', tag: 'KV', title: 'Frasers', img: './assets/FRASERS.jpg' },

        { sub: 'social', tag: 'Social', title: 'LazadaRun - Early Bird', img: './assets/social-1.png' },
        { sub: 'social', tag: 'Social', title: 'LazadaRun - Cảm ơn đối tác', img: './assets/social-2.png' },
        { sub: 'social', tag: 'Social', title: 'LazadaRun - Mini game', img: './assets/social-3.png' },
        { sub: 'social', tag: 'Social', title: 'Lazada sale', img: './assets/social-4.png' },
        { sub: 'social', tag: 'Social', title: 'VLU - social post', img: './assets/social-5.png' },
        { sub: 'social', tag: 'Social', title: 'Shaishaishai', img: './assets/shaishaishai.jpg' },
        { sub: 'social', tag: 'Social', title: 'Comencement 2026', img: './assets/Comencement2026.png' },
        { sub: 'social', tag: 'Social', title: 'Sonaire Social', img: './assets/SONAIRE.png' },
        { sub: 'social', tag: 'Social', title: '1970s', img: './assets/1970s.jpg' },

        { sub: 'web', tag: 'Web', title: 'Người Việt Nam Photobooth', type: 'video', img: './assets/photobooth.png', src: './assets/photobooth.mp4', url: 'https://voxuanthuy121212-ui.github.io/NGUOIVIETNAMPHOTOBOOTH/' },
        { sub: 'web', tag: 'Landing page', title: 'VLU - Nghê Thường Vũ Y Landing Page', img: './assets/nghethuongvuy1.jpg', isLandingScroll: true, images: ['./assets/nghethuongvuy1.jpg', './assets/nghethuongvuy2.jpg'] },
        { sub: 'web', tag: 'Landing page', title: 'VLU - Hướng Nghiệp', img: './assets/huongnghiep.png', isLandingScroll: true, images: ['./assets/huongnghiep.png'] },

        { sub: 'posm', tag: 'Brochure', title: 'VLU - Brochure PR', img: './assets/pr-2.png', isGrid: true, images: ['./assets/pr-1.png', './assets/pr-2.png', './assets/pr-3.png', './assets/pr-4.png', './assets/pr-5.png', './assets/pr-6.png', './assets/pr-7.png', './assets/pr-8.png', './assets/pr-9.png', './assets/pr-10.png'] },
        { sub: 'posm', tag: 'Booth', title: 'Booth PDU 1', img: './assets/booth-2d-1.png' },
        { sub: 'posm', tag: 'Booth', title: 'Booth PDU 2', img: './assets/booth-2d-2.jpg' },

        { sub: 'branding', tag: 'Logo', title: 'Labelle Logo', img: './assets/Labelle.jpg', isLandingScroll: true, images: ['./assets/Labelle.jpg'] },
        { sub: 'branding', tag: 'Logo', title: 'Health & Beauty Logo', img: './assets/health&beauty.png', isLandingScroll: true, images: ['./assets/health&beauty.png'] },
        { sub: 'branding', tag: 'Logo', title: 'Orchid', img: './assets/ORCHID-01.png', isGrid: true, images: ['./assets/ORCHID-01.png', './assets/ORCHID-02.png', './assets/ORCHID-03.png', './assets/ORCHID-04.png', './assets/ORCHID-05.png', './assets/ORCHID-06.png', './assets/ORCHID-07.png', './assets/ORCHID-08.png', './assets/ORCHID-09.png', './assets/ORCHID-10.png'] },

        { sub: '3d', tag: 'Motion', title: 'Lazada Hot deals', type: 'video', img: './assets/vỗngayhotdeals.png', src: './assets/vỗngayhotdeals.mp4' },
        { sub: '3d', tag: '2D animation', title: 'Tán Pháo', type: 'video', img: './assets/thumbtanphao.png', src: './assets/tanphao.mp4' },
        { sub: '3d', tag: '3D', title: 'VLU - Leaflet - 3D mockup', img: './assets/leaflet-mockup.png' },
        { sub: '3d', tag: '3D', title: 'VLU - Discovery 2026 - 3D mockup', img: './assets/booth-3d.png' },
        { sub: '3d', tag: '3D', title: '3D Project 01', img: './assets/3D-1.jpg' },
        { sub: '3d', tag: '3D', title: '3D Project 02', img: './assets/3D-2.jpg' },
        { sub: '3d', tag: 'Motion', title: 'shaishaishai 01', type: 'video', img: './assets/shaishaisshai1.png', src: './assets/shaishaisshai1.mp4' },
        { sub: '3d', tag: 'Motion', title: 'shaishaishai 02', type: 'video', img: './assets/shaishaisshai2.png', src: './assets/shaishaisshai2.mp4' },
        { sub: '3d', tag: '3D', title: '3D Project 03', img: './assets/3D-3.png' },
        { sub: '3d', tag: '3D', title: '3D Project 04', img: './assets/3D-4.jpg' }
    ];

    let currentFilteredList = [];
    let currentModalIndex = 0;

    const starPositions = {
        'poster':   '209px',
        'social':   '256px',
        'web':      '302px',
        'posm':     '349px',
        'branding': '395px',
        '3d':       '441px'
    };

    function renderDesignProducts(filterSub) {
        designGridArea.innerHTML = '';
        currentFilteredList = designProducts.filter(item => item.sub === filterSub);

        currentFilteredList.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const playIconHTML = item.type === 'video' ? '<div class="play-icon">▶</div>' : '';

            card.innerHTML = `
                <div class="thumbnail-container">
                    <img src="${item.img}" alt="${item.title}" class="product-thumbnail" loading="lazy">
                    ${playIconHTML}
                </div>
                <div class="product-info">
                    <div class="product-title">${item.title}</div>
                    <div class="product-category-tag">${item.tag}</div>
                </div>
            `;
            card.addEventListener('click', () => { openMediaModal(index); });
            designGridArea.appendChild(card);
        });
    }


    /* ILLUSTRATION LIBRARY WINDOW */
    const folderIllustrationBtn = document.getElementById('folder-illustration-btn');
    const windowIllustration = document.getElementById('window-illustration');
    const btnCloseIllustration = document.getElementById('btn-close-illustration');
    const illMenuStarIcon = document.getElementById('ill-menu-star-icon');
    const illustrationGridArea = document.getElementById('illustration-grid-area');

    const illustrationProducts = [
        { sub: 'digital', tag: 'Digital', title: 'Illustrator', img: './assets/1.jpg' },
        { sub: 'digital', tag: 'Digital', title: 'Illustrator', img: './assets/2.png' },
        { sub: 'digital', tag: 'Digital', title: 'Photoshop', img: './assets/1-1.png' },
        { sub: 'digital', tag: 'Digital', title: 'Procreate', img: './assets/2-1.jpg' },
        { sub: 'digital', tag: 'Digital', title: 'Photoshop', img: './assets/3-1.jpg' },
        { sub: 'digital', tag: 'Digital', title: 'Photoshop', img: './assets/4-1.png' },
        { sub: 'digital', tag: 'Digital', title: 'Illustrator', img: './assets/3.png' },
        { sub: 'digital', tag: 'Digital', title: 'Illustrator', img: './assets/4.png' },
        { sub: 'digital', tag: 'Digital', title: 'Photoshop', img: './assets/8.jpg' },
        { sub: 'digital', tag: 'Digital', title: 'Photoshop', img: './assets/6.png' },

        { sub: 'traditional', tag: 'Traditional', title: 'Gouache', img: './assets/gouache1.jpeg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Gouache', img: './assets/gouache2.jpeg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Gouache', img: './assets/gouache4.jpeg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Gouache', img: './assets/gouache6.jpeg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Gouache', img: './assets/gouache5.jpeg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi1.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi2.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi3.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi4.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi5.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi6.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi8.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi9.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi10.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi12.jpg' },
        { sub: 'traditional', tag: 'Traditional', title: 'Soft oil pastels', img: './assets/tradi13.jpg' }
    ];

    let currentIllFilteredList = [];
    const illStarPositions = { 'digital': '209px', 'traditional': '256px' };

    function renderIllustrationProducts(filterSub) {
        illustrationGridArea.innerHTML = '';
        currentIllFilteredList = illustrationProducts.filter(item => item.sub === filterSub);

        currentIllFilteredList.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="thumbnail-container"><img src="${item.img}" alt="${item.title}" class="product-thumbnail" loading="lazy"></div>
                <div class="product-info"><div class="product-title">${item.title}</div><div class="product-category-tag">${item.tag}</div></div>
            `;
            card.addEventListener('click', () => { currentFilteredList = currentIllFilteredList; openMediaModal(index); });
            illustrationGridArea.appendChild(card);
        });
    }

    if (folderIllustrationBtn && windowIllustration) {
        folderIllustrationBtn.addEventListener('click', () => {
            windowIllustration.classList.add('active');
            updateDesktopTopbarState();
            activateIllMenu('digital'); 
        });
    }

    if (btnCloseIllustration && windowIllustration) {
        btnCloseIllustration.addEventListener('click', (e) => {
            e.stopPropagation();
            windowIllustration.classList.remove('active');
            updateDesktopTopbarState();
        });
    }

    function activateIllMenu(filterType) {
        document.querySelectorAll('.ill-sub-cat-item').forEach(el => el.classList.remove('active'));
        const targetEl = document.querySelector(`[data-filter="${filterType}"]`);
        if (targetEl) targetEl.classList.add('active');
        if (illMenuStarIcon && illStarPositions[filterType]) {
            illMenuStarIcon.style.top = illStarPositions[filterType];
            illMenuStarIcon.style.display = 'block';
        }
        renderIllustrationProducts(filterType);
    }

    document.querySelectorAll('.ill-sub-cat-item').forEach(sub => {
        sub.addEventListener('click', (e) => {
            e.stopPropagation();
            activateIllMenu(sub.getAttribute('data-filter'));
        });
    });


    /* PHOTOGRAPHY LIBRARY WINDOW */
    const folderPhotographyBtn = document.getElementById('folder-photography-btn');
    const windowPhotography = document.getElementById('window-photography');
    const btnClosePhotography = document.getElementById('btn-close-photography');
    const photoMenuStarIcon = document.getElementById('photo-menu-star-icon');
    const photographyGridArea = document.getElementById('photography-grid-area');

    const photographyProducts = [
        { sub: 'personal', tag: 'Personal', title: 'Phuong Nguyen', img: './assets/phuongnguyenthumb.jpg', fullImg: './assets/phuongnguyen.png' },
        { sub: 'personal', tag: 'Personal', title: 'Dung & Phuoc', img: './assets/dungphuocthumb.jpg', fullImg: './assets/dungphuoc.png' },
        { sub: 'personal', tag: 'Personal', title: 'Huong & Man', img: './assets/huongman.jpg', fullImg: './assets/huongman.png' },
        { sub: 'personal', tag: 'Personal', title: 'Danny', img: './assets/dannythumb.jpg', fullImg: './assets/danny.png' },

        { sub: 'ai', tag: 'AI', title: '01', img: './assets/ai1.jpg' },
        { sub: 'ai', tag: 'AI', title: '02', img: './assets/ai2.jpg' },
        { sub: 'ai', tag: 'AI', title: '03', img: './assets/ai3.jpg' },
        { sub: 'ai', tag: 'AI', title: '04', img: './assets/ai4.jpg' },
        { sub: 'ai', tag: 'AI', title: '05', img: './assets/ai5.jpg' },
        { sub: 'ai', tag: 'AI', title: '06', img: './assets/ai6.jpg' },
        { sub: 'ai', tag: 'AI', title: '07', img: './assets/ai7.jpg' },
        { sub: 'ai', tag: 'AI', title: '08', img: './assets/ai8.jpg' }
    ];

    let currentPhotoFilteredList = [];
    const photoStarPositions = {
        'personal': '215px',
        'event':    '265px',
        'ai':       '315px'
    };

    function renderPhotographyProducts(filterSub) {
        photographyGridArea.innerHTML = '';
        currentPhotoFilteredList = photographyProducts.filter(item => item.sub === filterSub);

        currentPhotoFilteredList.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="thumbnail-container"><img src="${item.img}" alt="${item.title}" class="product-thumbnail" loading="lazy"></div>
                <div class="product-info"><div class="product-title">${item.title}</div><div class="product-category-tag">${item.tag}</div></div>
            `;
            card.addEventListener('click', () => { currentFilteredList = currentPhotoFilteredList; openMediaModal(index); });
            photographyGridArea.appendChild(card);
        });
    }

    if (folderPhotographyBtn && windowPhotography) {
        folderPhotographyBtn.addEventListener('click', () => {
            windowPhotography.classList.add('active');
            updateDesktopTopbarState();
            activatePhotoMenu('personal');
        });
    }

    if (btnClosePhotography && windowPhotography) {
        btnClosePhotography.addEventListener('click', (e) => {
            e.stopPropagation();
            windowPhotography.classList.remove('active');
            updateDesktopTopbarState();
        });
    }

    function activatePhotoMenu(filterType) {
        document.querySelectorAll('.photo-sub-cat-item').forEach(el => el.classList.remove('active'));
        const targetEl = document.querySelector(`[data-filter="${filterType}"]`);
        if (targetEl) targetEl.classList.add('active');
        if (photoMenuStarIcon && photoStarPositions[filterType]) {
            photoMenuStarIcon.style.top = photoStarPositions[filterType];
            photoMenuStarIcon.style.display = 'block';
        }
        renderPhotographyProducts(filterType);
    }

    document.querySelectorAll('.photo-sub-cat-item').forEach(sub => {
        sub.addEventListener('click', (e) => {
            e.stopPropagation();
            activatePhotoMenu(sub.getAttribute('data-filter'));
        });
    });


    /* MODAL */
    const modal = document.getElementById('imageModal');
    const modalBodyContainer = document.getElementById('modalBodyContainer');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    const modalPrevBtn = document.getElementById('modalPrevBtn');
    const modalNextBtn = document.getElementById('modalNextBtn');

    function openMediaModal(index) {
        currentModalIndex = index;
        const item = currentFilteredList[index];
        if (!item) return;

        const displayImgSource = item.fullImg || item.img;

        if (item.type === 'video') {
            let webLinkBar = item.url ? `<div style="margin-bottom: 12px; background: rgba(255, 255, 255, 0.2); padding: 6px 18px; border-radius: 20px; display: flex; align-items: center; gap: 10px; backdrop-filter: blur(10px); z-index: 1020;"><span style="color: #fff; font-size: 13px;">Trải nghiệm bản web:</span><a href="${item.url}" target="_blank" style="color: #61dafb; font-size: 13px; text-decoration: underline; font-weight: 500;">${item.url} ↗</a></div>` : '';
            modalBodyContainer.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">${webLinkBar}<video controls autoplay style="max-width: 80vw; max-height: 75vh; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);"><source src="${item.src}" type="video/mp4"></video></div>`;
        } else if (item.isGrid && item.images) {
            let gridHTML = item.images.map((src, idx) => `<div class="modal-grid-item"><img src="${src}" alt="${item.title} - Trang ${idx + 1}" loading="lazy"></div>`).join('');
            modalBodyContainer.innerHTML = `<div class="modal-grid-container">${gridHTML}</div>`;
            modalCaption.textContent = `${item.title} (Hiển thị toàn bộ ${item.images.length} ảnh) — (${item.tag})`;
        } else if (item.isLandingScroll && item.images) {
            modalBodyContainer.innerHTML = item.images.map(src => `<img src="${src}" class="landing-artwork" alt="${item.title}" loading="lazy">`).join('');
            setTimeout(() => { modalBodyContainer.scrollTo({ top: 120, behavior: 'smooth' }); }, 300);
        } else {
            modalBodyContainer.innerHTML = `<img src="${displayImgSource}" class="single-artwork" alt="${item.title}" loading="lazy">`;
            modalBodyContainer.scrollTop = 0;
        }
        
        if (!item.isGrid) modalCaption.textContent = `${item.title} — (${item.tag})`;
        modal.style.display = 'flex';
    }

    function closeModalWindow() {
        const activeVideo = modalBodyContainer.querySelector('video');
        if (activeVideo) { activeVideo.pause(); activeVideo.currentTime = 0; }
        modalBodyContainer.innerHTML = '';
        modal.style.display = 'none';
    }

    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentModalIndex = (currentModalIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
            openMediaModal(currentModalIndex);
        });
    }

    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentModalIndex = (currentModalIndex + 1) % currentFilteredList.length;
            openMediaModal(currentModalIndex);
        });
    }

    if (closeModal) closeModal.addEventListener('click', closeModalWindow);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModalWindow(); });


    /* DESIGN WINDOW */
    if (folderDesignBtn && windowDesign) {
        folderDesignBtn.addEventListener('click', () => {
            windowDesign.classList.add('active');
            updateDesktopTopbarState();
            activateMenu('poster'); 
        });
    }

    if (btnCloseDesign && windowDesign) {
        btnCloseDesign.addEventListener('click', (e) => {
            e.stopPropagation();
            windowDesign.classList.remove('active');
            updateDesktopTopbarState();
        });
    }

    function activateMenu(filterType) {
        document.querySelectorAll('.sub-cat-item').forEach(el => el.classList.remove('active'));
        const targetEl = document.querySelector(`[data-filter="${filterType}"]`);
        if (targetEl) targetEl.classList.add('active');
        if (menuStarIcon && starPositions[filterType]) {
            menuStarIcon.style.top = starPositions[filterType];
            menuStarIcon.style.display = 'block';
        }
        renderDesignProducts(filterType);
    }

    document.querySelectorAll('.sub-cat-item').forEach(sub => {
        sub.addEventListener('click', (e) => {
            e.stopPropagation();
            activateMenu(sub.getAttribute('data-filter'));
        });
    });

});