const SnakeMessages = {
    // zprávy které se zobrazí pokud budete mít <= 3 skóre
    tri: [
        'Tohle snad nemyslíš vážně, vždyť i mimino by to dalo líp',
        'Řeknu ti jednu věc a to tu že had ti nejde.',
        'Mohl to být pěknej výkon, jenže není..',
        'Vypadá to s tebou bledě.'
    ],
    // zprávy které se zobrazí pokud budete mít <= 5 skóre
    pet: [
        'Jsou i horší věci, jak tvé skóre.', 'Mohlo by to být o hodně lepší.', 'No tak.. snaž se víc :)',
        'Podprůměrný no, co k tomu říct.'
    ],
    // zprávy které se zobrazí pokud budete mít <= 8 skóre
    osm: ['Slušnej výkon, ale máš navíc',
        'Se svým skórem nenadchneš, ani neurázíš.',
        'Patříš mezi ty lepší hráče',
        'Had ti celkem jde..'
    ],
    // zprávy které se zobrazí pokud budete mít <= 10 skóre
    deset: ['Nadprůměrnej výkon..',
        'Takovej talent jako ty se hledá těžko..',
        'Ještě trochu trénigu a budeš opravdová jednička!'
    ],
    // zprávy které se zobrazí pokud budete mít > 10 skóre
    vice: [
        'Světovej šampion z tebe bude!',
        'Topovka, tenhle tvůj výkon',
        'Patříš mezi ty nejlepší!',
    ]
};

/**
 * @param {number} score
 * @param {function(string)} cb
 */
function scoreMessage(score, cb) { // funkce k vypsání zprávy, cb = callback funkce
    function randomValue(array) {
        return array[Math.floor(Math.random() * array.length)]; // vrátí náhodnou hodnotu z pole
    }

    if(score <= 3) {
        cb(randomValue(SnakeMessages.tri));
    } else if(score <= 5) {
        cb(randomValue(SnakeMessages.pet));
    } else if(score <= 8) {
        cb(randomValue(SnakeMessages.osm));
    } else if(score <= 10) {
        cb(randomValue(SnakeMessages.deset));
    } else if(score > 10) {
        cb(randomValue(SnakeMessages.vice));
    } else if(score > 70) {
        cb('Vypadá to, že by ses měl napsat do knihy rekordů :D');
    }
}