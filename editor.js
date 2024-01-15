export class DynamicCarousel {
    constructor(container) {
        this.container = container;
        this.items = Array.from(container.children);
        this.currentIndex = 0;
    
        this.firstRun();

        this.setupCarousel();
        this.showCurrentItem();
    }

    setupCarousel() {
        // Create a container for the controls
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'controls-container';
        this.container.appendChild(controlsContainer);

        // Add carousel-specific classes for styling
        this.container.classList.add('carousel-container');
        this.items.forEach(item => item.classList.add('carousel-item'));

        // Create and append navigation buttons inside the controls container
        const toggleButton = this.createButton('carousel-button', 'Toggle Arrows', this.toggleArrows.bind(this));
        const leftArrow = this.createButton('arrow left', '&#10094;', () => this.moveSlide(-1));
        const rightArrow = this.createButton('arrow right', '&#10095;', () => this.moveSlide(1));

        controlsContainer.appendChild(toggleButton);
        controlsContainer.appendChild(leftArrow);
        controlsContainer.appendChild(rightArrow);
    }
    createButton(className, innerHTML, eventListener) {
        const button = document.createElement('button');
        button.className = className;
        button.innerHTML = innerHTML;
        button.addEventListener('click', eventListener);
        this.container.appendChild(button);
    }

    

    toggleArrows() {
        this.container.querySelectorAll('.arrow').forEach(arrow => {
            arrow.style.display = arrow.style.display === 'none' ? 'block' : 'none';
        });
    }

    moveSlide(direction) {
        this.items[this.currentIndex].style.display = 'none';
        this.currentIndex += direction;

        if (this.currentIndex >= this.items.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.items.length - 1;
        }

        this.showCurrentItem();
    }

    firstRun() {
        // Hide all items initially
        this.items.forEach(item => {
            item.style.display = 'none';
        });
    
        // Show only the first item
        if (this.items.length > 0) {
            this.items[0].style.display = 'block';
        }
    }

    showCurrentItem() {
        this.items[this.currentIndex].style.display = 'block';
    }
}

