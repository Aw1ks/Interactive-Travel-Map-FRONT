let activePopup = null;

/* ------ ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ ОКНА С ИНФОЙ СТРАНЫ | ГОРОДА------ */ 
function openCustomPopup(content) {
    if (activePopup) {
        document.body.removeChild(activePopup);
        activePopup = null;
    }

    const popupDiv = document.createElement('div');
    popupDiv.className = 'custom-popup';

    const popup_container = document.createElement('div');
    popup_container.className = 'popup-container';


/* ------SLIDER------ */
    const slider = document.createElement('slider');
    slider.className = 'icon-cards mt-3';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'icon-cards__content';

    const images = [
        'images/media/Russian_landmark_1.jpg',
        'images/media/Russian_landmark_2.jpg',
        'images/media/Russian_landmark_3.jpg'
    ];

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'icon-cards__item d-flex align-items-center justify-content-center'
        contentDiv.appendChild(img);
    });

    slider.appendChild(contentDiv);

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const checkbox = document.createElement('input');
    checkbox.className = 'd-none';
    checkbox.id = 'toggle-animation';
    checkbox.type = 'checkbox';
    checkbox.checked = true;

    checkboxDiv.appendChild(checkbox);
    document.body.appendChild(checkboxDiv);

    function classToggle() {
        var el = document.querySelector('.icon-cards__content');
        el.classList.toggle('step-animation');
    }

    document.querySelector('#toggle-animation').addEventListener('click', classToggle);

/* ------ТЕКСТОВАЯ ИНФОРМАЦИЯ------ */
    const heading = document.createElement('h2');
    heading.className = 'country-name';
    heading.textContent = content.country;

    const countryText = document.createElement('h3');
    countryText.className = 'city-name';
    countryText.textContent = `Текущий город - ${content.city}`;

    const country_information_container = document.createElement('div');
    country_information_container.className = 'country-information_container';

    const country_information = document.createElement('div');
    country_information.className = 'country-information';
    country_information.textContent = 'Информация о стране';

    const country_description = document.createElement('div');
    country_description.className = 'country-description';
    country_description.textContent = 'Российская Федерация — крупнейшее в мире государство, занимающее 1/8 часть суши и расположенное на северо-востоке Евразии. Россия — страна с многовековой историей, богатым культурным наследием и щедрой природой. В России можно найти почти всё то, что встречает путешественник по отдельности в той или иной стране — солнечные пляжи субтропиков и снежные горные вершины, бескрайние степи и глухие леса, бурные реки и тёплые моря.' 

    const traveler_reviews = document.createElement('div');
    traveler_reviews.className = 'traveler-reviews';
    traveler_reviews.textContent = 'Отзывы путешественников:';

/* ------КОММЕНТАРИИ------ */
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments-popup_container';

    const commentsData = [
        {
            avatar: 'images/icons/avatar.png',
            message: 'Первый комментарий!',
            likes: 10
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
            likes: 5
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Третий комментарий, который скрыт по умолчанию.',
            likes: 2
        }
    ];

    commentsData.slice(0, 2).forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const avatar = document.createElement('img');
        avatar.src = comment.avatar;
        avatar.className = 'avatar';

        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = comment.message;

        const like_image = document.createElement('img');
        like_image.className = 'like_image';
        like_image.src = 'images/icons/like_icon.png';

        const likes = document.createElement('div');
        likes.className = 'likes';
        likes.textContent = `${comment.likes}`;

        commentDiv.appendChild(avatar);
        commentDiv.appendChild(message);
        commentDiv.appendChild(likes);
        commentDiv.appendChild(like_image);

        commentsContainer.appendChild(commentDiv);
    });

    let expandButton = null;
    if (commentsData.length > 2) {
        expandButton = document.createElement('button');
        expandButton.textContent = 'Развернуть';
        expandButton.className = 'expand-btn';

        expandButton.onclick = () => {
            commentsData.slice(2).forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';

                const avatar = document.createElement('img');
                avatar.src = comment.avatar;
                avatar.className = 'avatar';

                const message = document.createElement('div');
                message.className = 'message';
                message.textContent = comment.message;

                const likes = document.createElement('div');
                likes.className = 'likes';
                likes.textContent = `${comment.likes}`;

                commentDiv.appendChild(avatar);
                commentDiv.appendChild(message);
                commentDiv.appendChild(likes);

                commentsContainer.appendChild(commentDiv);
            });
            expandButton.style.display = 'none';

            commentsContainer.scrollIntoView({ behavior: 'smooth' });
        };
    }

/* ------ДОБАВЛЯЕМ ЭЛЕМЕНТЫ НА СТРАНИЦУ------ */
    popup_container.appendChild(slider);
    popup_container.appendChild(heading);
    popup_container.appendChild(countryText);
    popup_container.appendChild(country_information_container);
    country_information_container.appendChild(country_information);
    country_information_container.appendChild(country_description);
    popup_container.appendChild(traveler_reviews);
    popup_container.appendChild(commentsContainer);
    if (expandButton) commentsContainer.appendChild(expandButton);

    popupDiv.appendChild(popup_container);

    document.body.appendChild(popupDiv);

    setTimeout(() => {
        popupDiv.classList.add('show');

        const currentCenter_open = map.getCenter();
        map.panTo([currentCenter_open.lat, currentCenter_open.lng + 0.2], { animate: true });
    }, 10);

    activePopup = popupDiv;

/* ------ЗАКРЫТИЕ ОКНА------- */
    let close_window = document.createElement('div');
    close_window.className = 'close-window';

    let close_icon = document.createElement('img');
    close_icon.className = 'close-icon';
    close_icon.src = 'images/icons/close_icon.png';

    close_window.appendChild(close_icon);
    popupDiv.appendChild(close_window);

    close_window.addEventListener('click', function() {
        closePopup();

        const currentCenter_close = map.getCenter();
        map.panTo([currentCenter_close.lat, currentCenter_close.lng - 0.2], { animate: true });
    });
}

function closePopup() {
    if (activePopup) {
        activePopup.classList.remove('show');
    }
}

addMarkers(cities);

document.getElementById('search-button').addEventListener('click', function() {
    var searchTerm = document.getElementById('search-input').value.toLowerCase();
    var foundCities = cities.filter(city => city.name.toLowerCase().includes(searchTerm) || city.country.toLowerCase().includes(searchTerm));

    if (foundCities.length > 0) {
        map.setView([foundCities[0].lat, foundCities[0].lng], 10);
    } else {
        alert("Ничего не найдено.");
    }
});

