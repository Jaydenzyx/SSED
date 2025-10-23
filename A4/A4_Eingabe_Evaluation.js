$(document).ready(function() {
  $('#demoForm').parsley();

  // Live Validation Parsley für Passwort, Tel, Email
  $('#demoForm input[name="pw_example"], #demoForm input[name="tel_example"], #demoForm input[name="email_example"]').on('keyup', function() {
    $(this).parsley().validate();
  });

  // Werte anzeigen Button
  $('#showValues').on('click', function() {
    const data = new FormData($('#demoForm')[0]);
    let out = '';
    for (const [key, value] of data.entries()) {
      out += key + ': ' + value + '\n';
    }
    $('#output').text(out || 'Keine Werte.');
  });

  // Push Button
  $('#btnPlain').on('click', function() {
    $('#output').text('Push button geklickt!');
  });

  // Image Submit
  $('#imgSubmit').on('click', function(e) {
    e.preventDefault();
    $('#output').text('Image submit geklickt!');
  });

  // Formular absenden
  $('#demoForm').on('submit', function(e) {
    e.preventDefault();
    if ($(this).parsley().isValid()) {
      $('#output').text('Formular wurde gesendet!');
    } else {
      $('#output').text('Bitte E-Mail, Telefonnummer und Passwort korrekt ausfüllen!');
    }
  });

  // Reset
  $('#demoForm').on('reset', function() {
    $('#output').text('Formular wurde zurückgesetzt!');
  });
});
