export function togglePage(toHide, toShow) {
    toHide.hide();
    toShow.show();

    // give the browser illusion of changing pages
    // window.history.pushState({}, route, route);
}