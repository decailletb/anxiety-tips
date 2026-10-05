// Journal des signaux et contacts personnels : 100 % local.
// Tout est gardé dans le localStorage de ce navigateur. Aucune requête réseau, aucun envoi.
// Un seul fichier pour les pages /journal/, /journal/imprimer/, /trousse/ et /aide/ :
// chaque partie ne s'active que si ses éléments existent dans la page.
(function () {
  'use strict';

  var JOURNAL_KEY = 'vague-journal-v1';
  var CONTACTS_KEY = 'vague-contacts-v1';
  var DAYS_SHOWN = 28;
  var MAX_CONTACTS = 3;

  // ---------- Stockage ----------
  function storageOk() {
    try {
      var k = '__vague_test__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }
  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  // ---------- Dates (heure locale, format AAAA-MM-JJ) ----------
  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
  function isoDay(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function parseDay(s) {
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  var dayFormat = new Intl.DateTimeFormat('fr-CH', { weekday: 'long', day: 'numeric', month: 'long' });

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // Éléments visibles seulement avec JavaScript.
  document.querySelectorAll('[data-needs-js]').forEach(function (n) {
    n.hidden = false;
  });
  document.querySelectorAll('[data-print]').forEach(function (b) {
    b.addEventListener('click', function () {
      window.print();
    });
  });

  var canStore = storageOk();
  if (!canStore) {
    document.querySelectorAll('[data-storage-error]').forEach(function (n) {
      n.hidden = false;
    });
  }

  // ======================================================================
  // Journal
  // ======================================================================
  var form = document.getElementById('journal-form');
  if (form) initJournal();

  function initJournal() {
    var dateInput = form.elements.date;
    var note = form.elements.note;
    var status = form.querySelector('.status');
    var daysList = document.getElementById('journal-days');
    var dataStatus = document.querySelector('[data-data-status]');

    // Questions lues dans la page (source unique : src/lib/journal.ts).
    var questions = Array.prototype.map.call(form.querySelectorAll('fieldset[data-question]'), function (fs) {
      var opts = {};
      fs.querySelectorAll('input[type=radio]').forEach(function (r) {
        opts[r.value] = { label: r.nextElementSibling.textContent, tone: r.getAttribute('data-tone') };
      });
      return { id: fs.getAttribute('data-question'), short: fs.getAttribute('data-short'), options: opts };
    });
    var noteMax = Number(note.getAttribute('maxlength')) || 280;

    function readAll() {
      var data = load(JOURNAL_KEY, null);
      return data && typeof data === 'object' && data.entries ? data : { version: 1, entries: {} };
    }

    // Ne garde que des valeurs connues (protège contre un fichier importé abîmé).
    function clean(entry) {
      if (!entry || typeof entry !== 'object') return null;
      var out = {};
      var any = false;
      questions.forEach(function (q) {
        if (typeof entry[q.id] === 'string' && q.options[entry[q.id]]) {
          out[q.id] = entry[q.id];
          any = true;
        }
      });
      if (typeof entry.note === 'string' && entry.note.trim()) {
        out.note = entry.note.trim().slice(0, noteMax);
        any = true;
      }
      return any ? out : null;
    }

    function fill(day) {
      var entry = readAll().entries[day] || {};
      questions.forEach(function (q) {
        form.querySelectorAll('input[name="' + q.id + '"]').forEach(function (r) {
          r.checked = entry[q.id] === r.value;
        });
      });
      note.value = entry.note || '';
    }

    function renderDays() {
      var entries = readAll().entries;
      daysList.textContent = '';
      var today = new Date();
      for (var i = 0; i < DAYS_SHOWN; i++) {
        var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        var key = isoDay(d);
        var entry = entries[key];
        var li = el('li', 'day' + (entry ? '' : ' day-empty'));
        var head = el('button', 'day-name');
        head.type = 'button';
        head.textContent = i === 0 ? 'Aujourd’hui' : i === 1 ? 'Hier' : dayFormat.format(d);
        head.setAttribute('aria-label', (entry ? 'Modifier ' : 'Remplir ') + dayFormat.format(d));
        head.dataset.day = key;
        li.appendChild(head);
        if (entry) {
          var chips = el('ul', 'day-chips');
          questions.forEach(function (q) {
            var v = entry[q.id];
            if (!v || !q.options[v]) return;
            var c = el('li', 'pill tone-' + q.options[v].tone);
            c.appendChild(el('span', 'pill-name', q.short + ' : '));
            c.appendChild(document.createTextNode(q.options[v].label.toLowerCase()));
            chips.appendChild(c);
          });
          li.appendChild(chips);
          if (entry.note) li.appendChild(el('p', 'day-note', entry.note));
        } else {
          li.appendChild(el('span', 'day-nothing', 'rien de noté'));
        }
        daysList.appendChild(li);
      }
    }

    daysList.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-day]');
      if (!b) return;
      dateInput.value = b.dataset.day;
      fill(b.dataset.day);
      status.textContent = '';
      form.scrollIntoView({ block: 'start' });
      dateInput.focus({ preventScroll: true });
    });

    var todayKey = isoDay(new Date());
    dateInput.value = todayKey;
    dateInput.max = todayKey;
    fill(todayKey);
    renderDays();

    dateInput.addEventListener('change', function () {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput.value)) fill(dateInput.value);
      status.textContent = '';
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var day = dateInput.value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
        status.textContent = 'Choisis d’abord un jour.';
        dateInput.focus();
        return;
      }
      var raw = { note: note.value };
      questions.forEach(function (q) {
        var r = form.querySelector('input[name="' + q.id + '"]:checked');
        if (r) raw[q.id] = r.value;
      });
      var data = readAll();
      var entry = clean(raw);
      if (entry) data.entries[day] = entry;
      else delete data.entries[day];
      if (!save(JOURNAL_KEY, data)) {
        status.textContent = 'Impossible d’enregistrer dans ce navigateur.';
        return;
      }
      status.textContent = entry
        ? day === todayKey
          ? 'C’est noté pour aujourd’hui. Merci de prendre ce moment.'
          : 'C’est noté.'
        : 'Rien à noter pour ce jour.';
      renderDays();
    });

    // ----- Export -----
    var exportBtn = document.querySelector('[data-export]');
    if (exportBtn)
      exportBtn.addEventListener('click', function () {
        var data = readAll();
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'mon-journal-' + todayKey + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () {
          URL.revokeObjectURL(a.href);
        }, 1000);
        dataStatus.textContent = 'Fichier enregistré sur ce téléphone (dossier Téléchargements).';
      });

    // ----- Import -----
    var importInput = document.querySelector('[data-import]');
    if (importInput)
      importInput.addEventListener('change', function () {
        var file = importInput.files && importInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          var incoming;
          try {
            incoming = JSON.parse(String(reader.result));
          } catch (e) {
            incoming = null;
          }
          var src = incoming && incoming.entries && typeof incoming.entries === 'object' ? incoming.entries : null;
          var valid = {};
          var count = 0;
          if (src)
            Object.keys(src).forEach(function (k) {
              var e = /^\d{4}-\d{2}-\d{2}$/.test(k) ? clean(src[k]) : null;
              if (e) {
                valid[k] = e;
                count++;
              }
            });
          importInput.value = '';
          if (!count) {
            dataStatus.textContent = 'Ce fichier ne contient pas de journal lisible.';
            return;
          }
          var ok = window.confirm(
            'Reprendre ' + count + ' jour(s) depuis ce fichier ? Les jours déjà notés aux mêmes dates seront remplacés.',
          );
          if (!ok) return;
          var data = readAll();
          Object.keys(valid).forEach(function (k) {
            data.entries[k] = valid[k];
          });
          if (save(JOURNAL_KEY, data)) {
            dataStatus.textContent = count + ' jour(s) repris.';
            fill(dateInput.value);
            renderDays();
          } else {
            dataStatus.textContent = 'Impossible d’enregistrer dans ce navigateur.';
          }
        };
        reader.readAsText(file);
      });

    // ----- Tout effacer -----
    var clearBtn = document.querySelector('[data-clear]');
    if (clearBtn)
      clearBtn.addEventListener('click', function () {
        var ok = window.confirm(
          'Effacer tout le journal de ce téléphone ? Ça ne peut pas être annulé. (Tes contacts de la trousse sont gardés.)',
        );
        if (!ok) return;
        try {
          localStorage.removeItem(JOURNAL_KEY);
        } catch (e) {}
        fill(dateInput.value);
        renderDays();
        dataStatus.textContent = 'Le journal est effacé.';
      });
  }

  // ======================================================================
  // Mes contacts (trousse et aide)
  // ======================================================================
  function telHref(n) {
    return 'tel:' + String(n).replace(/[^\d+]/g, '');
  }
  function readContacts() {
    var list = load(CONTACTS_KEY, []);
    if (!Array.isArray(list)) return [];
    return list
      .filter(function (c) {
        return c && typeof c.name === 'string' && typeof c.tel === 'string' && c.tel.replace(/[^\d]/g, '').length >= 3;
      })
      .slice(0, MAX_CONTACTS);
  }

  function renderContacts() {
    var contacts = readContacts();
    document.querySelectorAll('[data-contacts-list]').forEach(function (box) {
      box.textContent = '';
      contacts.forEach(function (c) {
        var a = el('a', 'contact-btn');
        a.href = telHref(c.tel);
        a.appendChild(el('span', 'contact-name', c.name || 'Mon contact'));
        a.appendChild(el('span', 'contact-tel', c.tel));
        box.appendChild(a);
      });
    });
    document.querySelectorAll('[data-contacts-empty]').forEach(function (n) {
      n.hidden = contacts.length > 0;
    });
  }

  var contactsForm = document.getElementById('contacts-form');
  if (contactsForm) {
    var current = readContacts();
    for (var i = 0; i < MAX_CONTACTS; i++) {
      var c = current[i] || { name: '', tel: '' };
      contactsForm.elements['name' + i].value = c.name;
      contactsForm.elements['tel' + i].value = c.tel;
    }
    contactsForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var st = contactsForm.querySelector('.status');
      var list = [];
      var problem = false;
      for (var j = 0; j < MAX_CONTACTS; j++) {
        var name = contactsForm.elements['name' + j].value.trim().slice(0, 40);
        var tel = contactsForm.elements['tel' + j].value.trim().slice(0, 30);
        if (!tel && !name) continue;
        if (tel.replace(/[^\d]/g, '').length < 3) {
          problem = true;
          continue;
        }
        list.push({ name: name, tel: tel });
      }
      if (!save(CONTACTS_KEY, list)) {
        st.textContent = 'Impossible d’enregistrer dans ce navigateur.';
        return;
      }
      renderContacts();
      st.textContent = problem
        ? 'Enregistré. Un contact sans numéro valable n’a pas été gardé.'
        : list.length
          ? 'Tes contacts sont enregistrés sur ce téléphone.'
          : 'Aucun contact enregistré.';
    });
  }
  if (document.querySelector('[data-contacts-list]')) renderContacts();
})();
