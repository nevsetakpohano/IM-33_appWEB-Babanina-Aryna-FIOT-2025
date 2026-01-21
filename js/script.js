document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    function initApp() {
        if (document.getElementById('library-section')) {
            setupNavigation();
            setupForms();
            setupBurgerMenu(); 
            loadGenres();
            showLibrary();
            console.log('BookShelf додаток завантажено успішно!');
        } else if (window.location.pathname.includes('about.html')) {
            console.log('Сторінка "Про проект" завантажена');
        }
    }
    
    function setupBurgerMenu() {
        const burgerMenu = document.getElementById('burger-menu');
        const mainNav = document.getElementById('main-nav');
        
        if (!burgerMenu || !mainNav) return;
        
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation(); 
            mainNav.classList.toggle('active');
            
            if (mainNav.classList.contains('active')) {
                this.textContent = '✕';
                this.setAttribute('aria-label', 'Закрити меню');
            } else {
                this.textContent = '☰';
                this.setAttribute('aria-label', 'Відкрити меню');
            }
        });
        
        document.querySelectorAll('.nav-link, .nav-item button').forEach(item => {
            item.addEventListener('click', () => {
                closeBurgerMenu();
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !burgerMenu.contains(e.target)) {
                closeBurgerMenu();
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeBurgerMenu();
            }
        });
        
        function closeBurgerMenu() {
            mainNav.classList.remove('active');
            burgerMenu.textContent = '☰';
            burgerMenu.setAttribute('aria-label', 'Відкрити меню');
        }
    }
    
    function setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-item button');
        const sections = document.querySelectorAll('.page-section');
        const mainNav = document.getElementById('main-nav');
        const burgerMenu = document.getElementById('burger-menu');
        
        function switchSection(sectionId) {
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            const activeSection = document.getElementById(sectionId + '-section');
            if (activeSection) {
                activeSection.classList.add('active');
            }
            
            if (window.innerWidth <= 768 && mainNav && burgerMenu) {
                mainNav.classList.remove('active');
                burgerMenu.textContent = '☰';
                burgerMenu.setAttribute('aria-label', 'Відкрити меню');
            }
        }
        
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                switchSection(page);
            });
        });
    }
    
    function setupForms() {
        const addBookForm = document.getElementById('add-book-form');
        const searchForm = document.getElementById('search-form');
        const filterForm = document.getElementById('filter-form');
        
        if (addBookForm) {
            addBookForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Функція додавання книги буде реалізована в наступних лабораторних!');
                this.reset();
            });
        }
        
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Функція пошуку буде реалізована в наступних лабораторних!');
            });
        }
        
        if (filterForm) {
            filterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Фільтрація буде реалізована в наступних лабораторних!');
            });
        }
    }
    
    function loadGenres() {
        const genres = [
            'Фентезі',
            'Детектив',
            'Роман',
            'Наукова фантастика',
            'Біографія',
            'Історичний роман',
            'Пригоди',
            'Наукова література',
            'Поезія',
            'Драма'
        ];
        
        const genreSelects = [
            document.getElementById('book-genre'),
            document.getElementById('filter-genre')
        ];
        
        genreSelects.forEach(select => {
            if (select) {
                while (select.options.length > 1) {
                    select.remove(1);
                }
                
                genres.forEach(genre => {
                    const option = document.createElement('option');
                    option.value = genre.toLowerCase();
                    option.textContent = genre;
                    select.appendChild(option);
                });
            }
        });
    }
    
    function showLibrary() {
        const booksTableBody = document.getElementById('books-table-body');
        const statsList = document.getElementById('stats-list');
        
        if (booksTableBody) {
            booksTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <h3>📚 Бібліотека порожня</h3>
                        <p>Додайте свою першу книгу, натиснувши кнопку "Додати книгу"</p>
                        <p><em>Функціонал буде доступний після реалізації JavaScript</em></p>
                    </td>
                </tr>
            `;
        }
        
        if (statsList) {
            statsList.innerHTML = `
                <li>Всього книг: <strong>0</strong></li>
                <li>Найпопулярніший жанр: <strong>—</strong></li>
                <li>Середній рік видання: <strong>—</strong></li>
                <li>Кількість авторів: <strong>0</strong></li>
            `;
        }
    }
    
    window.BookShelf = {
        books: [],
        genres: [],
        currentFilter: null,
        
        addBook: function(book) {
            console.log('Метод addBook буде реалізований');
        },
        
        searchBooks: function(query) {
            console.log('Метод searchBooks буде реалізований');
        },
        
        filterBooks: function(genre) {
            console.log('Метод filterBooks буде реалізований');
        },
        
        getStatistics: function() {
            console.log('Метод getStatistics буде реалізований');
            return {};
        }
    };
});






function setupViewSwitcher() {
    const switchBtn = document.getElementById('switch-view-btn');
    const tableView = document.getElementById('library-table-container');
    const gridView = document.getElementById('books-grid-container');
    
    if (!switchBtn || !tableView || !gridView) return;
    
    switchBtn.addEventListener('click', function() {
        if (tableView.style.display !== 'none') {
            tableView.style.display = 'none';
            gridView.style.display = 'grid';
            this.textContent = '📊 Перемкнути на табличний вигляд';
            
            if (gridView.children.length === 0) {
                createDemoBookCards(gridView);
            }
            
            setTimeout(() => {
                gridView.classList.add('active');
            }, 10);
        } else {
            gridView.classList.remove('active');
            setTimeout(() => {
                gridView.style.display = 'none';
                tableView.style.display = 'block';
                this.textContent = '📱 Перемкнути на картковий вигляд';
            }, 300);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    function initApp() {
        if (document.getElementById('library-section')) {
            setupNavigation();
            setupForms();
            setupBurgerMenu();
            setupViewSwitcher(); 
            loadGenres();
            showLibrary();
            createDemoCards();
            console.log('BookShelf додаток завантажено успішно!');
        } else if (window.location.pathname.includes('about.html')) {
            console.log('Сторінка "Про проект" завантажена');
        }
    }
    
    function createDemoCards() {
        const gridContainer = document.getElementById('books-grid-container');
        if (!gridContainer) return;
        
        const demoBooks = [
            {
                id: 1,
                title: "Гаррі Поттер і філософський камінь",
                author: "Дж. К. Роулінг",
                genre: "Фентезі",
                year: 1997,
                description: "Перша книга серії про юного чарівника Гаррі Поттера, який дізнається, що є чарівником і відправляється до школи чарів і чаклунства Хогвартс."
            },
            {
                id: 2,
                title: "Володар перснів",
                author: "Дж. Р. Р. Толкін",
                genre: "Фентезі",
                year: 1954,
                description: "Епічна фентезійна трилогія про боротьбу добра зі злом у вигаданому світі Середзем'я."
            },
            {
                id: 3,
                title: "1984",
                author: "Джордж Орвелл",
                genre: "Антиутопія",
                year: 1949,
                description: "Роман про тоталітарне суспільство, де кожна думка та дія знаходяться під постійним контролем."
            },
            {
                id: 4,
                title: "Маленький принц",
                author: "Антуан де Сент-Екзюпері",
                genre: "Філософська казка",
                year: 1943,
                description: "Філософська казка про дитинство, дружбу, любов та справжні людські цінності."
            },
            {
                id: 5,
                title: "Злочин і кара",
                author: "Федір Достоєвський",
                genre: "Психологічний роман",
                year: 1866,
                description: "Роман про моральні муки студента Раскольнікова, який вчинив убивство і намагається виправдати свій вчинок."
            },
            {
                id: 6,
                title: "Гордість і упередження",
                author: "Джейн Остін",
                genre: "Роман",
                year: 1813,
                description: "Класичний роман про любов та соціальні відносини в англійському суспільстві початку XIX століття."
            }
        ];
        
        gridContainer.innerHTML = '';
        
        demoBooks.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            
            card.innerHTML = `
                <div class="book-card-header">
                    <div class="book-id">ID: ${book.id}</div>
                    <h3 class="book-card-title">${book.title}</h3>
                    <p class="book-card-author">${book.author}</p>
                </div>
                <div class="book-card-content">
                    <div class="book-meta">
                        <span class="book-genre">${book.genre}</span>
                        <span class="book-year">${book.year}</span>
                    </div>
                    <p class="book-description">${book.description}</p>
                    <div class="book-actions">
                        <button class="book-action-btn" onclick="viewBook(${book.id})">👁️ Переглянути</button>
                        <button class="book-action-btn" onclick="editBook(${book.id})">✏️ Редагувати</button>
                    </div>
                </div>
            `;
            
            gridContainer.appendChild(card);
        });
    }
    
    function setupViewSwitcher() {
        const switchBtn = document.getElementById('switch-view-btn');
        const tableView = document.getElementById('library-table-container');
        const gridView = document.getElementById('books-grid-container');
        
        if (!switchBtn || !tableView || !gridView) {
            console.error('Не знайдено елементів для перемикання вигляду');
            return;
        }
        
        gridView.classList.remove('active');
        
        switchBtn.addEventListener('click', function() {
            const isTableViewVisible = tableView.style.display !== 'none';
            
            if (isTableViewVisible) {
                tableView.style.display = 'none';
                gridView.style.display = 'grid';
                
                setTimeout(() => {
                    gridView.classList.add('active');
                }, 10);
                
                this.innerHTML = '📊 Перемкнути на табличний вигляд';
                this.style.background = '#2c3e50';
                
            } else {
                gridView.classList.remove('active');
                
                setTimeout(() => {
                    gridView.style.display = 'none';
                    tableView.style.display = 'block';
                    this.innerHTML = '📱 Перемкнути на картковий вигляд';
                    this.style.background = '#4a6491';
                }, 300);
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    window.viewBook = function(bookId) {
        alert(`Перегляд книги з ID: ${bookId}\nЦя функція буде реалізована повністю в наступних лабораторних!`);
    };
    
    window.editBook = function(bookId) {
        alert(`Редагування книги з ID: ${bookId}\nЦя функція буде реалізована повністю в наступних лабораторних!`);
    };
    
    function setupBurgerMenu() {
        const burgerMenu = document.getElementById('burger-menu');
        const mainNav = document.getElementById('main-nav');
        
        if (!burgerMenu || !mainNav) return;
        
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            
            if (mainNav.classList.contains('active')) {
                this.textContent = '✕';
                this.setAttribute('aria-label', 'Закрити меню');
            } else {
                this.textContent = '☰';
                this.setAttribute('aria-label', 'Відкрити меню');
            }
        });
        
        document.querySelectorAll('.nav-link, .nav-item button').forEach(item => {
            item.addEventListener('click', () => {
                mainNav.classList.remove('active');
                burgerMenu.textContent = '☰';
                burgerMenu.setAttribute('aria-label', 'Відкрити меню');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !burgerMenu.contains(e.target)) {
                mainNav.classList.remove('active');
                burgerMenu.textContent = '☰';
                burgerMenu.setAttribute('aria-label', 'Відкрити меню');
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
                burgerMenu.textContent = '☰';
                burgerMenu.setAttribute('aria-label', 'Відкрити меню');
            }
        });
    }
    
    function setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-item button');
        const sections = document.querySelectorAll('.page-section');
        
        function switchSection(sectionId) {
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            const activeSection = document.getElementById(sectionId + '-section');
            if (activeSection) {
                activeSection.classList.add('active');
            }
        }
        
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                switchSection(page);
            });
        });
    }
    
    function setupForms() {
        const addBookForm = document.getElementById('add-book-form');
        const searchForm = document.getElementById('search-form');
        const filterForm = document.getElementById('filter-form');
        
        if (addBookForm) {
            addBookForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Функція додавання книги буде реалізована в наступних лабораторних!');
                this.reset();
            });
        }
        
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Функція пошуку буде реалізована в наступних лабораторних!');
            });
        }
        
        if (filterForm) {
            filterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Фільтрація буде реалізована в наступних лабораторних!');
            });
        }
    }
    
    function loadGenres() {
        const genres = [
            'Фентезі',
            'Детектив',
            'Роман',
            'Наукова фантастика',
            'Біографія',
            'Історичний роман',
            'Пригоди',
            'Наукова література',
            'Поезія',
            'Драма'
        ];
        
        const genreSelects = [
            document.getElementById('book-genre'),
            document.getElementById('filter-genre')
        ];
        
        genreSelects.forEach(select => {
            if (select) {
                while (select.options.length > 1) {
                    select.remove(1);
                }
                
                genres.forEach(genre => {
                    const option = document.createElement('option');
                    option.value = genre.toLowerCase();
                    option.textContent = genre;
                    select.appendChild(option);
                });
            }
        });
    }
    
    function showLibrary() {
        const booksTableBody = document.getElementById('books-table-body');
        const statsList = document.getElementById('stats-list');
        
        if (booksTableBody) {
            booksTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <h3>📚 Бібліотека порожня</h3>
                        <p>Додайте свою першу книгу, натиснувши кнопку "Додати книгу"</p>
                        <p><em>Функціонал буде доступний після реалізації JavaScript</em></p>
                    </td>
                </tr>
            `;
        }
        
        if (statsList) {
            statsList.innerHTML = `
                <li>Загальна кількість книг: <strong>6</strong></li>
                <li>Кількість жанрів: <strong>5</strong></li>
                <li>Найдавніша книга: <strong>1954 (Володар перснів)</strong></li>
                <li>Найновіша книга: <strong>1997 (Гаррі Поттер)</strong></li>
            `;
        }
    }
    
    window.BookShelf = {
        books: [],
        genres: [],
        currentFilter: null,
        
        addBook: function(book) {
            console.log('Метод addBook буде реалізований');
        },
        
        searchBooks: function(query) {
            console.log('Метод searchBooks буде реалізований');
        },
        
        filterBooks: function(genre) {
            console.log('Метод filterBooks буде реалізований');
        },
        
        getStatistics: function() {
            console.log('Метод getStatistics буде реалізований');
            return {};
        }
    };
});