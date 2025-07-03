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


    
    /* ------ТЕКСТОВАЯ ИНФОРМАЦИЯ------ */
    const background_heading = document.createElement('div');
    background_heading.className = 'background-heading'
    
    const heading = document.createElement('h2');
    heading.className = 'country-name';
    heading.textContent = content.country;
    
    const country_information_container = document.createElement('div');
    country_information_container.className = 'country-information_container';
    
    const country_description = document.createElement('div');
    country_description.className = 'country-description';
    country_description.textContent = 'Российская Федерация — крупнейшее в мире государство, занимающее 1/8 часть суши и расположенное на северо-востоке Евразии. Россия — страна с многовековой историей, богатым культурным наследием и щедрой природой. В России можно найти почти всё то, что встречает путешественник по отдельности в той или иной стране — солнечные пляжи субтропиков и снежные горные вершины, бескрайние степи и глухие леса, бурные реки и тёплые моря.' 
    
    /* ------FLAG------ */
    const country_flag_container = document.createElement('div');
    country_flag_container.className = 'country-flag-container';
    
    const country_flag = document.createElement('img');
    country_flag.className = 'country-flag';
    country_flag.src = 'images/media/flags/test_flag.png';
    
    /* ------COMMENTS------ */
    const traveler_reviews = document.createElement('div');
    traveler_reviews.className = 'traveler-reviews';
    traveler_reviews.textContent = 'Впечатления путешественников';

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments-popup_container';

    const commentsData = [
        {
            avatar: 'images/icons/avatar.png',
            message: 'Первый комментарий!',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Второй комментарий.',
        },
        {
            avatar: 'images/icons/avatar.png',
            message: 'Третий комментарий, который скрыт по умолчанию.',
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

        commentDiv.appendChild(avatar);
        commentDiv.appendChild(message);

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

                commentDiv.appendChild(avatar);
                commentDiv.appendChild(message);

                commentsContainer.appendChild(commentDiv);
            });
            expandButton.style.display = 'none';

            commentsContainer.scrollIntoView({ behavior: 'smooth' });
        };
    }

    /* ------КОММЕНАРИЙ ПОЛЬЗОВАТЕЛЯ------ */
    const user_comment_container = document.createElement('div');
    user_comment_container.className = 'user-comment_container';

    const user_comment = document.createElement('input');
    user_comment.className = 'user-comment';
    user_comment.type = 'text'; 
    user_comment.placeholder = 'Введите комментарий'; 

    const upload_image_container = document.createElement('div');
    upload_image_container.className = 'upload_image_container';
    
    const upload_image = document.createElement('input');
    upload_image.className = 'upload-image';
    upload_image.type = 'file'; 
    upload_image.accept = 'images/media'; 
    upload_image.multiple = false; 

    const send_comment = document.createElement('button');
    send_comment.className = 'send-comment';
    send_comment.textContent = 'Отправить'; 

    const uploadButton = document.createElement('button');
    uploadButton.className = 'upload-image';
    uploadButton.innerText = 'Выбрать изображение';

    uploadButton.onclick = () => {
        upload_image.click();
    };

    
    
    user_comment_container.appendChild(user_comment);
    user_comment_container.appendChild(upload_image_container);
    upload_image_container.appendChild(upload_image);
    upload_image_container.appendChild(uploadButton);
    upload_image_container.appendChild(upload_image);
    user_comment_container.appendChild(send_comment);

    /* ------ДОБАВЛЯЕМ ЭЛЕМЕНТЫ НА СТРАНИЦУ------ */
    popup_container.appendChild(background_heading);
    background_heading.appendChild(heading)
    popup_container.appendChild(country_information_container);
    country_information_container.appendChild(country_description);
    country_information_container.appendChild(country_flag_container);
    country_flag_container.appendChild(country_flag);
    popup_container.appendChild(traveler_reviews);
    popup_container.appendChild(commentsContainer);
    popup_container.appendChild(user_comment_container);

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

