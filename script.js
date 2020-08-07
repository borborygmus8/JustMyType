let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'],
    sentence = 0,
    letter = 0,
    mistakes = 0,
    index = 0,
    time1 = new Date().getTime();

$('#sentence').text(sentences[sentence]);
$('#target-letter').text(sentences[sentence][letter]);

$('#keyboard-upper-container').css('display', 'none');

$(document).on('keydown', e => {
    if (e.which === 16) {
        $('#keyboard-upper-container').css('display', 'block');
        $('#keyboard-lower-container').css('display', 'none');
    }
});
$(document).on('keyup', e => {
    if (e.which === 16) {
        $('#keyboard-upper-container').css('display', 'none');
        $('#keyboard-lower-container').css('display', 'block');
    }
});
$(document).on('keypress', e => {
    const id = e.which.toString();
    $('#' + id).css('backgroundColor', 'yellow');
    setTimeout(e => {
        $('#' + id).css('backgroundColor', '#f5f5f5');
    }, 250);
    $('#yellow-block').css('margin-left', '+=17.4px');
    if (e.key === sentences[sentence][letter]) {
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
    } else {
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        mistakes++;
    }
    index++;
    letter++;
    $('#target-letter').text(sentences[sentence][letter]);
    if (index === calcIndex()) {
        let time2 = new Date().getTime(),
            mins = ((time2 - time1) / 1000 / 60),
            wpm = Math.round(calcWords() / mins - 2 * mistakes);
        $('#yellow-block').css('display', 'none');
        $('#target-letter').css('display', 'none');
        $('#feedback').empty();
        $('#sentence').css('text-align', 'center').text(`You averaged ${wpm} words per minute!`);
        setTimeout(() => {
            $('#feedback').append('<button class="btn btn-success">Play again?</button>').on('click', () => {
                window.location.reload();
            });
        }, 2000);
    } else if (letter === sentences[sentence].length) {
        sentence++;
        $('#sentence').text(sentences[sentence]);
        $('#feedback').empty();
        letter = 0;
        $('#target-letter').text(sentences[sentence][letter]);
        $('#yellow-block').css('margin-left', '0');
    }
});

// Loops used only so that I wouldn't have to count manually
function calcWords() {
    let words = 0;
    sentences.forEach(sentence => {
        const numWords = sentence.split(' ').length;
        words += numWords;
    });
    return words;
}

function calcIndex() {
    let pos = 0;
    sentences.forEach(sentence => {
        const curPos = sentence.split('').length;
        pos += curPos;
    });
    return pos;
}