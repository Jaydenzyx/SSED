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

    window.Parsley.addValidator('filemaxsize', {
        requirementType: 'integer',
        validateString: (value, size, el) => {
            if (!window.FormData) return true;
            const f = el.$element[0].files;
            if (!f.length) return true;
            return f[0].size <= size;
        },
        messages: { de: 'Datei zu groß (max. %s Bytes).' }
    });

    window.Parsley.addValidator('filetype', {
        requirementType: 'string',
        validateString: (value, types, el) => {
            const f = el.$element[0].files;
            if (!f.length) return true;
            const allowed = types.split(',');
            return allowed.includes(f[0].type);
        },
        messages: { de: 'Nicht unterstützter Dateityp.' }
    });
});
