let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let eventSubsInfo = localStorage.getItem('eventSubsInfo') ? JSON.parse(localStorage.getItem('eventSubsInfo')) : [];


const calendar = document.getElementById('calendar');
const eventStart = document.getElementById('newEvent');
const eventDelete = document.getElementById('deleteEvent');
const backMod = document.getElementById('backgrounModal');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventSubscribe = document.getElementById('eventInfo');
const weekdays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];



function openModal(date) {
    clicked = date;
    const eventinDay = events.find(e => e.date === clicked);
    const eventinfoDay = eventSubsInfo.find(e => e.date === clicked);


    if (eventinDay) {
        document.getElementById('event_txt').innerText = eventinDay.title;
        document.getElementById('event_txt_info').innerText = eventinfoDay.title;
        eventDelete.style.display = 'block';
    } else {
        eventStart.style.display = 'block';
    }

    backMod.style.display = 'block';

}



function calend() {
    const dayN = new Date();

    if (nav !== 0) {
        dayN.setMonth(new Date().getMonth() + nav);
    }

    const day = dayN.getDate();
    const month = dayN.getMonth();
    const year = dayN.getFullYear();
    const firstDayMonth = new Date(year, month, 1);
    const alldayMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayMonth.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);


    document.getElementById('monthDisplay').innerText = `${dayN.toLocaleDateString('uk-UA', { month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + alldayMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${i - paddingDays}/${month + 1}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventinDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }


            if (eventinDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventinDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}


function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');
        eventSubscribe.classList.remove('error');
        events.push({
            date: clicked,
            title: eventTitleInput.value
        });
        eventSubsInfo.push({
            date: clicked,
            title: eventSubscribe.value
        });

        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('eventSubsInfo', JSON.stringify(eventSubsInfo));

        closeModal();
        console.log(events);
        console.log(eventSubsInfo);

    } else {
        eventTitleInput.classList.add('error');
        eventSubscribe.classList.add('error');

    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    eventSubsInfo = eventSubsInfo.filter(e => e.date !== clicked);
    localStorage.removeItem('eventSubsInfo');
    closeModal();
}

function buttonsMonth() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        calend();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        calend();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}


function closeModal() {
    eventTitleInput.classList.remove('error');
    eventStart.style.display = 'none';
    eventDelete.style.display = 'none';
    backMod.style.display = 'none';
    eventTitleInput.value = '';
    eventSubscribe.value = '';
    clicked = null;
    calend();
}


buttonsMonth();
calend();