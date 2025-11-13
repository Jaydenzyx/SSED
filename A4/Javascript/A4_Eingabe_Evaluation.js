window.Parsley.addValidator('filemaxsize', {
    requirementType: 'integer',
    validateString: (value, maxSize, el) => {
        const files = el.$element[0].files;
        if (!files.length) return true;
        return files[0].size/1024/1024 <= maxSize;
    },
    messages: { de: 'Datei zu groß (max. %s Bytes).' }
});

window.Parsley.addValidator('filetype', {
    requirementType: 'string',
    validateString: function(value, type, parsleyInstance) {
        const files = parsleyInstance.$element[0].files;
        if (files.length === 0) return true;
        const allowedExtensions = type.split(',').map(t => t.trim().toLowerCase());
        const fileExt = files[0].name.split('.').pop().toLowerCase();
        return allowedExtensions.includes('.' + fileExt);
    },
    messages: {
        en: 'Ungültiger Dateityp. Nur: %s erlaubt.'
    }
});

$(function() {
    $('#formData').parsley();

    $('#formData').on('submit', function(ev) {
        ev.preventDefault();
        if ($(this).parsley().isValid()) {
            const data = {
                text: $('#txt').val(),
                email: $('#mail').val(),
                password: $('#pw').val(),
                tel: $('#phone').val(),
                url: $('#link').val(),
                search: $('#query').val()
            };

            $('#result').html(
                `<p><b>Text:</b> ${DOMPurify.sanitize(data.text)}</p>
                 <p><b>Email:</b> ${DOMPurify.sanitize(data.email)}</p>
                 <p><b>Passwort:</b> ${DOMPurify.sanitize(data.password)}</p>
                 <p><b>Telefon:</b> ${DOMPurify.sanitize(data.tel)}</p>
                 <p><b>URL:</b> ${DOMPurify.sanitize(data.url)}</p>
                 <p><b>Suche:</b> ${DOMPurify.sanitize(data.search)}</p>`
            );

            alert('Validierung erfolgreich abgeschlossen!');
        }
    });
});
