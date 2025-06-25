// src/headerimg/index.ts

// Импортируем каждое изображение и даем ему имя переменной
import omoriHeaderJpg from './1.jpg';
import omoriHeaderWebp from './2.jpg';
import omoriHeader2Jpg from './3.jpg';
import omoriHeader3Webp from './4.jpg';
import omoriHeader3Png from './5.jpg';

// Создаем и экспортируем массив объектов для галереи
// У каждого объекта есть два поля: src (путь к картинке) и alt (альтернативный текст)
export const headerImages = [
    {
        src: omoriHeaderWebp,
        alt: 'City 1'
    },
    {
        src: omoriHeader2Jpg,
        alt: 'City 2'
    },
    {
        src: omoriHeader3Webp,
        alt: 'City 3'
    },
    {
        src: omoriHeaderJpg,
        alt: 'City 4'
    },
    {
        src: omoriHeader3Png,
        alt: 'City 5'
    }
];
