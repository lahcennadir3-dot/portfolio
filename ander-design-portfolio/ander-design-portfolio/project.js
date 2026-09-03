/* ===========================================================
   ANDER DESIGN — Project Request Form
   -----------------------------------------------------------
   Sends the form to a Google Sheet via a Google Apps Script
   Web App. One-time setup on your side:

   1. Create a Google Sheet. Give it a header row matching the
      `name` attributes on the form fields:
        fullName | email | service | budget | details | submittedAt

   2. In that Sheet: Extensions → Apps Script, and paste a
      doPost(e) function that reads e.parameter.fullName,
      e.parameter.email, etc. and appends them as a new row.

   3. Deploy → New deployment → Web app
        Execute as: Me
        Who has access: Anyone
      Copy the deployment URL it gives you.

   4. Paste that URL below, replacing the placeholder.

   Note on "no-cors": Google Apps Script web apps don't return
   CORS headers, so the browser can't read the response even
   when the request succeeds — fetch() just sees an opaque
   result either way. The standard workaround (used below) is
   to send the request in no-cors mode and treat "the network
   request didn't fail" as success. To actually verify it's
   working, submit a real test entry and check the Sheet —
   don't rely on the on-screen success message alone until
   you've confirmed a row landed there.
   =========================================================== */

const WEB_APP_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

document.addEventListener("DOMContentLoaded", initProjectForm);

function initProjectForm() {
  const form = document.getElementById("projectForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const submitLabel = document.getElementById("submitBtnLabel");
  const messageEl = document.getElementById("formMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (WEB_APP_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT")) {
      showMessage(
        "Add your Google Apps Script Web App URL in project.js first.",
        "error",
        messageEl
      );
      return;
    }

    const lang = getCurrentLang();
    const sendingText = t("btnSending", lang, "Sending…");
    const originalLabel = submitLabel.textContent;

    submitBtn.disabled = true;
    submitLabel.textContent = sendingText;
    hideMessage(messageEl);

    const formData = new FormData(form);
    formData.append("submittedAt", new Date().toISOString());

    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(() => {
        const successText = t(
          "msgSuccess",
          lang,
          "Your request has been received!"
        );
        showMessage(successText, "success", messageEl);
        form.reset();
      })
      .catch(() => {
        const errorText = t(
          "msgError",
          lang,
          "Something went wrong — please try again, or email me directly."
        );
        showMessage(errorText, "error", messageEl);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitLabel.textContent = originalLabel;
      });
  });
}

/* Reads the language i18n.js is currently using, falling back
   safely to English if i18n.js hasn't loaded for some reason. */
function getCurrentLang() {
  return typeof currentLang !== "undefined" ? currentLang : "en";
}

/* Looks up a translation key from the shared TRANSLATIONS
   dictionary (defined in i18n.js), with a safe fallback. */
function t(key, lang, fallback) {
  if (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[key]) {
    return TRANSLATIONS[key][lang] || fallback;
  }
  return fallback;
}

function showMessage(text, type, el) {
  el.textContent = text;
  el.className =
    "form-message is-visible " + (type === "success" ? "is-success" : "is-error");
}

function hideMessage(el) {
  el.textContent = "";
  el.className = "form-message";
}
