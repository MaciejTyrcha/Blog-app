const createPopup = () => {
    const container = document.createElement('div');
    const popup = document.createElement('div');
    const quit = document.createElement('i');
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.backgroundColor = `rgba(0,0,0,0.1)`;
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.id='popupContainer';

    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = `translate(-50%, -50%)`;
    popup.style.backgroundColor = 'white';
    popup.style.width = '400px';
    popup.style.height = '600px';
    popup.style.border = `1px solid black`;
    popup.style.borderRadius = '5px';

    quit.style.position = 'absolute';
    quit.classList.add('fas', 'fa-times');
    quit.id='quitPopup';
    quit.style.top = '10px';
    quit.style.right = '10px';
    quit.style.fontSize = '30px';
    quit.style.cursor = 'pointer';

    document.body.appendChild(container);
    container.appendChild(popup);
    popup.appendChild(quit);
}