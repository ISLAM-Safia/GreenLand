const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');
const menuIcon = menuBtn.querySelector('i');

// التحكم في زر القائمة
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navigation.classList.toggle('active');

    // تبديل الأيقونة بين القائمة "bx-menu-alt-right" وأيقونة "bx-x"
    if (menuIcon.classList.contains('bx-menu-alt-right')) {
        menuIcon.classList.remove('bx-menu-alt-right');
        menuIcon.classList.add('bx-x');
    } else {
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu-alt-right');
    }
});

// التحكم في السلايدر
const btns = document.querySelectorAll('.nav-btn');
const slides = document.querySelectorAll('.video-slide');
const contents = document.querySelectorAll('.content');
const videos = Array.from(document.querySelectorAll('.video-slide')); // تحويل الفيديوهات إلى مصفوفة

let currentIndex = 0;

// دالة لتحريك السلايدر يدوياً
const sliderNav = (manual) => {
    btns.forEach((btn) => btn.classList.remove('active'));
    slides.forEach((slide) => slide.classList.remove('active'));
    contents.forEach((content) => content.classList.remove('active'));

    btns[manual].classList.add('active');
    slides[manual].classList.add('active');
    contents[manual].classList.add('active');
}

// التحكم في السلايدر عند النقر على الأزرار
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        sliderNav(i);
        currentIndex = i; // تحديث الفهرس الحالي عند النقر
        videos[currentIndex]?.play(); // تشغيل الفيديو الحالي
    });
});

// تغيير الفيديو تلقائيًا عند انتهاء الفيديو
const handleVideoEnd = () => {
    currentIndex = (currentIndex + 1) % videos.length; // الانتقال إلى الفيديو التالي
    sliderNav(currentIndex);
    videos[currentIndex]?.play(); // تشغيل الفيديو التالي تلقائيًا
}

// إضافة حدث نهاية الفيديو لكل فيديو
videos.forEach((video) => {
    video.addEventListener('ended', handleVideoEnd);
});

// تشغيل الفيديو الأول عند تحميل الصفحة
window.addEventListener('load', () => {
    sliderNav(0); // تعيين الفيديو الأول ليظهر
    videos[0]?.play(); // تشغيل الفيديو الأول
});
