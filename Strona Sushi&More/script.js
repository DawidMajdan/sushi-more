const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const menuItems = {
  bestsellery: [['Paradise Sushi&More', 'Krewetka · tatar z łososia · awokado', '58 zł', 'zdjecia/instagram-facebook/zdj1.jpg', 'POLECAMY'], ['Cali Shake Avocado', 'Serek · łosoś · ogórek · awokado', '35 zł', 'zdjecia/instagram-facebook/zdj5.jpg', 'HIT'], ['Zestaw Surowy Mini', '36 sztuk · pałeczki · sos sojowy', '100 zł', 'zdjecia/instagram-facebook/zdj10.jpg', 'ZESTAWY']],
  rolki: [['Paradise Ebi Ten Mango', 'Krewetka panko · mango · kawior', '48 zł', 'zdjecia/instagram-facebook/zdj15.jpg', 'PARADISE'], ['Futo Shake Avocado', 'Sałata · łosoś · awokado', '34 zł', 'zdjecia/instagram-facebook/zdj12.jpg', 'FUTOMAKI'], ['Cali Manguro Grill', 'Tuńczyk grill · ogórek · spicy mayo', '37 zł', 'zdjecia/instagram-facebook/zdj14.jpg', 'URAMAKI']],
  zestawy: [['Zestaw Surowy Mini', '36 sztuk · pałeczki · sos sojowy', '100 zł', 'zdjecia/instagram-facebook/zdj10.jpg', '36 SZT.'], ['Zestaw Surowy Medium', '80 sztuk · sosy · imbir · wasabi', '250 zł', 'zdjecia/instagram-facebook/zdj1.jpg', '80 SZT.'], ['Zestaw Surowy Maxi', '102 sztuki · pełny zestaw dodatków', '410 zł', 'zdjecia/instagram-facebook/zdj5.jpg', '102 SZT.']],
  vege: [['Cali Vege', 'Ogórek · tykwa · oshinko', '26 zł', 'zdjecia/instagram-facebook/zdj12.jpg', 'VEGE'], ['Futo Vege', 'Sałata · ogórek · tykwa · oshinko', '25 zł', 'zdjecia/instagram-facebook/zdj10.jpg', 'VEGE'], ['Cali SunFlower', 'Warzywa tempura · ogórek · słonecznik', '28 zł', 'zdjecia/instagram-facebook/zdj14.jpg', 'VEGE']]
};
const productCards = [...document.querySelectorAll('.product-card')];
function renderProducts(category) {
  menuItems[category].forEach((item, index) => {
    const card = productCards[index];
    card.querySelector('.product-image').style.backgroundImage = `url("${item[3]}")`;
    card.querySelector('.tag').textContent = item[4];
    card.querySelector('h3').textContent = item[0];
    card.querySelector('.product-info p').textContent = item[1];
    card.querySelector('.product-info b').textContent = item[2];
  });
}
document.querySelectorAll('.menu-tabs button').forEach(tab => tab.addEventListener('click', () => {
  document.querySelector('.menu-tabs .selected').classList.remove('selected');
  tab.classList.add('selected');
  renderProducts(tab.dataset.category);
}));

const menuPages = [...document.querySelectorAll('.menu-pages a')];
const pageCount = document.querySelector('.page-count');
const perPage = 6;
let currentPage = 0;
const pages = Math.ceil(menuPages.length / perPage);
function renderMenuPage() {
  menuPages.forEach((item, index) => item.hidden = Math.floor(index / perPage) !== currentPage);
  pageCount.textContent = `${currentPage + 1} / ${pages}`;
  document.querySelector('[data-page-dir="prev"]').disabled = currentPage === 0;
  document.querySelector('[data-page-dir="next"]').disabled = currentPage === pages - 1;
}
document.querySelectorAll('[data-page-dir]').forEach(button => button.addEventListener('click', () => {
  currentPage += button.dataset.pageDir === 'next' ? 1 : -1;
  renderMenuPage();
  document.querySelector('.menu-pages').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}));
renderMenuPage();

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('sushi-more-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.setAttribute('aria-pressed', 'true');
  themeToggle.setAttribute('aria-label', 'Włącz jasny motyw');
}
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw');
  localStorage.setItem('sushi-more-theme', isDark ? 'dark' : 'light');
});

const faqItems = [...document.querySelectorAll('[data-faq-page]')];
const faqCount = document.querySelector('.faq-count');
let faqPage = 0;
function renderFaqPage() {
  faqItems.forEach(item => item.hidden = Number(item.dataset.faqPage) !== faqPage);
  faqCount.textContent = `${faqPage + 1} / 2`;
  document.querySelector('[data-faq-dir="prev"]').disabled = faqPage === 0;
  document.querySelector('[data-faq-dir="next"]').disabled = faqPage === 1;
}
document.querySelectorAll('[data-faq-dir]').forEach(button => button.addEventListener('click', () => {
  faqPage += button.dataset.faqDir === 'next' ? 1 : -1;
  renderFaqPage();
}));
renderFaqPage();

const imageModal = document.querySelector('.image-modal');
const modalImage = document.querySelector('.modal-image');
const modalClose = document.querySelector('.modal-close');
document.querySelectorAll('.menu-pages a').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const image = link.querySelector('img');
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  imageModal.classList.add('open');
  imageModal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}));
function closeMenuPreview() {
  imageModal.classList.remove('open');
  imageModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
modalClose.addEventListener('click', closeMenuPreview);
imageModal.addEventListener('click', event => { if (event.target === imageModal) closeMenuPreview(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && imageModal.classList.contains('open')) closeMenuPreview(); });
