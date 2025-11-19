document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tabs button');
    const items = document.querySelectorAll('#notification-list .item');

    function setActive(tab) {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    }

    function filterList(mode) {
        items.forEach(it => {
            const status = it.getAttribute('data-status');

            if (mode === 'all') {
                it.classList.remove('hidden');
            } else if (mode === 'unread') {
                it.classList.toggle('hidden', status !== 'unread');
            } else if (mode === 'read') {
                it.classList.toggle('hidden', status !== 'read');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mode = tab.getAttribute('data-filter');
            setActive(tab);
            filterList(mode);
        });
    });

    filterList('all');
});
