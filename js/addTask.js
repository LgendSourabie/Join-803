function changeColorPrio(element) {
    if (element.classList.contains('prioUrgent')) {
        element.style.backgroundColor = 'rgb(255,61,0)';
    } else if (element.classList.contains('prioMedium')) {
        element.style.backgroundColor = 'rgb(255,168,0)';
    } else if (element.classList.contains('prioLow')) {
        element.style.backgroundColor = 'rgb(122,226,41)';
    }
    element.style.color = 'white';
}

