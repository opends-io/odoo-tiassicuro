/** @odoo-module **/
/* jshint esversion: 8 */
import {Component, useState, useRef, useEffect} from "@odoo/owl";
import {registry} from "@web/core/registry";


const carouselItems = [
    "/tiassicuro_website/static/src/img/cropped-photo_1_2023-08-17_20-25-03-768x432.jpg",
    "/tiassicuro_website/static/src/img/cropped-photo_2_2023-08-17_20-25-03-768x432.jpg",
    "/tiassicuro_website/static/src/img/cropped-photo_4_2023-08-17_20-25-03-1-768x432.jpg",
    "/tiassicuro_website/static/src/img/cropped-photo_5_2023-08-17_20-25-03-768x432.jpg",
    "/tiassicuro_website/static/src/img/cropped-photo_6_2023-08-17_20-25-03-768x432.jpg",
    "/tiassicuro_website/static/src/img/cropped-photo_2023-08-15_12-13-21-768x432.jpg",
    "/tiassicuro_website/static/src/img/cropped-photo_2023-08-15_12-13-29-768x432.jpg",
];


export class Carousel extends Component {
    static template = "tiassicuro_website.carousel";


    setup() {

        this.state = useState({carouselItems: carouselItems, currentIndex: 0});
        this.timeInterval = useRef(null);

        useEffect(() => {
                this.timeInterval = setInterval(() => {
                    this.handleNavigation((this.state.currentIndex + 1 > this.state.carouselItems.length - 1) ? 0 : this.state.currentIndex + 1);
                }, 3000);
                return () => clearInterval(this.timeInterval);
            },
            () => []
        );
    }

    handleNavigation(nextIndex) {
        this.state.currentIndex = nextIndex;
    }
}

registry.category("public_components").add("tiassicuro_website.Carousel", Carousel);