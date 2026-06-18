
class GourmetApp {
    constructor() {
        this.cart = this.loadFromStorage('gourmet_cart', []);
        this.orders = this.loadFromStorage('gourmet_orders', []);
        this.favorites = this.loadFromStorage('gourmet_favorites', []);
        this.user = this.loadFromStorage('gourmet_user', {});
        this.theme = this.loadFromStorage('gourmet_theme', 'light');
        this.coupon = this.loadFromStorage('gourmet_coupon', null);
        this.currentCategory = 'all';
        this.checkoutStep = 1;
        this.orderNumber = null;
        this.paymentMethod = 'card';
        this.searchQuery = '';
        this.sortBy = 'popular';
        this.currentView = 'menu';

        this.products = [
            // ========== ENTRADAS (12) ==========
            { id: 1, name: 'Papa a la Huancaína', desc: 'Papas amarillas cocidas servidas con salsa de ají amarillo, queso fresco, leche y galletas. Decorado con aceituna negra y huevo cocido. Plato emblemático de la gastronomía peruana.', price: 28, category: 'entradas', image: 'https://gourmet.expob2b.es/uploads/fotos_noticias/2019/12/w800px_20607-163697-recetas-del-mundo-peru-papa-a-la-huancaina.jpg', badges: ['vegetarian'], rating: 4.8, reviews: 156, time: '10 min', popular: true },
            { id: 2, name: 'Solterito Arequipeño', desc: 'Ensalada fresca de queso fresco, tomate, cebolla, habas, rocoto y choclo desgranado. Aliñado con limón y aceite de oliva. Ligero y nutritivo.', price: 26, category: 'entradas', image: 'https://campograndeperu.com/wp-content/uploads/2024/05/solterito-arequipeno.jpg', badges: ['vegetarian'], rating: 4.6, reviews: 89, time: '8 min' },
            { id: 3, name: 'Choclo con Queso', desc: 'Choclo andino tierno servido con generosa porción de queso fresco derretido. Clásico de las calles del Cusco. Simple pero irresistible.', price: 22, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMx9xbfnZgYyNxKSYY6rqGYpjvFYXP1bG6_Q&s', badges: ['vegetarian'], rating: 4.7, reviews: 234, time: '5 min', popular: true },
            { id: 4, name: 'Causa Limeña', desc: 'Prensado de papa amarilla sazonada con limón y ají, relleno de pollo deshilachado, palta y mayonesa. Servido frío en capas perfectas.', price: 32, category: 'entradas', image: 'https://acomer.pe/wp-content/uploads/2018/02/causalimeniathumb-1.jpg', badges: [], rating: 4.7, reviews: 178, time: '12 min' },
            { id: 5, name: 'Papa Rellena', desc: 'Puré de papa relleno de carne molida, cebolla, tomate, aceitunas y huevo. Empanizado y frito dorado. Crujiente por fuera, suave por dentro.', price: 30, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTekp9SxAXI_1lEOehUAafSloIUEXmjDghg&s', badges: [], rating: 4.5, reviews: 145, time: '15 min' },
            { id: 6, name: 'Anticuchos de Corazón', desc: 'Brochetas de corazón de res marinadas en ají panca, vinagre, comino y ajo. Asadas a la parrilla con papas doradas y choclo. Sabor intenso de la calle peruana.', price: 38, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIrQMoNgsK4UlrZZoT6xjsUJ3PkbEXd16Ykw&s', badges: ['spicy'], rating: 4.9, reviews: 312, time: '18 min', popular: true },
            { id: 7, name: 'Tiradito de Trucha', desc: 'Finas láminas de trucha fresca del Lago Titicaca, bañadas en leche de tigre de ají amarillo y limón. Sin arroz, puro sabor andino.', price: 45, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbw_0orPWzmi2Gy-2N6-QHfEqrreZ1brCGCQ&s', badges: ['gluten-free'], rating: 4.8, reviews: 198, time: '15 min', popular: true },
            { id: 8, name: 'Humitas Dulces', desc: 'Tamales de maíz dulce envueltos en hojas de choclo, con pasas y queso fresco. Tradición cusqueña del Cusco. Servido caliente.', price: 20, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR10JhSisFx-AWlAtLBgiqCOi2cAwmmms_-lg&s', badges: ['vegetarian'], rating: 4.6, reviews: 167, time: '12 min' },
            { id: 9, name: 'Queso Andino con Miel', desc: 'Queso fresco de la región del Cusco, servido con miel de abeja de los valles sagrados y nueces. Postre-entrada único de la sierra.', price: 35, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZHtY0FKiXXSLDugr9z9AP_abc0RGJ4LO0g&s', badges: ['vegetarian'], rating: 4.5, reviews: 98, time: '5 min' },
            { id: 10, name: 'Sopa de Quinua', desc: 'Sopa nutritiva de quinua real, verduras frescas, leche y queso. Plato ancestral de los Andes, reconfortante y saludable.', price: 24, category: 'entradas', image: 'https://deliciaskitchen.b-cdn.net/wp-content/uploads/2022/01/sopa-de-quinoa-con-ajos-tiernos-y-calabaza.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 134, time: '15 min' },
            { id: 11, name: 'Rocoto Relleno (Mini)', desc: 'Versión entrada del clásico: rocoto relleno de carne molida, pasas y aceitunas, gratinado con queso. Picante controlado.', price: 34, category: 'entradas', image: 'https://blog.redbus.pe/wp-content/uploads/2020/04/recetas_0d6889349eac3dc0486f0218dcf3beb8.jpg', badges: ['spicy'], rating: 4.8, reviews: 245, time: '20 min', popular: true },
            { id: 12, name: 'Tequeños de Queso Andino', desc: 'Palitos de masa crocante rellenos de queso andino derretido. Acompañados de salsa guacamole. Fusión peruana-venezolana popular en Cusco.', price: 28, category: 'entradas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnBUM_afqIJwGkQxNqe1l7iXf4eFT6YH4VQ&s', badges: ['vegetarian'], rating: 4.6, reviews: 112, time: '10 min' },

            // ========== PLATOS FUERTES (18) — CUSCO PERÚ ==========
            { id: 13, name: 'Cuy Chactado', desc: 'Cuy andino prensado y frito hasta quedar dorado y crujiente. Servido con papas doradas, salsa criolla y choclo. Plato bandera del Cusco, tradición inca.', price: 85, category: 'platos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_xqcX-aJR5kFfSSotdjB1h1_628ltNEIncA&s', badges: ['gluten-free'], rating: 4.9, reviews: 456, time: '35 min', popular: true },
            { id: 14, name: 'Lomo Saltado', desc: 'Tiras de lomo de res salteadas en wok con cebolla, tomate, ají amarillo y salsa de soja. Acompañado de papas fritas y arroz. Fusión peruana-china (chifa) perfecta.', price: 68, category: 'platos', image: 'https://i.ytimg.com/vi/sWXRJbGi6yQ/maxresdefault.jpg', badges: [], rating: 4.9, reviews: 523, time: '20 min', popular: true },
            { id: 15, name: 'Aji de Gallina', desc: 'Pechuga de gallina deshilachada en salsa cremosa de ají amarillo, leche, pan y nueces. Servido con papas cocidas, huevo y aceituna. Confort food peruano.', price: 58, category: 'platos', image: 'https://cocinalocal.cl/wp-content/uploads/2022/11/Aji-de-Gallina-Peruano.jpeg', badges: [], rating: 4.8, reviews: 389, time: '25 min', popular: true },
            { id: 16, name: 'Seco de Cordero', desc: 'Cordero andino cocido lentamente en salsa de cilantro, chicha de jora, ají y cerveza negra. Acompañado de papas sancochadas y arroz. Plato de los domingos en Cusco.', price: 72, category: 'platos', image: 'https://i.ytimg.com/vi/E4klwB0R9Fw/maxresdefault.jpg', badges: ['gluten-free'], rating: 4.8, reviews: 298, time: '40 min', popular: true },
            { id: 17, name: 'Adobo Arequipeño', desc: 'Carne de cerdo marinada en chicha de jora, ají panca, comino y ajo. Cocida lentamente hasta deshacerse. Servido con pan de campo. Tradicional de la región sur.', price: 65, category: 'platos', image: 'https://static.wixstatic.com/media/d66db7_428331ea57e7433180424cb30bf5169f~mv2.png/v1/fill/w_800,h_486,al_c/d66db7_428331ea57e7433180424cb30bf5169f~mv2.png', badges: ['spicy'], rating: 4.7, reviews: 267, time: '45 min' },
            { id: 18, name: 'Trucha Frita del Lago Titicaca', desc: 'Trucha fresca del lago más alto del mundo, frita entera hasta quedar dorada y crujiente. Acompañada de yuca frita, salsa criolla y choclo. Sabor de los Andes.', price: 62, category: 'platos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILnUuTbKMAak4sZYVN9iD9qDls6QxrXhT-w&s', badges: ['gluten-free'], rating: 4.8, reviews: 345, time: '25 min', popular: true },
            { id: 19, name: 'Pachamanca a la Olla', desc: 'Carne de cerdo, pollo, cordero, papas, habas y choclo cocidos bajo tierra con piedras calientes. Versión olla que reproduce el sabor ancestral de la Pachamanca andina.', price: 95, category: 'platos', image: 'https://i.ytimg.com/vi/u9AMJGOF26g/maxresdefault.jpg', badges: ['gluten-free'], rating: 4.9, reviews: 412, time: '50 min', popular: true },
            { id: 20, name: 'Chicharron de Chancho', desc: 'Cortes de cerdo con piel, fritos en su propia grasa hasta quedar dorados y crujientes. Acompañados de mote, sarza criolla y mint. Desayuno de campeones del Cusco.', price: 55, category: 'platos', image: 'https://i.ytimg.com/vi/VRarMMdBSR8/maxresdefault.jpg', badges: ['gluten-free'], rating: 4.8, reviews: 378, time: '30 min', popular: true },
            { id: 21, name: 'Rocoto Relleno', desc: 'Rocoto picante relleno de carne molida, pasas, aceitunas y huevo, gratinado con queso andino. Servido con pastel de papa. Plato bandera de Arequipa, muy popular en Cusco.', price: 58, category: 'platos', image: 'https://championsperutravel.com/sites/default/files/2026-05/rocoto%20relleno%20cusque%C3%B1o%20de%20peru.webp', badges: ['spicy'], rating: 4.8, reviews: 456, time: '35 min', popular: true },
            { id: 22, name: 'Arroz con Pato', desc: 'Pato andino cocido en cerveza negra, cilantro, ají y cerveza. Arroz verde cremoso con el sabor del pato. Plato norteño muy apreciado en la sierra.', price: 70, category: 'platos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWx8Dcd8Ww9dj0b30B9fsAcr8EUY_isR-q8g&s', badges: [], rating: 4.7, reviews: 234, time: '35 min' },
            { id: 23, name: 'Cau Cau', desc: 'Mondongo de res cocido con papas, cebolla, ají amarillo, menta y cúrcuma. Guiso reconfortante de la cocina criolla. Acompañado de arroz blanco.', price: 48, category: 'platos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3oFh0thZ6ZOyLVG8uWi8iIq6I6Zumy3wrXw&s', badges: ['gluten-free'], rating: 4.6, reviews: 189, time: '30 min' },
            { id: 24, name: 'Tallarin Saltado', desc: 'Fideos tallarines salteados en wok con pollo, verduras, salsa de soja y ají. Versión peruana del chow mein. Plato de la cocina chifa muy popular en Cusco.', price: 52, category: 'platos', image: 'https://buenazo.cronosmedia.glr.pe/original/2020/09/23/5f6b89e58dba0136a669b1e2.jpg', badges: [], rating: 4.7, reviews: 298, time: '20 min' },
            { id: 25, name: 'Pollo a la Brasa', desc: 'Pollo marinado en especias peruanas, asado en rotisserie hasta quedar jugoso y piel crujiente. Acompañado de papas fritas y ensalada. El clásico de todos los domingos.', price: 60, category: 'platos', image: 'https://jameaperu.com/assets/images/pollo-a-la-brasa_800x534.webp', badges: ['gluten-free'], rating: 4.8, reviews: 567, time: '30 min', popular: true },
            { id: 26, name: 'Cabrito a la Norteña', desc: 'Cabrito lechal confitado en su propia grasa, servido con arroz, yuca y salsa criolla. Técnica ancestral de conservación de la sierra peruana.', price: 88, category: 'platos', image: 'https://i.ytimg.com/vi/YX1o_27BqQo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCgqwqAvPiO8p3q4fLO1YJH2UMUKw', badges: ['gluten-free'], rating: 4.7, reviews: 156, time: '45 min' },
            { id: 27, name: 'Arroz Chaufa de Mariscos', desc: 'Arroz frito al estilo peruano con mariscos frescos, salsa de soja, ají, cebolla china y huevo. Fusión peruana-china con sabor de mar.', price: 65, category: 'platos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08IrgLwZkAbHTxu5T8LMxlLPOYCdpolr0uw&s', badges: [], rating: 4.8, reviews: 289, time: '25 min' },
            { id: 28, name: 'Pepian de Cuy', desc: 'Cuy deshuesado en salsa de maní, ají panca, cilantro y especias. Plato ancestral de la sierra central, muy apreciado en el Cusco por su sabor profundo.', price: 78, category: 'platos', image: 'https://recetascocinaperuana.com/wp-content/uploads/2025/05/pepian-de-cuy.jpg', badges: ['gluten-free'], rating: 4.7, reviews: 198, time: '40 min' },
            { id: 29, name: 'Sopa de Mote', desc: 'Sopa contundente de mote (maíz blanco cocido), carne de res, cordero, habas y verduras. Plato de los días fríos en los Andes. Reconfortante y nutritivo.', price: 42, category: 'platos', image: 'https://www.infobae.com/new-resizer/OsK8vflySCZq6coHLnzYkGF8J9M=/arc-anglerfish-arc2-prod-infobae/public/WP2HHLTASVFPDKHUCHZ7NNPHW4.jpg', badges: ['gluten-free'], rating: 4.6, reviews: 145, time: '35 min' },
            { id: 30, name: 'Estofado de Alpaca', desc: 'Carne de alpaca tierna estofada con papas, zanahoria, arvejas y salsa de tomate. Carne magra y saludable de los Andes. Sabor suave, similar al buey.', price: 75, category: 'platos', image: 'https://i.ytimg.com/vi/39d9fGWD6V4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5XSo08vwKOORkqctNhG-P60cYHg', badges: ['gluten-free'], rating: 4.8, reviews: 234, time: '40 min', popular: true },

            // ========== POSTRES (14) — PERUANOS Y ANDINOS ==========
            { id: 31, name: 'Suspiro a la Limeña', desc: 'Dulce de leche cremoso con merengue italiano de oporto y canela. Postre emblemático de Lima, muy popular en todo el Perú. Dulce, suave y elegante.', price: 28, category: 'postres', image: 'https://gourmet.iprospect.cl/wp-content/uploads/2016/09/Suspiro-Limeno-ajustada-web.jpg', badges: ['vegetarian'], rating: 4.9, reviews: 456, time: '5 min', popular: true },
            { id: 32, name: 'Mazamorra Morada', desc: 'Pudín de maíz morado cocido con frutas, canela y clavo. Postre ancestral de la época colonial. Servido frío con canela espolvoreada. Color intenso, sabor único.', price: 22, category: 'postres', image: 'https://perudelights.com/wp-content/uploads/2013/09/Mazamorra-morada.-jpg-1.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 312, time: '5 min', popular: true },
            { id: 33, name: 'Arroz con Leche', desc: 'Arroz cocido lentamente en leche con canela, clavo y piel de naranja. Servido con canela espolvoreada. Postre casero de toda la vida en el Perú.', price: 20, category: 'postres', image: 'https://www.integralisimo.com/wp-content/uploads/sites/5/2025/05/Receta-de-Arroz-Con-Leche-Integral-3-1.png.webp', badges: ['vegetarian', 'gluten-free'], rating: 4.8, reviews: 398, time: '5 min', popular: true },
            { id: 34, name: 'Picarones', desc: 'Rosquillas de masa de zapallo y camote, fritas y bañadas en miel de chancaca (panela). Postre callejero peruano por excelencia. Crujientes y dulces.', price: 24, category: 'postres', image: 'https://comedera.com/wp-content/uploads/sites/9/2022/07/picarones-peruanos.jpg', badges: ['vegetarian'], rating: 4.8, reviews: 445, time: '15 min', popular: true },
            { id: 35, name: 'Turrón de Doña Pepa', desc: 'Galletas de anís con miel de chancaca, decoradas con confites de colores. Postre tradicional de octubre en el Perú. Dulce, denso y colorido.', price: 26, category: 'postres', image: 'https://i.ytimg.com/vi/3yG9ouBsD1w/maxresdefault.jpg', badges: ['vegetarian'], rating: 4.6, reviews: 267, time: '5 min' },
            { id: 36, name: 'Helado de Lucuma', desc: 'Helado artesanal de lucuma, fruta andina con sabor a caramelo y maple. Única del Perú. Servido con galleta de vainilla. Postre que no existe en otro lugar del mundo.', price: 25, category: 'postres', image: 'https://i.ytimg.com/vi/2ucCT52rJvk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCX0GgSBD7ez4w63zAlnbGhkpG4ag', badges: ['vegetarian', 'gluten-free'], rating: 4.9, reviews: 534, time: '3 min', popular: true },
            { id: 37, name: 'Queso Helado', desc: 'Helado de queso fresco con canela y vainilla. Textura cremosa y sabor inesperado. Postre arequipeño muy popular en el Cusco. Sorprendente y adictivo.', price: 24, category: 'postres', image: 'https://cdn0.recetasgratis.net/es/posts/5/3/1/queso_helado_arequipeno_78135_paso_8_600.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 289, time: '3 min' },
            { id: 38, name: 'Champús', desc: 'Bebida-postre de maíz morado, piña, canela y clavo. Servido frío con trozos de fruta. Refrescante y dulce, típico de la selva peruana, popular en verano.', price: 18, category: 'postres', image: 'https://www.cocina-ecuatoriana.com/base/stock/Recipe/champus/champus_web.jpg.webp', badges: ['vegetarian', 'gluten-free'], rating: 4.5, reviews: 178, time: '5 min' },
            { id: 39, name: 'Tarta de Chirimoya', desc: 'Tarta de la fruta chirimoya (custard apple), nativa de los Andes. Crema suave con sabor a plátano, piña y fresa. Postre exclusivo de la región.', price: 30, category: 'postres', image: 'https://img2.rtve.es/n/16053481', badges: ['vegetarian'], rating: 4.6, reviews: 145, time: '5 min' },
            { id: 40, name: 'King Kong de Lambayeque', desc: 'Dulce de capas de galleta de maíz, manjar blanco y piña. Originario del norte peruano, muy popular en el Cusco. Denso, dulce y para compartir.', price: 32, category: 'postres', image: 'https://cucharalibre.com/wp-content/uploads/2025/11/king-kong-postre-peru-portada-1280x720.jpg', badges: ['vegetarian'], rating: 4.7, reviews: 234, time: '5 min' },
            { id: 41, name: 'Frejol Colado', desc: 'Dulce de pasta de frijoles negros con anís, servido con sémola de harina. Postre ancestral de la cocina afroperuana. Textura única, sabor profundo.', price: 22, category: 'postres', image: 'https://buenazo.cronosmedia.glr.pe/original/2022/10/04/633cc159f865fd14f4724b55.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.5, reviews: 123, time: '5 min' },
            { id: 42, name: 'Ranfañote', desc: 'Postre de pan bañado en miel de chancaca con queso fresco, pasas y coco. Plato de la cocina popular peruana. Reciclaje dulce del pan duro.', price: 20, category: 'postres', image: 'https://endulzateperu.com/assets/images/2026/03/ranfanote-limeno_800x534.webp', badges: ['vegetarian'], rating: 4.4, reviews: 98, time: '5 min' },
            { id: 43, name: 'Budín de Pan', desc: 'Pudín de pan con leche condensada, pasas, canela y pisco. Horneado hasta dorar. Postre casero de toda la vida, reconfortante y económico.', price: 22, category: 'postres', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4wBY5UwPgUlGk5p1xBPBfXipa5gS6IR8CA&s', badges: ['vegetarian'], rating: 4.6, reviews: 167, time: '10 min' },
            { id: 44, name: 'Helado de Cocona', desc: 'Helado artesanal de cocona, fruta amazónica ácida y refrescante. Sabor único de la selva peruana. Experiencia exótica para el paladar.', price: 26, category: 'postres', image: 'https://heladin.com/wp-content/uploads/2018/07/helado-de-alta-cocina-Helad%C3%ADn.png', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 198, time: '3 min' },

            // ========== BEBIDAS (16) — PERUANAS Y ANDINAS ==========
            { id: 45, name: 'Chicha Morada', desc: 'Bebida de maíz morado cocido con piña, manzana, canela y clavo. Refrescante, antioxidante y emblemática del Perú. Servida fría.', price: 18, category: 'bebidas', image: 'https://endulzateperu.com/assets/images/2025/10/chicha-morada-peruana_800x534.webp', badges: ['vegetarian', 'gluten-free'], rating: 4.8, reviews: 456, time: '2 min', popular: true },
            { id: 46, name: 'Pisco Sour', desc: 'Cóctel bandera del Perú: pisco, limón, jarabe de goma, clara de huevo y amargo de angostura. Cremoso, ácido y con punch. Trago de honor nacional.', price: 35, category: 'bebidas', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pisco-sour-44f6c3b.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.9, reviews: 678, time: '3 min', popular: true },
            { id: 47, name: 'Inca Kola', desc: 'Gaseosa peruana de sabor único a hierba luisa. Dorada, dulce y refrescante. La bebida que le ganó a Coca-Cola en el Perú. Ícono nacional.', price: 15, category: 'bebidas', image: 'https://elcausape.com/wp-content/uploads/2021/02/el-causa-food-truck-Inka-Kola.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 567, time: '1 min', popular: true },
            { id: 48, name: 'Emoliente', desc: 'Bebida caliente de cebada tostada, linaza, alfalfa y hierbabuena. Medicina tradicional andina. Reconfortante, digestiva y saludable. De las calles del Cusco.', price: 12, category: 'bebidas', image: 'https://mirecetadehoy.com/assets/images/2025/12/emoliente-peruano_800x534.webp', badges: ['vegetarian', 'gluten-free'], rating: 4.6, reviews: 234, time: '5 min' },
            { id: 49, name: 'Mate de Coca', desc: 'Infusión de hojas de coca andina. Alivia el mal de altura, energiza y calma. Tradicional de los Andes, especialmente en el Cusco a 3,400 msnm.', price: 10, category: 'bebidas', image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Mate_de_coca_Peru.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 445, time: '3 min', popular: true },
            { id: 50, name: 'Cerveza Cusqueña', desc: 'Cerveza premium peruana de alta calidad. Variedades: dorada, negra, roja y de trigo. La cerveza de los Andes. Refrescante y con carácter.', price: 22, category: 'bebidas', image: 'https://i.pinimg.com/736x/c7/e0/ba/c7e0babd5a7c197652aa5cb993002b8b.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.6, reviews: 389, time: '1 min' },
            { id: 51, name: 'Chicha de Jora', desc: 'Cerveza andina ancestral de maíz fermentado. Bebida ceremonial de los Incas. Sabor ácido, ligeramente alcohólico. Conexión viva con la historia.', price: 28, category: 'bebidas', image: 'https://www.yawarinkahotel.com/wp-content/uploads/2019/01/chica-de-jora-2.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.5, reviews: 198, time: '2 min' },
            { id: 52, name: 'Limonada Peruana', desc: 'Limonada con hierbabuena fresca, jengibre y un toque de pisco opcional. Refrescante, aromática y digestiva. La bebida de los almuerzos peruanos.', price: 16, category: 'bebidas', image: 'https://jameaperu.com/assets/images/limonada-frozen_800x534.webp', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 312, time: '3 min' },
            { id: 53, name: 'Jugo de Maracuyá', desc: 'Jugo de parchita (maracuyá) fresco, ácido y revitalizante. Rico en vitamina C. De los valles tropicales del Perú. Puro sabor amazónico.', price: 18, category: 'bebidas', image: 'https://www.clarin.com/2024/06/28/-f2M6O9wV_2000x1500__1.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.8, reviews: 267, time: '3 min', popular: true },
            { id: 54, name: 'Té de Muña', desc: 'Infusión de muña, planta andina digestiva y aromática. Similar al poleo pero más intenso. Tradicional de la medicina natural del Cusco. Calmante.', price: 10, category: 'bebidas', image: 'https://www.alpacaexpeditions.com/wp-content/webp-express/webp-images/uploads/Delicioso-y-Aromatico-Te-de-Muna-blog1500x760.jpg.webp', badges: ['vegetarian', 'gluten-free'], rating: 4.5, reviews: 156, time: '3 min' },
            { id: 55, name: 'Api con Pastel', desc: 'Bebida caliente de maíz morado con canela y clavo, acompañada de empanada de queso. Desayuno tradicional de la sierra. Dulce, caliente y reconfortante.', price: 20, category: 'bebidas', image: 'https://media.todojujuy.com/p/1b4e6bf5aafc38e9f2f1aaadd00af170/adjuntos/227/imagenes/003/342/0003342861/1200x675/smart/api-pastel.png', badges: ['vegetarian'], rating: 4.7, reviews: 289, time: '5 min', popular: true },
            { id: 56, name: 'Café Pasado', desc: 'Café andino filtrado tradicional en tela (pasado). Grano de la selva central, tostado artesanal. Intenso, aromático. El café de los Andes peruanos.', price: 16, category: 'bebidas', image: 'https://cdnx.jumpseller.com/onedrop/image/20195986/vence.jpg.jpg?1635498073', badges: ['vegetarian', 'gluten-free'], rating: 4.6, reviews: 234, time: '5 min' },
            { id: 57, name: 'Jugo de Aguaymanto', desc: 'Jugo de physalis peruano (aguaymanto/golden berry), ácido y dulce a la vez. Fruta andina con sabor único. Rico en antioxidantes. Exótico y refrescante.', price: 20, category: 'bebidas', image: 'https://campograndeperu.com/wp-content/uploads/2024/03/jugo-de-aguaymanto-con-naranja.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.7, reviews: 178, time: '3 min' },
            { id: 58, name: 'Machu Picchu Cocktail', desc: 'Cóctel de capas: jugo de naranja, licor de durazno y grenadina. Visualmente espectacular, como el amanecer en Machu Picchu. Dulce, frutal y fotogénico.', price: 38, category: 'bebidas', image: 'https://recetasdecocteles.net/wp-content/uploads/2025/03/Machu-Picchu.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.8, reviews: 345, time: '3 min', popular: true },
            { id: 59, name: 'Cañazo', desc: 'Destilado de caña de azúcar andina, similar al aguardiente pero más suave. Trago de las fiestas andinas. Puro, fuerte y con tradición.', price: 25, category: 'bebidas', image: 'https://buenazo.cronosmedia.glr.pe/original/2021/03/18/6053ed24c1e71a609677cbcd.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.4, reviews: 123, time: '1 min' },
            { id: 60, name: 'Refresco de Cocona', desc: 'Bebida refrescante de cocona, fruta amazónica ácida y aromática. De la selva peruana al Cusco. Única, exótica y revitalizante.', price: 18, category: 'bebidas', image: 'https://www.comidastipicasperuanas.com/wp-content/uploads/2022/12/Receta-de-refresco-de-cocona-Comidas-Peruanas.jpg', badges: ['vegetarian', 'gluten-free'], rating: 4.6, reviews: 156, time: '3 min' }
        ];

        this.validCoupons = {
            'BENVENIDO': { discount: 0.20, type: 'percent', label: '20% de descuento' },
            'GOURMET10': { discount: 0.10, type: 'percent', label: '10% de descuento' },
            'ENVIOFREE': { discount: 49, type: 'fixed', label: 'Envío gratis' },
            'COMIDA50': { discount: 50, type: 'fixed', label: '$50 de descuento' }
        };

        this.init();
    }

    loadFromStorage(key, defaultValue) {
        try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : defaultValue; } catch { return defaultValue; }
    }
    saveToStorage(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

    init() {
        this.applyTheme();
        this.renderProducts();
        this.updateCategoryCounts();
        this.updateCartUI();
        this.setupEventListeners();
        this.setupScrollHeader();
        this.populateUserData();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { this.closeCheckout(); this.toggleCart(false); this.closeProductModal(); }
            if (e.key === 'Enter') {
                const overlay = document.getElementById('checkoutOverlay');
                if (overlay.classList.contains('active') && !document.getElementById('successScreen').classList.contains('active')) this.nextStep();
            }
        });
        const cardInput = document.getElementById('cardNumber');
        if (cardInput) cardInput.addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, ''); v = v.substring(0, 16); const p = v.match(/.{1,4}/g) || []; e.target.value = p.join(' '); });
        const expiryInput = document.getElementById('cardExpiry');
        if (expiryInput) expiryInput.addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2, 4); e.target.value = v; });
        const phoneInput = document.getElementById('contactPhone');
        if (phoneInput) phoneInput.addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 10) v = v.substring(0, 10); if (v.length >= 6) v = v.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3'); else if (v.length >= 2) v = v.replace(/(\d{2})(\d*)/, '$1 $2'); e.target.value = v; });
        const zipInput = document.getElementById('addrZip');
        if (zipInput) zipInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5); });
        const cvvInput = document.getElementById('cardCVV');
        if (cvvInput) cvvInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4); });
    }

    setupScrollHeader() {
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => { if (window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled'); });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.saveToStorage('gourmet_theme', this.theme);
        this.applyTheme();
        this.showToast(this.theme === 'dark' ? 'Modo oscuro activado' : 'Modo claro activado', 'info');
    }
    applyTheme() { document.documentElement.setAttribute('data-theme', this.theme); }

    goHome() {
        this.currentView = 'menu';
        document.getElementById('menuSection').style.display = 'block';
        document.getElementById('heroSection').style.display = 'block';
        document.getElementById('ordersSection').style.display = 'none';
        document.getElementById('profileSection').style.display = 'none';
        document.querySelectorAll('.nav-btn').forEach((btn, i) => btn.classList.toggle('active', i === 0));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    showOrders() {
        this.currentView = 'orders';
        document.getElementById('menuSection').style.display = 'none';
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('ordersSection').style.display = 'block';
        document.getElementById('profileSection').style.display = 'none';
        document.querySelectorAll('.nav-btn').forEach((btn, i) => btn.classList.toggle('active', i === 1));
        this.renderOrders();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    showProfile() {
        this.currentView = 'profile';
        document.getElementById('menuSection').style.display = 'none';
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('ordersSection').style.display = 'none';
        document.getElementById('profileSection').style.display = 'block';
        document.querySelectorAll('.nav-btn').forEach((btn, i) => btn.classList.toggle('active', i === 2));
        this.updateProfileStats();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    logout() {
    const token = localStorage.getItem('gourmet_user_token');
    if (token) {
        fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(() => {});
    }
    localStorage.removeItem('gourmet_user_token');
    localStorage.removeItem('gourmet_user_name');
    this.showToast('Sesión cerrada', 'info');
    setTimeout(() => window.location.href = 'login.html', 800);
}

    getFilteredProducts() {
        let filtered = this.currentCategory === 'all' ? [...this.products] : this.products.filter(p => p.category === this.currentCategory);
        if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }
        switch (this.sortBy) {
            case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
            default: filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating); break;
        }
        return filtered;
    }

    filterCategory(category) {
        this.currentCategory = category;
        this.searchQuery = '';
        document.getElementById('searchInput').value = '';
        document.querySelectorAll('.category-item').forEach(item => item.classList.toggle('active', item.dataset.category === category));
        const titles = { all: 'Todo el Menú', entradas: 'Entradas', platos: 'Platos Fuertes', postres: 'Postres', bebidas: 'Bebidas' };
        document.getElementById('sectionTitle').textContent = titles[category];
        this.renderProducts();
    }
    searchProducts(query) { this.searchQuery = query; this.renderProducts(); }
    sortProducts(sortBy) { this.sortBy = sortBy; this.renderProducts(); }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const filtered = this.getFilteredProducts();
        const noResults = document.getElementById('noResults');
        document.getElementById('productsCount').textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;
        if (filtered.length === 0) { grid.innerHTML = ''; noResults.style.display = 'block'; return; }
        noResults.style.display = 'none';
        grid.innerHTML = filtered.map((product, i) => {
            const isFav = this.favorites.includes(product.id);
            const stars = this.renderStars(product.rating);
            const badgesHtml = product.badges.map(b => {
                const classes = { 'vegetarian': 'vegetarian', 'spicy': 'spicy', 'gluten-free': 'gluten-free' };
                const labels = { 'vegetarian': 'Vegetariano', 'spicy': 'Picante', 'gluten-free': 'Sin gluten' };
                return `<span class="product-badge ${classes[b]}">${labels[b]}</span>`;
            }).join('');
            const popularBadge = product.popular ? '<span class="product-badge popular">⭐ Popular</span>' : '';
            return `<div class="product-card" style="animation-delay: ${i * 0.05}s" onclick="app.openProductModal(${product.id})">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'">
                    <div class="product-badges">${popularBadge}${badgesHtml}</div>
                    <button class="product-favorite ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); app.toggleFavorite(${product.id})" title="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
                        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-meta">
                        <span class="product-rating">${stars}<span>${product.rating}</span></span>
                        <span class="product-time"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${product.time}</span>
                    </div>
                    <div class="product-footer">
                        <span class="product-price">${this.formatPrice(product.price)}</span>
                        <button class="add-btn" id="btn-${product.id}" onclick="event.stopPropagation(); app.addToCart(${product.id})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Agregar
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let html = '';
        for (let i = 0; i < full; i++) html += '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        if (half) html += '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon fill="url(#half)" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        return html;
    }

    updateCategoryCounts() {
        const counts = { all: this.products.length };
        ['entradas', 'platos', 'postres', 'bebidas'].forEach(cat => { counts[cat] = this.products.filter(p => p.category === cat).length; });
        Object.entries(counts).forEach(([cat, count]) => { const el = document.getElementById(`count-${cat}`); if (el) el.textContent = count; });
    }

    openProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        const isFav = this.favorites.includes(productId);
        const badgesHtml = product.badges.map(b => { const labels = { 'vegetarian': '🥬 Vegetariano', 'spicy': '🌶️ Picante', 'gluten-free': '🌾 Sin gluten' }; return `<span>${labels[b]}</span>`; }).join('');
        const content = document.getElementById('productModalContent');
        content.innerHTML = `<img src="${product.image}" alt="${product.name}" class="product-modal-image" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'">
            <div class="product-modal-info">
                <div class="product-modal-header"><h2 class="product-modal-name">${product.name}</h2><span class="product-modal-price">${this.formatPrice(product.price)}</span></div>
                <div class="product-modal-meta">${badgesHtml}<span>⭐ ${product.rating} (${product.reviews} reseñas)</span><span>⏱️ ${product.time}</span></div>
                <p class="product-modal-desc">${product.desc}</p>
                <div class="product-modal-actions">
                    <div class="qty-control"><button class="qty-btn" onclick="app.adjustModalQty(-1)"></button><span class="qty-value" id="modalQty">1</span><button class="qty-btn" onclick="app.adjustModalQty(1)">+</button></div>
                    <button class="btn btn-primary" style="flex:2" onclick="app.addModalToCart(${product.id})"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Agregar al carrito</button>
                    <button class="product-favorite ${isFav ? 'active' : ''}" style="position:static;width:48px;height:48px;border-radius:12px;background:var(--bg-hover);" onclick="app.toggleFavorite(${productId})" title="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"><svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                </div>
            </div>`;
        document.getElementById('productModalOverlay').classList.add('active');
        document.getElementById('productModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    closeProductModal() { document.getElementById('productModalOverlay').classList.remove('active'); document.getElementById('productModal').classList.remove('active'); document.body.style.overflow = ''; }
    adjustModalQty(delta) { const el = document.getElementById('modalQty'); let val = parseInt(el.textContent) + delta; if (val < 1) val = 1; if (val > 20) val = 20; el.textContent = val; }
    addModalToCart(productId) { const qty = parseInt(document.getElementById('modalQty').textContent); for (let i = 0; i < qty; i++) this.addToCart(productId, false); this.updateCartUI(); this.showToast(`${qty} unidades agregadas al carrito`, 'success'); this.closeProductModal(); }

    toggleFavorite(productId) {
        const idx = this.favorites.indexOf(productId);
        if (idx > -1) { this.favorites.splice(idx, 1); this.showToast('Eliminado de favoritos', 'info'); }
        else { this.favorites.push(productId); this.showToast('Agregado a favoritos', 'success'); }
        this.saveToStorage('gourmet_favorites', this.favorites);
        this.renderProducts();
        const modal = document.getElementById('productModal');
        if (modal.classList.contains('active')) this.openProductModal(productId);
    }

    addToCart(productId, showNotification = true) {
        const product = this.products.find(p => p.id === productId);
        const existing = this.cart.find(item => item.id === productId);
        if (existing) existing.qty++; else this.cart.push({ ...product, qty: 1 });
        this.saveToStorage('gourmet_cart', this.cart);
        this.updateCartUI();
        if (showNotification) this.showToast(`${product.name} agregado al carrito`, 'success');
        const btn = document.getElementById(`btn-${productId}`);
        if (btn) {
            btn.classList.add('added');
            btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Agregado`;
            setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Agregar`; }, 500);
        }
        const count = document.getElementById('cartCount');
        count.classList.add('bounce');
        setTimeout(() => count.classList.remove('bounce'), 500);
    }

    removeFromCart(productId) {
        const item = document.querySelector(`[data-cart-id="${productId}"]`);
        if (item) { item.classList.add('removing'); setTimeout(() => { this.cart = this.cart.filter(item => item.id !== productId); this.saveToStorage('gourmet_cart', this.cart); this.updateCartUI(); }, 300); }
    }
    updateQty(productId, delta) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) { this.removeFromCart(productId); return; }
        this.saveToStorage('gourmet_cart', this.cart);
        this.updateCartUI();
    }

    updateCartUI() {
        const count = this.cart.reduce((sum, item) => sum + item.qty, 0);
        const countEl = document.getElementById('cartCount');
        if (count > 0) { countEl.textContent = count; countEl.style.display = 'flex'; countEl.classList.add('pulse'); setTimeout(() => countEl.classList.remove('pulse'), 300); }
        else countEl.style.display = 'none';
        const itemsContainer = document.getElementById('cartItems');
        const footer = document.getElementById('cartFooter');
        if (this.cart.length === 0) {
            itemsContainer.innerHTML = `<div class="cart-empty"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Tu carrito está vacío</p><p class="cart-empty-sub">¡Agrega algunos platillos deliciosos!</p></div>`;
            footer.style.display = 'none'; return;
        }
        footer.style.display = 'block';
        itemsContainer.innerHTML = this.cart.map(item => `<div class="cart-item" data-cart-id="${item.id}"><img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop'"><div class="cart-item-details"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">${this.formatPrice(item.price * item.qty)}</div><div class="cart-item-controls"><button class="qty-btn" onclick="app.updateQty(${item.id}, -1)">−</button><span class="qty-value">${item.qty}</span><button class="qty-btn" onclick="app.updateQty(${item.id}, 1)">+</button><button class="remove-btn" onclick="app.removeFromCart(${item.id})" title="Eliminar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></div></div>`).join('');
        this.updateCartTotals();
    }

    updateCartTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const shipping = subtotal > 300 ? 0 : 49;
        let discount = 0;
        if (this.coupon) {
            const cd = this.validCoupons[this.coupon.code];
            if (cd) { if (cd.type === 'percent') discount = subtotal * cd.discount; else if (cd.label.includes('Envío')) discount = shipping; else discount = cd.discount; }
        }
        const taxable = Math.max(0, subtotal - discount);
        const taxes = taxable * 0.16;
        const total = taxable + taxes + shipping;
        document.getElementById('subtotal').textContent = this.formatPrice(subtotal);
        document.getElementById('shipping').textContent = shipping === 0 ? 'GRATIS' : this.formatPrice(shipping);
        document.getElementById('taxes').textContent = this.formatPrice(taxes);
        document.getElementById('total').textContent = this.formatPrice(total);
        const discountRow = document.getElementById('discountRow');
        if (discount > 0) { discountRow.style.display = 'flex'; document.getElementById('discountAmount').textContent = '-' + this.formatPrice(discount); }
        else discountRow.style.display = 'none';
    }

    applyCoupon() {
        const input = document.getElementById('couponInput');
        const msg = document.getElementById('couponMsg');
        const code = input.value.trim().toUpperCase();
        if (!code) { msg.textContent = 'Ingresa un código de cupón'; msg.className = 'coupon-msg error'; return; }
        const couponData = this.validCoupons[code];
        if (!couponData) { msg.textContent = 'Código de cupón no válido'; msg.className = 'coupon-msg error'; return; }
        this.coupon = { code, ...couponData };
        this.saveToStorage('gourmet_coupon', this.coupon);
        msg.textContent = `✓ ${couponData.label} aplicado`; msg.className = 'coupon-msg success';
        this.updateCartTotals();
        this.showToast(`Cupón ${code} aplicado: ${couponData.label}`, 'success');
    }

    toggleCart(show) {
        const overlay = document.getElementById('cartOverlay');
        const sidebar = document.getElementById('cartSidebar');
        const isOpen = sidebar.classList.contains('active');
        const shouldOpen = show !== undefined ? show : !isOpen;
        if (shouldOpen) { overlay.classList.add('active'); sidebar.classList.add('active'); document.body.style.overflow = 'hidden'; }
        else { overlay.classList.remove('active'); sidebar.classList.remove('active'); document.body.style.overflow = ''; }
    }

    openCheckout() {
        if (this.cart.length === 0) { this.showToast('Tu carrito está vacío', 'error'); return; }
        this.toggleCart(false);
        this.checkoutStep = 1;
        this.paymentMethod = 'card';
        this.resetCheckout();
        document.getElementById('checkoutOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateStepper();
    }
    closeCheckout() { document.getElementById('checkoutOverlay').classList.remove('active'); document.body.style.overflow = ''; }
    resetCheckout() {
        document.getElementById('successScreen').classList.remove('active');
        document.getElementById('checkoutActions').style.display = 'flex';
        document.querySelectorAll('.form-step').forEach((step, i) => step.classList.toggle('active', i === 0));
        document.querySelectorAll('.form-input').forEach(input => { input.value = ''; input.classList.remove('error'); });
        document.querySelectorAll('.error-msg').forEach(err => err.classList.remove('show'));
        document.querySelectorAll('.checkbox-card').forEach(cb => cb.classList.remove('checked'));
        document.querySelectorAll('.checkbox-card input').forEach(cb => cb.checked = false);
        document.querySelectorAll('.payment-card').forEach((pc, i) => pc.classList.toggle('active', i === 0));
        document.querySelectorAll('.payment-card input').forEach((pi, i) => pi.checked = i === 0);
        document.getElementById('cardForm').style.display = 'block';
        document.getElementById('cashForm').style.display = 'none';
        document.getElementById('transferForm').style.display = 'none';
    }

    updateStepper() {
        const totalSteps = 4;
        const fill = document.getElementById('stepperFill');
        const percent = ((this.checkoutStep - 1) / (totalSteps - 1)) * 100;
        fill.style.width = `${percent}%`;
        document.querySelectorAll('.step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            if (stepNum < this.checkoutStep) step.classList.add('completed');
            else if (stepNum === this.checkoutStep) step.classList.add('active');
        });
        const btnBack = document.getElementById('btnBack');
        const btnNext = document.getElementById('btnNext');
        btnBack.style.display = this.checkoutStep > 1 ? 'flex' : 'none';
        if (this.checkoutStep === totalSteps) btnNext.innerHTML = `Confirmar y Pagar <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        else btnNext.innerHTML = `Siguiente <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    }

    validateStep(step) {
        let valid = true;
        const showError = (id, errorId) => { const input = document.getElementById(id); const error = document.getElementById(errorId); if (!input || !error) return; input.classList.add('error'); error.classList.add('show'); valid = false; };
        const clearError = (id, errorId) => { const input = document.getElementById(id); const error = document.getElementById(errorId); if (!input || !error) return; input.classList.remove('error'); error.classList.remove('show'); };
        if (step === 1) {
            const name = document.getElementById('contactName'); const email = document.getElementById('contactEmail'); const phone = document.getElementById('contactPhone');
            if (!name?.value.trim() || name.value.trim().length < 3) showError('contactName', 'errorName'); else clearError('contactName', 'errorName');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value.trim() || '')) showError('contactEmail', 'errorEmail'); else clearError('contactEmail', 'errorEmail');
            if ((phone?.value || '').replace(/\D/g, '').length < 10) showError('contactPhone', 'errorPhone'); else clearError('contactPhone', 'errorPhone');
        }
        if (step === 2) {
            const street = document.getElementById('addrStreet'); const numExt = document.getElementById('addrNumExt'); const colonia = document.getElementById('addrColonia'); const city = document.getElementById('addrCity'); const zip = document.getElementById('addrZip');
            if (!street?.value.trim()) showError('addrStreet', 'errorStreet'); else clearError('addrStreet', 'errorStreet');
            if (!numExt?.value.trim()) showError('addrNumExt', 'errorNumExt'); else clearError('addrNumExt', 'errorNumExt');
            if (!colonia?.value.trim()) showError('addrColonia', 'errorColonia'); else clearError('addrColonia', 'errorColonia');
            if (!city?.value.trim()) showError('addrCity', 'errorCity'); else clearError('addrCity', 'errorCity');
            if (!/^\d{5}$/.test(zip?.value.trim() || '')) showError('addrZip', 'errorZip'); else clearError('addrZip', 'errorZip');
        }
        if (step === 4 && this.paymentMethod === 'card') {
            const cardName = document.getElementById('cardName'); const cardNumber = document.getElementById('cardNumber'); const cardExpiry = document.getElementById('cardExpiry'); const cardCVV = document.getElementById('cardCVV');
            if (!cardName?.value.trim()) showError('cardName', 'errorCardName'); else clearError('cardName', 'errorCardName');
            if ((cardNumber?.value || '').replace(/\s/g, '').length < 16) showError('cardNumber', 'errorCardNumber'); else clearError('cardNumber', 'errorCardNumber');
            if (!/^\d{2}\/\d{2}$/.test(cardExpiry?.value || '')) showError('cardExpiry', 'errorCardExpiry'); else clearError('cardExpiry', 'errorCardExpiry');
            if (!/^\d{3,4}$/.test(cardCVV?.value || '')) showError('cardCVV', 'errorCardCVV'); else clearError('cardCVV', 'errorCardCVV');
        }
        return valid;
    }

    nextStep() {
        if (!this.validateStep(this.checkoutStep)) { this.showToast('Por favor completa los campos requeridos correctamente', 'error'); return; }
        if (this.checkoutStep < 4) { document.querySelector(`.form-step[data-step="${this.checkoutStep}"]`).classList.remove('active'); this.checkoutStep++; document.querySelector(`.form-step[data-step="${this.checkoutStep}"]`).classList.add('active'); this.updateStepper(); }
        else this.submitOrder();
    }
    prevStep() { if (this.checkoutStep > 1) { document.querySelector(`.form-step[data-step="${this.checkoutStep}"]`).classList.remove('active'); this.checkoutStep--; document.querySelector(`.form-step[data-step="${this.checkoutStep}"]`).classList.add('active'); this.updateStepper(); } }
    toggleCheckbox(el, id) { const checkbox = document.getElementById(id); checkbox.checked = !checkbox.checked; el.classList.toggle('checked', checkbox.checked); }
    selectPayment(method, el) {
        this.paymentMethod = method;
        document.querySelectorAll('.payment-card').forEach(card => card.classList.remove('active'));
        el.classList.add('active');
        document.getElementById('cardForm').style.display = method === 'card' ? 'block' : 'none';
        document.getElementById('cashForm').style.display = method === 'cash' ? 'block' : 'none';
        document.getElementById('transferForm').style.display = method === 'transfer' ? 'block' : 'none';
        if (method === 'transfer') document.getElementById('transferRef').textContent = 'PED-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    submitOrder() {
        document.getElementById('loadingOverlay').classList.add('active');
        const userData = { name: document.getElementById('contactName').value.trim(), email: document.getElementById('contactEmail').value.trim(), phone: document.getElementById('contactPhone').value.trim(), address: { street: document.getElementById('addrStreet').value.trim(), numExt: document.getElementById('addrNumExt').value.trim(), numInt: document.getElementById('addrNumInt').value.trim(), colonia: document.getElementById('addrColonia').value.trim(), city: document.getElementById('addrCity').value.trim(), zip: document.getElementById('addrZip').value.trim(), refs: document.getElementById('addrRefs').value.trim() }, preferences: { vegetarian: document.getElementById('prefVeg').checked, glutenFree: document.getElementById('prefGluten').checked, spicy: document.getElementById('prefSpicy').checked, dairyFree: document.getElementById('prefDairy').checked, notes: document.getElementById('chefNotes').value.trim() } };
        this.user = userData; this.saveToStorage('gourmet_user', userData);
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.remove('active');
            const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
            this.orderNumber = '#' + orderId;
            const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const shipping = subtotal > 300 ? 0 : 49;
            let discount = 0;
            if (this.coupon) { const cd = this.validCoupons[this.coupon.code]; if (cd) { if (cd.type === 'percent') discount = subtotal * cd.discount; else if (cd.label.includes('Envío')) discount = shipping; else discount = cd.discount; } }
            const taxable = Math.max(0, subtotal - discount); const taxes = taxable * 0.16; const total = taxable + taxes + shipping;
            const order = { id: orderId, number: this.orderNumber, date: new Date().toISOString(), items: [...this.cart], subtotal, shipping, discount, taxes, total, coupon: this.coupon, paymentMethod: this.paymentMethod, status: 'preparing', user: userData };
            this.orders.unshift(order); this.saveToStorage('gourmet_orders', this.orders);
            document.getElementById('orderNumber').textContent = this.orderNumber;
            document.getElementById('orderDate').textContent = new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            document.getElementById('orderTotal').textContent = this.formatPrice(total);
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.getElementById('successScreen').classList.add('active');
            document.getElementById('checkoutActions').style.display = 'none';
            this.cart = []; this.coupon = null;
            this.saveToStorage('gourmet_cart', []); this.saveToStorage('gourmet_coupon', null);
            this.updateCartUI();
            this.fireConfetti(); this.showToast('¡Pedido confirmado con éxito!', 'success');
            this.simulateTracking();
        }, 2500);
    }

    simulateTracking() {
        const steps = document.querySelectorAll('.tracking-step');
        const lines = document.querySelectorAll('.tracking-line');
        let current = 0;
        const advance = () => { if (current < steps.length) { steps[current].classList.add('active'); if (current > 0 && lines[current - 1]) lines[current - 1].style.background = 'var(--primary)'; current++; if (current < steps.length) setTimeout(advance, 2000); } };
        setTimeout(advance, 1000);
    }

    renderOrders() {
        const list = document.getElementById('ordersList');
        if (this.orders.length === 0) { list.innerHTML = `<div class="no-orders"><div class="no-orders-icon">📋</div><h3>Aún no tienes pedidos</h3><p>¡Haz tu primer pedido y aparecerá aquí!</p></div>`; return; }
        list.innerHTML = this.orders.map((order, i) => {
            const date = new Date(order.date);
            const dateStr = date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
            const timeStr = date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
            const statusLabels = { 'preparing': { text: 'En preparación', class: 'preparing' }, 'on-the-way': { text: 'En camino', class: 'on-the-way' }, 'delivered': { text: 'Entregado', class: 'delivered' } };
            const status = statusLabels[order.status] || statusLabels['preparing'];
            return `<div class="order-item" style="animation-delay: ${i * 0.1}s"><div class="order-item-header"><div><div class="order-item-number">${order.number}</div><div class="order-item-date">${dateStr} · ${timeStr}</div></div><span class="order-item-status ${status.class}">${status.text}</span></div><div class="order-item-products">${order.items.map(item => `<span class="order-item-product">${item.qty}x ${item.name}</span>`).join('')}</div><div class="order-item-footer"><span class="order-item-payment">${this.getPaymentLabel(order.paymentMethod)}</span><span class="order-item-total">${this.formatPrice(order.total)}</span></div></div>`;
        }).join('');
    }
    getPaymentLabel(method) { const labels = { 'card': '💳 Tarjeta', 'cash': '💵 Efectivo', 'transfer': '🏦 Transferencia' }; return labels[method] || method; }

    populateUserData() {
    const savedName = localStorage.getItem('gourmet_user_name');
    const savedToken = localStorage.getItem('gourmet_user_token');
    
    // Si hay datos guardados del login, usarlos
    if (savedName) {
        document.getElementById('profileName').textContent = savedName;
        document.getElementById('profileInitial').textContent = savedName.charAt(0).toUpperCase();
    }
    
    // Rellenar formulario de checkout si hay datos previos
    if (this.user.name) {
        document.getElementById('contactName').value = this.user.name;
        document.getElementById('contactEmail').value = this.user.email || '';
        document.getElementById('contactPhone').value = this.user.phone || '';
        if (this.user.address) {
            document.getElementById('addrStreet').value = this.user.address.street || '';
            document.getElementById('addrNumExt').value = this.user.address.numExt || '';
            document.getElementById('addrNumInt').value = this.user.address.numInt || '';
            document.getElementById('addrColonia').value = this.user.address.colonia || '';
            document.getElementById('addrCity').value = this.user.address.city || '';
            document.getElementById('addrZip').value = this.user.address.zip || '';
            document.getElementById('addrRefs').value = this.user.address.refs || '';
        }
        document.getElementById('profileEmail').textContent = this.user.email || '—';
        document.getElementById('profilePhone').textContent = this.user.phone || '—';
    }
}
    updateProfileStats() { const totalOrders = this.orders.length; const totalSpent = this.orders.reduce((sum, o) => sum + o.total, 0); const totalFavorites = this.favorites.length; document.getElementById('statOrders').textContent = totalOrders; document.getElementById('statSpent').textContent = this.formatPrice(totalSpent); document.getElementById('statFavorites').textContent = totalFavorites; }
    clearHistory() { if (!confirm('¿Estás seguro de que quieres borrar todo tu historial de pedidos?')) return; this.orders = []; this.saveToStorage('gourmet_orders', []); this.renderOrders(); this.showToast('Historial de pedidos borrado', 'info'); }
    resetAll() { if (!confirm('¿Estás seguro? Se borrarán todos tus datos: carrito, pedidos, favoritos y perfil.')) return; this.cart = []; this.orders = []; this.favorites = []; this.user = {}; this.coupon = null; this.saveToStorage('gourmet_cart', []); this.saveToStorage('gourmet_orders', []); this.saveToStorage('gourmet_favorites', []); this.saveToStorage('gourmet_user', {}); this.saveToStorage('gourmet_coupon', null); this.updateCartUI(); this.renderProducts(); this.showToast('Todos los datos han sido restablecidos', 'info'); }

    formatPrice(price) { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price); }
    fireConfetti() {
        const container = document.getElementById('confettiContainer');
        const colors = ['#C75B39', '#E07A5F', '#81B29A', '#F2CC8F', '#3D405B', '#E63946', '#5E8C73', '#B8860B'];
        for (let i = 0; i < 80; i++) { const piece = document.createElement('div'); piece.className = 'confetti-piece'; piece.style.left = Math.random() * 100 + '%'; piece.style.background = colors[Math.floor(Math.random() * colors.length)]; piece.style.animationDelay = Math.random() * 2.5 + 's'; piece.style.animationDuration = (Math.random() * 2.5 + 2.5) + 's'; piece.style.borderRadius = Math.random() > 0.5 ? '50%' : (Math.random() > 0.5 ? '0' : '2px'); piece.style.width = (Math.random() * 8 + 6) + 'px'; piece.style.height = (Math.random() * 8 + 6) + 'px'; piece.style.transform = `rotate(${Math.random() * 360}deg)`; container.appendChild(piece); }
        setTimeout(() => { container.innerHTML = ''; }, 6000);
    }
    share(platform) {
        const text = `¡Acabo de ordenar en Gourmet Express! Pedido ${this.orderNumber}`;
        const url = encodeURIComponent(window.location.href);
        const encodedText = encodeURIComponent(text);
        const links = { facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`, twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, whatsapp: `https://wa.me/?text=${encodedText}%20${url}`, instagram: null };
        if (platform === 'instagram') { navigator.clipboard?.writeText(text + ' ' + window.location.href).then(() => this.showToast('Texto copiado al portapapeles. Pégalo en Instagram.', 'info')); return; }
        if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=500,scrollbars=yes');
    }
    reset() { this.closeCheckout(); this.toggleCart(false); this.closeProductModal(); this.cart = []; this.saveToStorage('gourmet_cart', []); this.updateCartUI(); this.goHome(); this.filterCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); this.showToast('¡Listo para un nuevo pedido!', 'success'); }
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = { success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>', error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>', info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>', warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' };
        toast.innerHTML = `${icons[type] || icons.info} <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 350); }, 3500);
    }
}

const app = new GourmetApp();

