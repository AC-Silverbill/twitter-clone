export default function getAbsolutePosition(element: HTMLElement) {
    let rect = element.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
    };
}
